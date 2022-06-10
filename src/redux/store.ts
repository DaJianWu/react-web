import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import axiosInstance from 'src/server';
import { init, update } from './action';
import { reducer } from './reducer';

export const initialStore = {
  loading: false,
  value: 0,
};

export const store = createStore(
  reducer,
  initialStore,
  applyMiddleware(thunkMiddleware)
);

export const selectorLoading = (state: any) => state.loading;
export const selectorValue = (state: any) => state.value;

export async function fetchData(dispatch: any, getState: any) {
  dispatch(update({ loading: true }));

  const response = await axiosInstance.get(
    'https://dajianwu.github.io/dist/data.json'
  );
  // console.log(response);

  // const stateBefore = getState();
  // console.log('before dispatch: ', stateBefore);

  dispatch(update({ ...response.data, loading: false }));

  // const stateAfter = getState();
  // console.log('after dispatch: ', stateAfter);
}
