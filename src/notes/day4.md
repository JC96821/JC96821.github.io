## 模拟题四

### vuex的实现原理

```javascript
import Vue from 'vue';

class Store {
    /**
     * 初始化处理，传入一个参数options, options内容如下
     * @params state store存储的数据
     * @params mutation 更改state的方法
     * @params dispatch 更改state的方法，可以调用mutations,支持异步处理(其实这里没有处理)
     * 
    */
    constructor(options) {
        this.options = options; // 缓存options配置项
        this.mutations = {}; // 缓存的mutations
        this.actions = {}; // 缓存的actions
        // 利用new Vue来创建响应式数据
        this.vm = new Vue({
            data: {
                state: options.state
            }
        });
        this.state = this.vm.state; // 缓存获取到的响应式数据
        this.commit = this.commit.bind(this); // 绑定当前commit方法,用来调用mutations
        this.dispatch = this.dispatch.bind(this); // 绑定当前dispatch方法,用来调用actions

        this.initMutations(); // 初始化mutations
        this.initActions(); // 初始化actions
    }

    /**
     * mutation初始化方法
     * 其实就是遍历传入的mutations并将每个方法的执行指向都转为this
    */
    initMutations() {
        const that = this;
        this.mutations = Object
            .keys(that.options.mutations)
            .reduce((result, mutationName) => {
                result[mutationName] = params => {
                    that.options.mutations[mutationName].call(that, that.state, params);
                };
                return result;
            }, {});
    }

    /**
     * actions的初始化方法
     * 做的事情跟上面一样，区别是每个方法传入的参数有所区别
    */
    initActions() {
        const that = this;
        this.actions = Object
            .keys(that.options.actions)
            .reduce((result, actionName) => {
                result[actionName] = params => {
                    that.options.actions[actionName]
                        .call(that, {commit: that.commit}, params);
                };
                return result;
            }, {});
    }

    // commit方法，通过type来调用mutation
    commit(type, params) {
        this.mutations[type](params);
    }

    // disoatch方法，通过type来派发action动作
    dispatch(type, params) {
        this.actions[type](params);
    }
}

// install方法，用来挂载插件
const install = Vue => {
    // 初始化插件，在根节点中挂载传入的store实例
    Vue.mixin({
        beforeCreate() {
            // 根节点
            if (this.$options.store) {
                // this.$options.store就是new Vue时传入的store实例
                Vue.prototype.$store = this.$options.store;
            }
        }
    });
};

/**
 * 其实就是做了一个自定义映射的功能
 * 这里的this就是当前调用mapState的组件实例
 * @params stateArr ['name', 'age'] 传入的state属性名称
 * @returns {name: () => xxx, age: () => xxx} 在computed中调用，所以返回这种格式的对象
*/
export const mapState = (stateArr = []) => {
    return stateArr.reduce((result, stateName) => {
        result[stateName] = function() {
            return this.$store.state[stateName];
        };
        return result;
    }, {});
};

/**
 * 只是传入参数不同
 * @params mutations {xxx1: 'changeName', xxx2: 'changeAge'} 传入的映射对象
 * @returns {xxx1: (...args) => commit('changeName', ...args), ...} 在methods中调用
*/
export const mapMutations = (mutations = {}) => {
    return Object.keys(mutations).reduce((result, mapName) => {
        result[mapName] = function(params) {
            const type = mutations[mapName];
            this.$store.commit(type, params);
        };
        return result;
    }, {});
};

/**
 * 原理同上
 * @params actions {xxx1: 'changeName', xxx2: 'changeAge'} 传入的映射对象
 * @returns {xxx1: (...args) => commit('changeName', ...args), ...} 在methods中调用
*/
export const mapActions = (actions = {}) => {
    return Object.keys(actions).reduce((result, mapName) => {
        result[mapName] = function(params) {
            const type = actions[mapName];
            this.$store.dispatch(type, params);
        };
        return result;
    }, {});
};

export default {
    install,
    Store
};
```

**模拟使用场景👌**

*main.js*
```javascript
import Vue from 'vue'
import App from './App.vue'
import Vuex from './lib/vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    name: '张三',
    age: 20
  },
  mutations: {
    changeName(_state, newName) {
      this.state.name = newName;
    },
    changeAge(_state, newAge) {
      this.state.age = newAge;
    }
  },
  actions: {
    changeNameAction({commit}, params) {
      setTimeout(() => {
        commit('changeName', params);
      }, 1000);
    },
    changeAgeAction({commit}, params) {
      setTimeout(() => {
        commit('changeAge', params);
      }, 1000);
    }
  }
});

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

```

*App.vue*
```Vue
<template>
  <div>
    <h1>{{name}}</h1>
    <h1>{{age}}</h1>
    <button @click="cName('李四')">change name</button>
    <br>
    <button @click="cNameAction('王五')">change name action</button>
    <br>
    <button @click="cAge(20)">change name</button>
    <br>
    <button @click="cAgeAction(30)">change name action</button>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from '../lib/vuex';
export default {
  computed: {
    ...mapState(['name', 'age'])
  },
  methods: {
    ...mapMutations({cName: 'changeName', cAge: 'changeAge'}),
    ...mapActions({cNameAction: 'changeNameAction', cAgeAction: 'changeAgeAction'})
  }
}
</script>
```