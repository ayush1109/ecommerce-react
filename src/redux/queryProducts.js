import * as ActionTypes from './ActionTypes';        //Reducer Functions

export const QueryProducts = (state = {
        isLoading: true,
        errMess: null,
        queryProducts: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_QUERYPRODUCTS:
            return {...state, isLoading: false, errMess: null, queryProducts: action.payload};

        case ActionTypes.QUERYPRODUCTS_LOADING:
            return {...state, isLoading: true, errMess: null, queryProducts: []};

        case ActionTypes.QUERYPRODUCTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, queryProducts: []};

        default:
            return state;
    }
}