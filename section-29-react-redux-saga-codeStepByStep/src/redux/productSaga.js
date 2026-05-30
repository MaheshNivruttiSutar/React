import { takeEvery, put } from 'redux-saga/effects'
import { PRODUCT_LIST, PRODUCTS_API, SEARCH_PRODUCT, SET_PRODUCT_LIST } from './constant';

function* getProducts() {
    let data = yield fetch(PRODUCTS_API);
    data = yield data.json();
    console.warn("action is called", data)
    yield put({type: SET_PRODUCT_LIST, data})
}

function* searchProducts(action) {
    let result = yield fetch(`${PRODUCTS_API}?q=${action.query}`);
    result = yield result.json();
    console.warn("action is called", result)
    yield put({type: SET_PRODUCT_LIST, data:result})
}

function* productSaga() {
    yield takeEvery(PRODUCT_LIST, getProducts)
    yield takeEvery(SEARCH_PRODUCT, searchProducts)

}

export default productSaga;