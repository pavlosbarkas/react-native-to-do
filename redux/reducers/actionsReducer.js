import {SET_LOADING, SET_TASKS, SET_SUBTASKS} from '../constants/index';

//initial state of the state object
const initialState = {
  userTasks: [],
  subtasks: [],
  loading: false,
};

const actionsReducer = (state = initialState, action) => {
  switch (action.type) {
    //action represents the object in actions.js
    case SET_TASKS:
      return {
        ...state,
        userTasks: action.payload,
      };
    case SET_SUBTASKS:
      return {
        ...state,
        subtasks: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default actionsReducer;
