import { takeLatest, call, put } from 'redux-saga/effects';
import { getCountries } from '../utils/api.js';

// Actions

const COUNTRIES = 'formik-duck/form/COUNTRIES';
const FAILURE = 'formik-duck/form/FAILURE';
const FETCH = 'formik-duck/form/FETCH';

// Reducer

export default (state = { countries: [], name: '', error: {} }, action) => {
  switch(action.type) {
    case COUNTRIES:
      return {
        ...state,
        countries: action.payload
      };
    case FETCH:
      return {
        ...state,
        name: action.payload
      };
    case FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action Creators

export const setCountries = countries => ({
  type: COUNTRIES,
  payload: countries
});

export const countriesFailure = error => ({
  type: FAILURE,
  payload: error
});

export const apiFetch = name => ({
  type: FETCH,
  payload: name
});

// Sagas

export function* watcherSaga() {
  yield takeLatest(FETCH, fetchCountries)
}

export function* fetchCountries(e) {
  try {
    const data = yield call(() => getCountries(e.payload));

    yield put(setCountries(data));
  } catch (e) {
    yield put(countriesFailure(e));
  }
}