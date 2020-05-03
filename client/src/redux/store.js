import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from "redux-thunk"
import authReducer from './reducers/auth-reducer';

const reducers = combineReducers({
    form: formReducer,
    auth: authReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
