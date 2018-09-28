import {applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './state';


export default (initialState) => {


    const appliedMiddleware = applyMiddleware(promiseMiddleware);
    const enhancer = composeWithDevTools(appliedMiddleware);

    return createStore(rootReducer, initialState, enhancer);
}