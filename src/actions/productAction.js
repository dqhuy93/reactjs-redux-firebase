import * as types from './../constants/actionTypes';

export const actGetProductHome = (products) => {
    return {
        type: types.GET_PRODUCTS_HOME,
        products
    }
}

export const actGetProductList = (products) => {
    return {
        type: types.GET_PRODUCTS_LIST,
        products
    }
}


export const actSetProductDetail = (product) => {
    return {
        type: types.GET_PRODUCT_DETAIL,
        product
    }
}
