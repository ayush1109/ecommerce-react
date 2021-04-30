import * as ActionTypes from './ActionTypes';        //Reducer Functions

export const Products = (state = {
    isLoading: true,
    errMess: null,
    products: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PRODUCTS:
        case ActionTypes.UPDATE_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, errMess: null, products: action.payload };

        case ActionTypes.PRODUCTS_LOADING:
        case ActionTypes.UPDATE_PRODUCT_LOADING:
            return { ...state, isLoading: true, errMess: null, products: [] };

        case ActionTypes.PRODUCTS_FAILED:
        case ActionTypes.UPDATE_PRODUCT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, products: [] };

        default:
            return state;
    }
}