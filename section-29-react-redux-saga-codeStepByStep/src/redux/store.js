// import {createStore} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './rootReducer';
import productSaga from './productSaga'
import createSagaMiddleware from 'redux-saga';

// const store = createStore(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store  = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(productSaga);

export default store;