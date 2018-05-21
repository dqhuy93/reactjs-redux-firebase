import { combineReducers } from 'redux';
import sessionReducer from './session';
import productReducer from './product';
import cartReducer from './cart';
import categoryReducer from './category';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  productState: productReducer,
  categoryState: categoryReducer,
  cartState: cartReducer
});

export default rootReducer;
