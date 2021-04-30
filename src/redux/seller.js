import * as ActionTypes from './ActionTypes';        //Reducer Functions

export const Seller = (state = {
    isLoading: true,
    errMess: null,
    seller: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SELLER_GET:
        case ActionTypes.UPDATE_SELLER_SUCCESS:
            return { ...state, isLoading: false, errMess: null, seller: action.payload };

        case ActionTypes.SELLER_LOADING:
        case ActionTypes.UPDATE_SELLER_LOADING:
            return { ...state, isLoading: true, errMess: null, seller: [] };

        case ActionTypes.SELLER_FAILED:
        case ActionTypes.UPDATE_SELLER_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, seller: [] };

        default:
            return state;
    }
}