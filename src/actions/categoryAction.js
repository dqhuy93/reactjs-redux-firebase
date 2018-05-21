
import * as types from './../constants/actionTypes';

export const actGetCategoryList = (category) => {
    return {
        type: types.GET_CATEGORY,
        category
    }
}