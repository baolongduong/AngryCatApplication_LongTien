import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import loginReducer from './reducers/userReducer';

const AppReducers = combineReducers({
    loginReducer,
});

const rootReducer = (state, action) => {
    return AppReducers(state, action);
}
let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;