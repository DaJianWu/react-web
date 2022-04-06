import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import axiosInstance from '../server';
import { init } from './action';
import { reducer } from './reducer';

export const initialStore = {
  value: 0,
};

export const store = createStore(
  reducer,
  initialStore,
  applyMiddleware(thunkMiddleware)
);

export const selectorValue = (state: any) => state.value;

export async function fetchData(dispatch: any, getState: any) {
  const response = await axiosInstance.get(
    'https://dajianwu.github.io/dist/data.json'
  );
  // console.log(response);

  // const stateBefore = getState();
  // console.log('before dispatch: ', stateBefore);

  dispatch(init(response.data));

  // const stateAfter = getState();
  // console.log('after dispatch: ', stateAfter);
}
