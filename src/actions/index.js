import axios from 'axios';
import { MOCK_DATA } from '../reducers/mockData';

export const UPDATE_ATOM = 'UPDATE_ATOM';
export const UPDATED_ATOM = 'UPDATED_ATOM';
export const FETCHING_ITEMS = 'FETCHING_ITEMS';
export const FETCHED_ITEMS = 'FETCHED_ITEM';
export const ERROR = 'ERROR';

const URL = process.env.REACT_APP_API;
const URL_REGISTER = process.env.REACT_APP_API_REGISTER;
const URL_LOGIN = process.env.REACT_APP_API_LOGIN;

const errorAction = (error) => {
  return {
    type: ERROR,
    message: error.message,
  };
};

export const updateAtomInfo = (event) => {
  event.stopPropagation();

  const { id, value } = event.target;
  const details = id.split('-');
  const index = details[2];
  const axis = details[0];

  return (dispatch) => {
    dispatch({
      type: UPDATE_ATOM,
      data: { index, axis, value },
    });
  };
};

export const updatedAtom = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATED_ATOM,
    });
  };
};

export const fetchingItems = () => {
  if (!URL)
    return (dispatch) => {
      dispatch({
        type: FETCHED_ITEMS,
        data: MOCK_DATA,
      });
    };

  const fetch = axios.get(URL);
  return (dispatch) => {
    dispatch({
      type: FETCHING_ITEMS,
    });
    fetch
      .then((response) => {
        // console.log('response.data', response.data);
        dispatch({
          type: FETCHED_ITEMS,
          data: response.data,
        });
      })
      .catch((e) => {
        console.log('error', e);
        dispatch(errorAction(e));
      });
  };
};
