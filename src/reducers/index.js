import {
  UPDATE_ATOM,
  UPDATED_ATOM,
  FETCHING_ITEMS,
  FETCHED_ITEMS,
  ERROR,
} from '../actions';

import { INITIAL_STATE } from './initialState';

const mainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_ATOM:
      const { index, axis, value } = action.data;
      const current = state.data[state.picked_material];
      const atomsList = [...current.spaceDistribution];
      atomsList[index][axis] = value;

      return {
        ...state,
        atomUpdated: !state.atomUpdated,
        data: {
          ...state.data,
          [state.picked_material]: Object.assign(current, {
            spaceDistribution: atomsList,
          }),
        },
      };
    case UPDATED_ATOM:
      return {
        ...state,
        atomUpdated: !state.atomUpdated,
      };
    case FETCHING_ITEMS:
      return {
        ...state,
        fetching_Items: true,
        fetched_Item: false,
        error: null,
      };
    case FETCHED_ITEMS:
      // console.log(action.fetched);
      return {
        ...state,
        fetching_Items: false,
        fetched_Item: true,
        data: action.data,
      };
    case ERROR:
      return {
        ...state,
        error: action.message,
        fetching_Items: false,
        adding_Item: false,
        updating_Item: false,
        deleting_Item: false,
      };
    default:
      return state;
  }
};

export default mainReducer;
