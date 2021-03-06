export const test = () => {
    console.log('123 木头人');
};

export const useState = function(initValue: any) {
    const stateList: any[] = [];
    let cursor = 0;
    let state = stateList[cursor] || initValue;

    const setState = (value: any) => {
        state[cursor] = value;
    };

    return [state, setState];
};

export class MyHooks {
    stateList: any[];
    stateCursor: number;
    render: Function;
    state: any;
    allDeps: any[];
    effectCursor: number;
    constructor(render: any) {
        this.render = () => {
            render();
            this.stateCursor = 0;
        };

        this.stateList = [];
        this.stateCursor = 0;

        this.allDeps = [];
        this.effectCursor = 0;
    }

    useState<T>(initValue?: T): [T, (newState: T) => void] {
        const currCursor = this.stateCursor;
        this.stateList[currCursor] = this.stateList[currCursor] || initValue;
        const setState = (newState: any) => {
            if (this.stateList[currCursor] === newState) {
                return;
            }
            this.stateList[currCursor] = newState;
            this.render();
        };
        ++this.stateCursor;
        return [this.stateList[currCursor], setState];
    }

    useEffect(callback: () => void, deps: any[]) {
        // 初次渲染
        if (!this.allDeps[this.effectCursor]) {
            this.allDeps[this.effectCursor++] = deps;
            callback();
            return;
        }
        const currCursor = this.effectCursor;
        const currDeps = this.allDeps[currCursor];
        const isChange = deps.some((item, index) => item !== currDeps[index]);
        if (isChange) {
            callback();
            this.allDeps[currCursor] = deps;
        }
        ++this.effectCursor;
    }
}