import axios from "axios";
import { select, put, takeEvery } from "redux-saga/effects";

async function getData(page) {
  try {
    const { data } = await axios.get(
      "https://fresh-rope-219511.appspot.com/?page=" + page
    );
    return data;
  } catch (error) {
    return { productsArray: ["Error"], brands: [] };
  }
}

const getPage = state => state.page;

function* fetchData() {
  // yield put({ type: "IS_LAODING" });
  const page = yield select(getPage);
  const data = yield getData(page);
  yield put({ type: "DATA_FETCHED", data });
}

export function* watchFetchData() {
  yield takeEvery("FETCH_DATA", fetchData);
}
