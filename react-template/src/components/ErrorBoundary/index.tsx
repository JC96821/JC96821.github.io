/**
* @file components/ErrorBoundary
* @description 异常捕获组件
* @author jc
*/

import React, { ErrorInfo } from 'react';

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {error: false};
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        error ? this.setState({error: true, info}) : this.setState({error: false});
    }

    render() {
        const {error, info} = this.state as {error: boolean, info?: ErrorInfo};
        return !error ? this.props.children : <p>{info?.componentStack}</p>;
    }
}

export default ErrorBoundary;