import { CALL_API } from '../constants/Common';

// 组装action，请求访问连接。
// 依靠中间件api.js
function request(api,type,data={}) {
    return {
        [CALL_API]: {
            successType:type,
            endpoint: api,
            data:data
        }
    }
}

export function changeView(data) {
    data.type = 'CHANGE_VIEW';
    return data
}

export function init() {
    return (dispatch, getState) => {
        dispatch(request('list','LIST', {}))
    }
}

export function add(data) {
    return (dispatch, getState) => {
        dispatch(request('add','ADD', data))
    }
}

export function del(id) {
    return (dispatch, getState) => {
        dispatch(request('delete','DELETE', {id: id}))
    }
}

export function update(data) {
    return (dispatch, getState) => {
        dispatch(request('update','UPDATE', data))
    }
}

export function updateData(item) {
    let data = {};
    data.type = 'CHANGE_VIEW';
    data.item = item;
    return data
}