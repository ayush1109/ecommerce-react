import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Products } from './product';
import { Seller } from './seller';
import { Auth } from './auth';
import { User } from './user';
import { QueryProducts } from './queryProducts';

export const ConfigureStore = () => {
    const Store = createStore(          //Redux Store
        combineReducers({
            products: Products,
            queryProducts: QueryProducts,
            auth : Auth,
            seller : Seller,
            user : User
        }),
        applyMiddleware(thunk, logger)
    );
    
    return Store;
}