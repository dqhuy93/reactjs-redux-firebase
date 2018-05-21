import * as types from './../constants/actionTypes';


const INITIAL_STATE = {
	productsHome: {},
	productsList: {},
	productDetail: {}
};

// const applySetProducts = (state, action) => ({
// 	...state,
// 	productsHome: action.productsHome,
// 	productsList: action.productsList
// });

function productReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case types.GET_PRODUCTS_HOME:
			return {
				...state,
				productsHome: action.products,
			};
		case types.GET_PRODUCTS_LIST:
			return {
				...state,
				productsList: action.products
			};
		case types.GET_PRODUCT_DETAIL:
			return {
				...state,
				productDetail: action.product
			};
		default: return state;
	}
}

export default productReducer;