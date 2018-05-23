// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');
export const API_ROOT = 'http://www.test.ky/';
export const DEFAULT_IMG = '/images/image-empty.png';
export const CSRF = $('meta[name=csrf-token]').attr('content');

export const COMMON_REQUEST = 'COMMON_REQUEST';
export const COMMON_SUCCESS = 'COMMON_SUCCESS';
export const COMMON_FAILURE = 'COMMON_FAILURE';
export const COMMON_ERROR = 'COMMON_ERROR';
export const COMMON_NORMAL = 'COMMON_NORMAL';
export const COMMON_REQUESTED = 'COMMON_REQUESTED';

export const COMMON_INIT_DATA = 'COMMON_INIT_DATA';
export const CHANGE_SITE = 'CHANGE_SITE';