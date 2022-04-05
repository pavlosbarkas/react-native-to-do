import {SET_LOADING, SET_TASKS, SET_SUBTASKS} from '../constants/index';

export const setTasks = payload => ({
  type: SET_TASKS,
  payload,
});

export const setSubtasks = payload => ({
  type: SET_SUBTASKS,
  payload,
});

export const setLoading = payload => ({
  type: SET_LOADING,
  payload,
});
