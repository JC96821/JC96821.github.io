## 模拟题二
### Vue的响应式原理

- *第一步*：
需要observer的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter这样的话，给这个对象的某个值赋值，就会触发setter，那么久能监听到了数据变化

- *第二步*：
compile解析横板令，将模板中的变量替换成数据.然后初始化渲染页面视图，并将每个令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

- *第三步*：
Watcher订阅名是 observer和 Compile之间通信的桥梁，主要做的事情是：
1.在自身实例化时往属性订倒器(dep)里面添加自己
2.自身必须有一个 update()方法
3.待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中定的回调，则功成身退

- *第四步*:
MVVM作为数据绑定的入口，合 observer、 Compile和 Watcher三者，通过 Observer来监听自己的model数据変化，通过 Compile来解析编译模板指令，最终利用 Watcher搭起 Observer和 Compile之间的通信标梁，达到数据变化-＞视图更新新:视图交互变化(Input)-＞数据mode变更的双向绑定效果。


``` html
<div id="app">
    <h1 v-bind="title"></h1>
    <input v-model="title" />
    <button v-click="handleClick">add chart</button>
</div>
<script>
    /**
     * 订阅到的实例(观察者)
     * 其中保存了一系列属性，执行update函数时可以更新视图
    */
    class Watcher {
        /**
         * 传入了5个参数，这里用到了4个
         * @params name 事件名
         * @params el 触发事件的dom
         * @params vm vue实例
         * @params exp 绑定的data属性
         * @params attr 要更新的dom属性
        */
        constructor(...args) {
            const [name, el, vm, exp, attr] = args;
            this.name = name;
            this.el = el;
            this.vm = vm;
            this.exp = exp;
            this.attr = attr;
            this.update();                
        }
        update() {
            this.el[this.attr] = this.vm.$data[this.exp];
        }
    }

    // 自定义Vue实例
    class Vue {
        constructor(options) {
            /**
             * 传入了三个属性
             * @params el 绑定根节点的id
             * @params data data属性，用到的数据集合，用来监听更新视图
             * @params methods methods属性 是方法的集合，用于更新data
            */
            const {el, data, methods} = options;
            this.$options = options; // 保存options
            this.$binding = {}; // 订阅的实例列表
            this.$el = document.querySelector(el); // 根节点dom，用来解析并绑定数据
            this.$data = data; // 保存的data
            this.$methods = methods; // 保存的方法
            this.compile(this.$el); // 初始化编译，解析dom/模板结构，绑定数据
            this.observer(this.$data); // 初始化解析data，监听数据变更(get, set)
        }

        // 订阅data的方法, 用来递归监听数据变化
        observer(data) {
            const that = this;
            Object.keys(data).forEach(key => {
                let value = data[key];
                Object.defineProperty(data, key, {
                    get: function() {
                        return value;
                    },
                    // 数据变更时，如果新旧数据不一致，执行订阅列表的update方法，进行发布
                    set: function(newVal) {
                        if (value !== newVal) {
                            value = newVal;
                            that.$binding[key].forEach(watcher => watcher.update());
                        }
                    }
                });
            });
        }

        // 解析dom绑定数据的编译方法
        compile(nodes) {
            const that = this;
            if (nodes.children) {
                for(const node of nodes.children) {
                    /**
                     * 解析v-bind指令
                     * 创建观察者，绑定的数据变更时可以实时更新对应试图
                    */
                    if (node.hasAttribute('v-bind')) {
                        const value = node.getAttribute('v-bind');
                        if (!that.$binding[value]) {
                            that.$binding[value] = [];
                        }
                        that.$binding[value].push(new Watcher(
                            'text',
                            node,
                            that,
                            value,
                            'innerHTML'
                        ));
                    }
                    /**
                     * 解析v-model指令
                     * 首先创建一个dom的观察者，并将观察者实例保存到订阅列表中
                     * 并监听输入框的input事件，事件触发时修改data的对应属性触发
                     * 对应观察者的update发布方法更改视图
                    */
                    if (node.hasAttribute('v-model')) {
                        const value = node.getAttribute('v-model');
                        if (!that.$binding[value]) {
                            that.$binding[value] = [];
                        }
                        that.$binding[value].push(new Watcher(
                            'input',
                            node,
                            that,
                            value,
                            'value'
                        ));
                        node.addEventListener('input', e => {
                            const attrValue = e.target.value;
                            that.$data[value] = attrValue;
                        });
                    }
                    /**
                     * 解析v-click指令
                     * 监听dom的click方法、执行指令绑定的函数
                     * 并将this指向改为data
                    */
                    if (node.hasAttribute('v-click')){
                      
                        node.onclick = () => {
                            const functionName = node.getAttribute('v-click');
                            this.$methods[functionName].call(this.$data); 
                        };
                    }
                }
            }
        }
    }

    // 模拟使用场景👌
    new Vue({
        el: '#app',
        data: {
            title: 0
        },
        methods: {
            handleClick() {
                this.title = this.title + 1;
            }
        }
    })
</script>
```

### 前端路由原理

#### hash路由原理

> hash 模式是一种把前端路由的路径用井号 # 拼接在真实 url 后面的模式。当井号 # 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 onhashchange 事件。

```html
<ul>
    <li><a href="#/home">home</a></li>
    <li><a href="#/list">list</a></li>
    <li><a href="#/page1">page1</a></li>
    <li><a href="#/page2">page2</a></li>
    <li><a href="#/unknown">unknown</a></li>
</ul>
<button onclick="router.push('/page2')">push</button>
<button onclick="router.go(-1)">back</button>
<button onclick="router.replace('/page1')">replace</button>
<div id="app"></div>

<script>
    // hash路由对象
    class HashRouter {
        /**
         * 接收两个参数
         * @params el page页面绑定的dom属性
         * @params routes 路由配置项
        */
        constructor(options) {
            const { el, routes } = options;
            this.$el = document.querySelector(el);
            this.$routes = routes
            this.bindEvent();
        }
        // 监听hashchange事件,用来匹配页面hash参数与配置项，动态更新page页面
        bindEvent() {
            const that = this;
            window.addEventListener('hashchange', e => {
                const path = that.getUrl();
                const route = that.matchRoute(path);
                that.render(route);
            });
        }
        // 获取当前hash参数，并格式化为标准path格式
        getUrl() {
            const hash = window.location.hash;
            const [_front, params] = hash.split('#');
            const path = params.startsWith('/') ? params : `/${params}`;
            return path;
        }
        // 匹配hash参数与路由配置项，获取匹配到的配置项
        matchRoute(path) {
            const route = this.$routes.find(route => route.path === path);
            const notFound = this.$routes.find(route => route.path === '*');
            return route || notFound;
        }
        // 动态渲染方法
        render(route) {
            const { component } = route;
            this.$el.innerHTML = component;
        }
        // 跳转页面，并向history中添加一条记录，go(-1)时会返回
        push(path) {
            window.location.hash = path;
        }
        // 当前页面向前向后跳转多少个页面
        go(n) {
            window.history.go(n);
        }
        // 跳转页面，但是不向history中添加记录
        replace(path) {
            const href = window.location.href;
            const [base, hash] = href.split('#');
            window.location.replace(`${base}#${path}`);
        }
    }

    // 模拟使用场景👌
    const routes = [
        {
            path: '/home',
            component: 'home'
        },
        {
            path: '/list',
            component: 'list'
        },
        {
            path: '/page1',
            component: 'page1'
        },
        {
            path: '/page2',
            component: 'page2'
        },
        {
            path: '*',
            component: '404'
        }
    ];
    const router = new HashRouter({
        el: '#app',
        routes
    });
</script>
```

#### history路由原理
> history API 是 H5 提供的新特性，允许开发者直接更改前端路由，即更新浏览器 URL 地址而不重新发起请求。主要的 API 有以下两个：`history.pushState(state, title, path)` 和` history.repalceState(state, title, path)`。

```html
<ul>
    <li><a href="/page1">page1</a></li>
    <li><a href="/page2">page2</a></li>
    <li><a href="/page3">page3</a></li>
    <li><a href="/page4">page4</a></li>
    <li><a href="/unknown">unknown</a></li>
</ul>
<button onclick="router.push(`/page${index++}`)">push</button>
<button onclick="router.go(-1)">back</button>
<button onclick="router.replace('/page1')">replace</button>
<div id="app"></div>

<script>
    // history路由对象
    class HistoryRouter{
        /**
         * 接收两个参数
         * @params el page页面绑定的dom属性
         * @params routes 路由配置项
        */
        constructor(options){
            const {el, routes} = options;
            this.$el = document.querySelector(el);
            this.$routes = routes;
            this.bindEvent();
            this.hanlder('/page1');
        }
        /**
         * 监听popstate事件，并触发渲染
         * 注意: popstate事件只有在浏览器事件/脚本调用back,go方法时起效
         *      意味着代理事件需要手动触发渲染
        */
        bindEvent() {
            const that = this;
            window.addEventListener('popstate', e => {
                const path = window.location.pathname;
                that.hanlder(path);
            });
        }
        // 匹配hash参数与路由配置项，获取匹配到的配置项
        matchRoute(path) {
            const route = this.$routes.find(route => route.path === path);
            const notFound = this.$routes.find(route => route.path === '*');
            return route || notFound;
        }
        // 动态渲染方法
        render(route) {
            const { component } = route;
            this.$el.innerHTML = component;
        }
        // 渲染函数，自动匹配地址与渲染，方便处理
        hanlder(path) {
            const route = this.matchRoute(path);
            this.render(route);
        }
        /**
         * 跳转页面，并向history中添加一条记录，go(-1)时会返回
         * 利用了pushstate api
        */
        push(path) {
            history.pushState(null, null, path);
            this.hanlder(path);
        }
        // 当前页面向前向后跳转多少个页面
        go(n) {
            history.go(n);
        }
        /**
         * 跳转页面，但是不向history中添加记录
         * 利用了replaceState api
        */
        replace(path) {
            history.replaceState(null, null, path);
            this.hanlder(path);
        }
    }
    const routes = [
        {
            path: '/page1',
            component: 'page1'
        },
        {
            path: '/page2',
            component: 'page2'
        },
        {
            path: '/page3',
            component: 'page3'
        },
        {
            path: '/page4',
            component: 'page4'
        },
        {
            path: '*',
            component: '404'
        }
    ];
    var index = 1;
    const router = new HistoryRouter({
        el: '#app',
        routes
    });
</script>
```