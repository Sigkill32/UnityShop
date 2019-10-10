import axios from "axios";
import { select, put, takeEvery } from "redux-saga/effects";

async function getData(page) {
  const { data } = await axios.get(
    "https://fresh-rope-219511.appspot.com/?page=" + page
  );
  return data;
}

const getPage = state => state.page;

function* fetchData() {
  const page = yield select(getPage);
  const data = yield getData(page)
  yield put({type: 'DATA_FETCHED', data})
}

export function watchFetchData() {
  yield takeEvery('FETCH_DATA', fetchData)
}
