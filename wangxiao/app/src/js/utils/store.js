import {
    createStore,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

export default function (reducer){
    return createStore(
        reducer,
        applyMiddleware(promiseMiddleware({
            promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
        }), thunk)
    );
}
