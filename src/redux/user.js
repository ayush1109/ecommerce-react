import * as ActionTypes from './ActionTypes';        //Reducer Functions

export const User = (state = {
        isLoading: true,
        errMess: null,
        user: []
        }, action) => {
    switch(action.type) {
        case ActionTypes.USER_GET:
        case ActionTypes.UPDATE_USER_SUCCESS:
            return {...state, isLoading: false, errMess: null, user: action.payload};

        case ActionTypes.USER_LOADING:
        case ActionTypes.UPDATE_USER_LOADING:
            return {...state, isLoading: true, errMess: null, user: []};

        case ActionTypes.USER_FAILED:
        case ActionTypes.UPDATE_USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload, user: []};

        default:
            return state;
    }
}