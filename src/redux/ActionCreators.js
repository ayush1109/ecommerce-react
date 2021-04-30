import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading(true));

    return fetch(baseUrl + 'product')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(products => dispatch(addProducts(products)))
            .catch(error => dispatch(productsFailed(error.message)));
}

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errmess) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errmess
})

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
})


export const fetchQueryProducts = (keyword) => (dispatch) => {
    dispatch(queryProductsLoading(true));

    return fetch(baseUrl + 'users/search?query=' + keyword)
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(products => dispatch(addQueryProducts(products)))
            .catch(error => dispatch(queryProductsFailed(error.message)));
}

export const queryProductsLoading = () => ({
    type: ActionTypes.QUERYPRODUCTS_LOADING
});

export const queryProductsFailed = (errmess) => ({
    type: ActionTypes.QUERYPRODUCTS_FAILED,
    payload: errmess
})

export const addQueryProducts = (queryProducts) => ({
    type: ActionTypes.ADD_QUERYPRODUCTS,
    payload: queryProducts
})

export const updateSeller = (info) => (dispatch) => {
    dispatch(updateSellerLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'sellers', {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(info)
    })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(seller => dispatch(updateSellerSucess(seller)))
            .catch(error => dispatch(updateSellerFailed(error.message)));
}

export const updateSellerLoading = () => ({
    type: ActionTypes.UPDATE_SELLER_LOADING
});

export const updateSellerFailed = (errmess) => ({
    type: ActionTypes.UPDATE_SELLER_FAILED,
    payload: errmess
})

export const updateSellerSucess = (seller) => ({
    type: ActionTypes.SELLER_GET,
    payload: seller
})


//operations for user

export const requestUserLogin = (creds) => {
    return {
        type: ActionTypes.USER_LOGIN_REQUEST,
        creds
    }
}

export const requestUserSignup = (creds) => {
    return {
        type: ActionTypes.USER_SIGNUP_REQUEST,
        creds
    }
}
  
export const receiveUserLogin = (response) => {
    return {
        type: ActionTypes.USER_LOGIN_SUCCESS,
        token: response.token,
        message: response.status
    }
}
 
export const receiveUserSignup = (status) => {
    return {
        type: ActionTypes.USER_SIGNUP_SUCCESS,
        message: status
    }
}

export const userLoginError = (errmess) => {
    return {
        type: ActionTypes.USER_LOGIN_FAILURE,
        message: errmess
    }
}

export const userSignupError = (errmess) => {
    return {
        type: ActionTypes.USER_SIGNUP_FAILURE,
        message: errmess
    }
}
export const signupUser = (creds) => (dispatch) => {
    dispatch(requestUserSignup(true))

    return fetch(baseUrl + 'users/signup', {
        method : 'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // Dispatch the success action
            dispatch(receiveUserSignup(response.status));
            dispatch(loginUser(creds));
        }
        else {
            var error = new Error('Error ' + response.err);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(userSignupError(error.message)))
};



export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestUserLogin(true))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'  
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            localStorage.setItem('Uid', JSON.stringify(response.id));
            // Dispatch the success action
            dispatch(receiveUserLogin(response));
            dispatch(getAUser(response.id));
        }
        else {
            var error = new Error('Error ' + response.err);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(userLoginError(error.message)))
};

export const requestUserLogout = () => {
    return {
      type: ActionTypes.USER_LOGOUT_REQUEST
    }
}
  
export const receiveUserLogout = () => {
    return {
      type: ActionTypes.USER_LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestUserLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('Uid');
    dispatch(receiveUserLogout())
}

export const updateUser = (info) => (dispatch) => {
    dispatch(updateUserLoading(true));
    console.log(info);
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'users', {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(info)
    })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(user => dispatch(updateUserSucess(user)))
            .catch(error => dispatch(updateUserFailed(error.message)));
}

export const updateUserLoading = () => ({
    type: ActionTypes.UPDATE_USER_LOADING
});

export const updateUserFailed = (errmess) => ({
    type: ActionTypes.UPDATE_USER_FAILED,
    payload: errmess
})

export const updateUserSucess = (user) => ({
    type: ActionTypes.USER_GET,
    payload: user
})



//operations for seller

export const requestSellerLogin = (creds) => {
    return {
        type: ActionTypes.SELLER_LOGIN_REQUEST,
        creds
    }
}

export const requestSellerSignup = (creds) => {
    return {
        type: ActionTypes.SELLER_SIGNUP_REQUEST,
        creds
    }
}
  
export const receiveSellerLogin = (response) => {
    return {
        type: ActionTypes.SELLER_LOGIN_SUCCESS,
        token: response.token,
        sellerId: response.id
    }
}
 
export const receiveSellerSignup = () => {
    return {
        type: ActionTypes.SELLER_SIGNUP_SUCCESS
    }
}

export const sellerLoginError = (message) => {
    return {
        type: ActionTypes.SELLER_LOGIN_FAILURE,
        message: message
    }
}

export const sellerSignupError = (message) => {
    return {
        type: ActionTypes.SELLER_SIGNUP_FAILURE,
        message: message
    }
}
export const signupSeller = (creds) => (dispatch) => {
    dispatch(requestSellerSignup(true))
    return fetch(baseUrl + 'waiting/signup', {
        method : 'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // Dispatch the success action
            dispatch(receiveSellerSignup());
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(sellerSignupError(error.message)))
};



export const loginSeller = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSellerLogin(true))

    return fetch(baseUrl + 'sellers/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            localStorage.setItem('Sid', JSON.stringify(response.id));
            // Dispatch the success action
            dispatch(receiveSellerLogin(response));
            dispatch(getASeller(response.id));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(sellerLoginError(error.message)))
};

export const requestSellerLogout = () => {
    return {
      type: ActionTypes.SELLER_LOGOUT_REQUEST
    }
}
  
export const receiveSellerLogout = () => {
    return {
      type: ActionTypes.SELLER_LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutSeller = () => (dispatch) => {
    dispatch(requestSellerLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    localStorage.removeItem('Sid');
    dispatch(receiveSellerLogout())
}



export const requestSeller = () => {
    return {
      type: ActionTypes.SELLER_LOADING
    }
}
  
export const sellerFailed = (message) => {
    return {
      type: ActionTypes.SELLER_FAILED,
      payload: message
    }
}

export const addSeller = (seller) => ({
    type: ActionTypes.SELLER_GET,
    payload: seller
})


export const getASeller = (id) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSeller(true))

    return fetch(baseUrl + 'seller/' + id)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => dispatch(addSeller(response)))
    .catch(error => dispatch(sellerFailed(error.message)))
};


export const requestUser = () => {
    return {
      type: ActionTypes.USER_LOADING
    }
}
  
export const userFailed = (message) => {
    return {
      type: ActionTypes.USER_FAILED,
      payload : message
    }
}

export const addUser = (user) => ({
    type: ActionTypes.USER_GET,
    payload: user
})


export const getAUser = (id) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestUser(id))

    return fetch(baseUrl + 'user/' + id)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => dispatch(addUser(response)))
    .catch(error => dispatch(userFailed(error.message)))
};



export const uploadProduct = (product) => (dispatch) => {
    dispatch(uploadProductLoading(true));
    console.log(product)
    console.log(JSON.stringify(product));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    console.log(bearer);
    return fetch(baseUrl + 'product', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json', 
            'Authorization': bearer
        },
        body: JSON.stringify(product)
    })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(products => dispatch(uploadProductSucess(products)))
            .catch(error => dispatch(uploadProductFailed(error.message)));
}

export const uploadProductLoading = () => ({
    type: ActionTypes.UPLOAD_PRODUCTS_LOADING
});

export const uploadProductFailed = (errmess) => ({
    type: ActionTypes.UPLOAD_PRODUCTS_FAILED,
    payload: errmess
})

export const uploadProductSucess = (product) => ({
    type: ActionTypes.UPLOAD_PRODUCTS,
    payload: product
})


// export const uploadProductImage = (image) => (dispatch) => {
//     dispatch(uploadProductImageLoading(true));
//     console.log((image));
//     return fetch(baseUrl + 'uploadImage', {
//         method: 'POST',
//         headers: {
//             'Content-Type':'multipart/form-data'
//         },
//         body:image
//     })
//             .then(response => {
//                 if (response.ok) {
//                     return response;
//                 }
//                 else {
//                     var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                     error.response = response;
//                     throw error;
//                 }
//             },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//             .then(response => response.json())
//             .then(id => dispatch(uploadProductImageSucess(id)))
//             .catch(error => dispatch(uploadProductImageFailed(error.message)));
// }

// export const uploadProductImageLoading = () => ({
//     type: ActionTypes.UPLOAD_PRODUCTS_IMAGE_LOADING
// });

// export const uploadProductImageFailed = (errmess) => ({
//     type: ActionTypes.UPLOAD_PRODUCTS_IMAGE_FAILED,
//     payload: errmess
// })

// export const uploadProductImageSucess = (image) => ({
//     type: ActionTypes.UPLOAD_PRODUCT_IMAGE,
//     payload: image
// })


export const updateProduct = (info, id) => (dispatch) => {
    dispatch(updateProductLoading(true));
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl + 'product/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': bearer
        },
        body: JSON.stringify(info)
    })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then(response => response.json())
            .then(seller => dispatch(updateProductSucess(seller)))
            .catch(error => dispatch(updateProductFailed(error.message)));
}

export const updateProductLoading = () => ({
    type: ActionTypes.UPDATE_PRODUCT_LOADING
});

export const updateProductFailed = (errmess) => ({
    type: ActionTypes.UPDATE_PRODUCT_FAILED,
    payload: errmess
})

export const updateProductSucess = (product) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: product
})
