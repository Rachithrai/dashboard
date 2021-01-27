import { call, put, takeLatest } from "redux-saga/effects";
import { REQUEST_API, receiveApi } from "./action";
import { fetchData } from "./api";

function* getData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveApi(data));
  } catch (e) {
    console.log(e);
  }
}
function* mySaga() {
  yield takeLatest(REQUEST_API, getData);
}

export default mySaga;
