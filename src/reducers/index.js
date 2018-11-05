import {
  FETCHING_ITEMS,
  FETCHED_ITEMS,
  ADDING_ITEM,
  ADDED_ITEM,
  UPDATING_ITEM,
  UPDATED_ITEM,
  DELETING_ITEM,
  DELETED_ITEM,
  ERROR,
  CREATING_USER,
  CREATED_USER,
  LOG_IN_USER,
  LOGGED_IN_USER,
  LOG_IN_USER_ERROR,
  CREATE_USER_ERROR,
  AUTH_USER,
  LOG_OUT_USER,
} from '../actions';

const initialState = {
  data: [],
  user: {},
  creating_user: false,
  created_user: false,
  loggin_in_user: false,
  logged_in_user: false,
  authUser: false,
  fetching_Items: false,
  fetched_Item: false,
  adding_Item: false,
  added_Item: false,
  updating_Item: false,
  updated_Item: false,
  deleting_Item: false,
  deleted_Item: false,
  error: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case ADDING_ITEM:
      return {
        ...state,
        adding_Item: true,
        added_Item: false,
        error: null,
      };
    case ADDED_ITEM:
      return {
        ...state,
        adding_Item: false,
        added_Item: true,
        //OPTION-1
        // data: [...state.data, action.allItems[action.allItems.length - 1]] // TO REVIEW WITH REAL EXAMPLES
        //OPTION-2
        // data: action.allItems // SERVER RESPONSE
        // OPTIONS-3
        data: [...state.data, action.newItem], // map over the current, return new array, w/ updated item
      };
    case UPDATING_ITEM:
      return {
        ...state,
        updating_Item: true,
        updated_Item: false,
        error: null,
      };
    case UPDATED_ITEM:
      console.log('REDUCER UPDATED_ITEM: action.content', action.content);
      console.log('REDUCER UPDATED_ITEM: action.allItems', action.allItems);
      const index = Number(action.index);
      console.log(
        'REDUCER UPDATED_ITEM: action.index',
        index,
        typeof index,
        typeof Number(action.index),
      );
      return {
        ...state,
        updating_Item: false,
        updated_Item: true,
        /**
         * OPTION-1: discourage: this just overwrite all the state. (State 'must be cloned first).then(modify the new cloned state)
         */
        // data: action.allItems
        /**
         * OPTION-2: DO NOT WORKS
         * todo: refactor this implementation.
         */
        // data: [
        //   ...state.data.slice(0, action.index),
        //   (state.data[action.index] = action.content),
        //   ...state.data.slice(action.index + 1)
        // ]
        /**
         * OPTION-3: both works as expected
         * 3.1: discourage => this option do not first 'clone' the object into the array that needs to be modified.
         * 3.2: The proper approach!
         */
        /** 3.1 */

        // data: Object.assign([...state.data], { [index]: action.content })
        /** 3.2 */
        data: Object.assign([...state.data], {
          [index]: Object.assign({}, state.data[index], action.content),
        }),
      };
    case DELETING_ITEM:
      return {
        ...state,
        deleting_Item: true,
        deleted_Item: false,
        error: null,
      };
    case DELETED_ITEM:
      // console.log("action.toDelete", action.toDelete);
      const newStateData = [...state.data];
      newStateData.splice(action.index, 1);
      return {
        ...state,
        deleting_Item: false,
        deleted_Item: true,
        //OPTION-1
        // data: action.allItems, // do not works connected to API for the BAckendproject, in Heroku
        //OPTION-2  => to review with real data
        // data: [
        //   ...state.data.slice(0, action.index),
        //   ...state.data(index + 1)
        // ]
        // OPTION-3
        data: newStateData,
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
    case CREATING_USER:
      return {
        ...state,
        creating_user: true,
      };
    case CREATED_USER:
      return {
        ...state,
        user: action.user,
        creating_user: false,
        created_user: true,
      };
    case AUTH_USER:
      return {
        ...state,
        authUser: true,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        error: { message: action.message, type: action.eType },
        creating_user: false,
        authUser: false,
      };
    case LOG_IN_USER:
      return {
        ...state,
        loggin_in_user: true,
      };
    case LOGGED_IN_USER:
      return {
        ...state,
        user: action.user,
        loggin_in_user: false,
        logged_in_user: true,
      };
    case LOG_IN_USER_ERROR:
      return {
        ...state,
        error: { message: action.message, type: action.eType },
        loggin_in_user: false,
        logged_in_user: false,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        user: {},
        created_user: false,
        logged_in_user: false,
        authUser: false,
      };
    default:
      return state;
  }
};

export default mainReducer;
