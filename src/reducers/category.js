import * as types from './../constants/actionTypes';

const INITIAL_STATE = [];

function categoryReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case types.GET_CATEGORY:
			state = action.category;
			return [...state];
		default: return state;
	}
}

export default categoryReducer;