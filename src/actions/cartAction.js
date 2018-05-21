import * as types from './../constants/actionTypes';

export const actAddToCart = (product, quantity = 1) => {
    return {
        type: types.ADD_TO_CART,
        product,
        quantity: quantity
    }
}

export const actDeleteProductInCart = (product) => {
    return {
        type: types.DELETE_PRODUCTS_IN_CART,
        product
    }
}

export const actUpdateProductInCart = (product, quantity) => {
    return {
        type: types.UPDATE_PRODUCTS_IN_CART,
        product,
        quantity
    }
}