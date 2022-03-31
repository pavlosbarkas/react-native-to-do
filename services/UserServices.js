import jsonData from '../jsonData.json';

const getUsers = () => {
  let users = [];
  jsonData.users.forEach(user => {
    users.push(user);
  });
  return users;
};

const loginUser = (username, password) => {
  let userExists = false;
  jsonData.users.forEach(user => {
    if (user.username === username) {
      if (user.password === password) {
        userExists = true;
      }
    }
  });
  return userExists;
};

const getUserID = username => {
  let id = null;
  jsonData.users.forEach(user => {
    if (user.username === username) {
      id = user.id;
    }
  });
  return id;
};

const getUserTasks = userID => {
  let tasks = [];
  jsonData.tasks.forEach(task => {
    if (task.userID === userID) {
      tasks.push(task);
    }
  });
  return tasks;
};

const getSubtasks = selectedTaskID => {
  let tempSubtasks = [];

  jsonData.tasks.forEach(task => {
    if (task.id === selectedTaskID) {
      tempSubtasks = task.subtasks;
    }
  });
  return tempSubtasks;
};

export {getUsers, loginUser, getUserID, getUserTasks, getSubtasks};
