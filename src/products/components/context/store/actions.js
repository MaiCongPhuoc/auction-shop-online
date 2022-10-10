import {SET_TYPE, SET_PRODUCTS} from './constants';

export const setType = payload => ({
    type: SET_TYPE,
    payload
});

export const setProducts = payload => ({
    type: SET_PRODUCTS,
    payload
});