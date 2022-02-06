import React from 'react';

class Child extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            name: 'child'
        }
    }

    render() {
        const { name } = this.state as { name: string };
        return (
            <h1>{name}</h1>
        );
    }
}

class Tags extends React.Component {
    state: {count: number};
    constructor(props: any) {
        super(props);
        this.state = {
            count: 100
        }
    }
    handleClick() {
        setTimeout(() => {
            this.setState({
                count: this.state.count + 1
            });
            console.log('immediate: ', this.state.count);
        });
    }

    static getDerivedStateFromProps(_props: any, state: any) {
        return {
            count: state.count
        };
    }

    render() {
        const {count} = this.state;
        return (
            <>
                <h1>{count}</h1>
                <button onClick={this.handleClick.bind(this)}>click</button>
                <Child />
            </>
        );
    }
}

export default Tags;