import * as types from './../constants/actionTypes';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';


let cartData = JSON.parse(localStorage.getItem('cart'));
let initialState = cartData ? cartData : [];


const cartReducer = (state = initialState, action) => {
    let { product, quantity } = action;
    let index = -1;

    switch (action.type) {
        case types.ADD_TO_CART:
            var regNumber = /^\d+$/;
            if (regNumber.test(quantity)) {
                quantity = parseInt(quantity, 10);
                if (quantity === 0) {
                    NotificationManager.error('Số lượng phải lơn hơn 0');
                    return [...state];
                }

                index = _.findIndex(state, function (o) { return o.product.product_id === product.product_id; });
                if (index !== -1) {
                    let existQuantity = parseInt(state[index].quantity, 10);
                    let iCurentProduct = state[index].product.product_in_stock - existQuantity;
                    if ((existQuantity + quantity) > state[index].product.product_in_stock) {
                        if (iCurentProduct !== 0) {
                            NotificationManager.error(`Chỉ còn ${iCurentProduct} trong kho`);
                        } else {
                            NotificationManager.error(`Sản phẩm đã hết hàng`);
                        }
                    } else {
                        state[index].quantity = existQuantity + quantity;
                        NotificationManager.success(`đã được thêm vào giỏ hàng!`, `${product.product_name}`);
                        localStorage.setItem('cart', JSON.stringify(state))
                    }

                } else {
                    delete product.product_slide;
                    if (quantity > product.product_in_stock) {
                        NotificationManager.error(`Chỉ còn ${product.product_in_stock} trong kho`);
                    } else {
                        state.push({
                            product,
                            quantity
                        })
                        NotificationManager.success(`đã được thêm vào giỏ hàng!`, `${product.product_name}`);
                        localStorage.setItem('cart', JSON.stringify(state))
                    }

                }
                // NotificationManager.success(`đã được thêm vào giỏ hàng!`, `${product.product_name}`);
                // localStorage.setItem('cart', JSON.stringify(state))
            } else {
                NotificationManager.error('Số lượng nhập vào bị lỗi');
            }
            return [...state];
        case types.DELETE_PRODUCTS_IN_CART:
            index = _.findIndex(state, function (o) { return o.product.product_id === product.product_id; });
            if (index !== -1) {
                state.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(state))
            }
            return [...state];
        case types.UPDATE_PRODUCTS_IN_CART:
            index = _.findIndex(state, function (o) { return o.product.product_id === product.product_id; });
            if (index !== -1) {
            
                if(quantity > state[index].product.product_in_stock){
                    NotificationManager.error(`Sản phẩm đã hết hàng`);
                }else{
                    state[index].quantity = quantity;
                    if (state[index].quantity <= 0) {
                        state[index].quantity = 1;
                    }
                    localStorage.setItem('cart', JSON.stringify(state))
                }
            }
            return [...state];
        default:
            return [...state];
    }
}

export default cartReducer;