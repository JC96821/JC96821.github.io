import {ADD, DEL} from '@/actionCreators';

export default (payload: any, action: any) => {
    switch(action?.type) {
        case ADD:
            return {
                ...payload,
                num: payload.num + 1
            };
        case DEL:
            return {
                ...payload,
                num: payload.num - 1
            };
        default:
            return payload;
    }
};