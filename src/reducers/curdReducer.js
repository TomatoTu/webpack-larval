import { createReducer } from '../store/createReducer'

const initialState = {
    isListShow : 1,
    isAddShow : 0,
    isUpdateShow : 0,
    list: {},
    item: {},
};
export const curd = createReducer(initialState, {
    ['LIST'](state, action) {
        return Object.assign({}, state,{list: action.response});
    },

    ['ADD'](state, action) {
        console.log(action);
        return state;
    },

    ['UPDATE'](state, action) {
        return Object.assign({}, state,{list: action.response});
    },

    ['DELETE'](state, action) {
        return Object.assign({}, state,{list: action.response});
    },

    ['CHANGE_VIEW'](state, action) {
        return Object.assign({}, state, action);
    },

});

