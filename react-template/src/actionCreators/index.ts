export const ADD = 'ADD';
export const DEL = 'DEL';

export const addNum = {
    type: ADD
};

export const delNum = {
    type: DEL
};

export const addNumAction = async (dispatch: any) => {
    const res = await new Promise(resolve => {
        setTimeout(() => {
            resolve('done');
        }, 500); 
    });
    dispatch(addNum);
    return res;
};
