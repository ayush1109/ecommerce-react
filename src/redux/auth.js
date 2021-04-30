import * as ActionTypes from './ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export const Auth = (state = {
        isLoading: false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        token: localStorage.getItem('token'),
        user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
        message: '',
        sellerId : localStorage.getItem('Sid') ? JSON.parse(localStorage.getItem('Sid')) : null,
        userId : localStorage.getItem('Uid') ? JSON.parse(localStorage.getItem('Uid')) : null,
        }, action) => {
    switch (action.type) {
        case ActionTypes.USER_LOGIN_REQUEST:
        case ActionTypes.SELLER_LOGIN_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            };
        case ActionTypes.USER_LOGIN_SUCCESS:
        case ActionTypes.SELLER_LOGIN_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: true,
                token: action.token,
                message: action.message
            };
        case ActionTypes.USER_LOGIN_FAILURE:
        case ActionTypes.SELLER_LOGIN_FAILURE:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                message: action.message
            };
        case ActionTypes.USER_LOGOUT_REQUEST:
        case ActionTypes.SELLER_LOGOUT_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.USER_LOGOUT_SUCCESS:
        case ActionTypes.SELLER_LOGOUT_SUCCESS:
            return {...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null,
                message : 'Sucessfully logged out!!!'
            };

        case ActionTypes.USER_SIGNUP_REQUEST:
        case ActionTypes.SELLER_SIGNUP_REQUEST:
            return {...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            };
            case ActionTypes.USER_SIGNUP_SUCCESS:
            case ActionTypes.SELLER_SIGNUP_SUCCESS:
                return {...state,
                    isLoading: false,
                    isAuthenticated: true,
                    message: action.message
                };
            case ActionTypes.USER_SIGNUP_FAILURE:
            case ActionTypes.SELLER_SIGNUP_FAILURE:
                return {...state,
                    isLoading: false,
                    isAuthenticated: false,
                    message: action.message
                };
        default:
            return state
    }
}