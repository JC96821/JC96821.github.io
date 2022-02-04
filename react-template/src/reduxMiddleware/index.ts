export const logger = (store: any) => (dispatch: any) => (action: any) => {
    // @ts-ignore
    const {getState} = store;
    // console.log('before: ', getState());
    const newAction = dispatch(action);
    // console.log('after: ', getState());
    return newAction;
};