import { Schema, arrayOf, normalize } from 'normalizr'
import { CALL_API,API_ROOT,CSRF,COMMON_REQUEST,COMMON_SUCCESS,COMMON_FAILURE,COMMON_ERROR,COMMON_REQUESTED } from '../constants/Common';
import 'isomorphic-fetch'
import FormData from 'form-data';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, schema,data={}) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  var form = new FormData();
  for(let key in data) {
    form.append(key, data[key]);
  }

  return fetch(fullUrl,{
      headers: {'X-CSRF-TOKEN': CSRF},
      method: 'POST',
      body: form,
      credentials: 'same-origin',
    }).then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      console.log('服务器返回数据');
      console.log(json);
      if(json.code !== true && true === !!json.data.message && json.data.message != ""){
          window.alert(json.data.message);
          return false;
      }
      return json;
    })
}



// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  let { endpoint,data } = callAPI
  const { schema, requestType=COMMON_REQUEST, successType=COMMON_SUCCESS, failureType=COMMON_FAILURE, errorType=COMMON_ERROR,completeType=false,isShowSuccess=false,isSuccessType=true} = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  let types = [requestType, successType, failureType,errorType];

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  if(typeof data != 'object'){
    data = {};
  }
  console.log('提交的数据');
  console.log(data);

  function actionWith(adata) {
    const finalAction = Object.assign({}, action, adata)
    delete finalAction[CALL_API]
    return finalAction
  }

  function success(next,response) {
    if(response.code !== true){
      return actionWith({
        type: COMMON_REQUESTED
      })
    }

    next(actionWith({ type: COMMON_REQUESTED }));

    isShowSuccess && next(actionWith({ type: COMMON_SUCCESS }));

    completeType && next(actionWith({ type: completeType }));

    if(isSuccessType){
       return actionWith({
           response:response.data,
           type: (response.code?successType:failureType)
       });
    }
  }
  
  // const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema,data).then(
    response => {next(success(next,response))},
    
    error => next(actionWith({
      type: errorType,
      error: error.message || 'Something bad happened'
    }))
  )
}
