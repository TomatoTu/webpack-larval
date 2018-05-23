import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { curd } from './curdReducer';

const rootReducer = combineReducers({
    form,curd
});

export default rootReducer;
