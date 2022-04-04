import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';

const CustomSubtaskRow = ({item, renameSubTask, deleteSubTask}) => {
  let [dialogVisible, setDialogVisible] = useState(false);
  let [subTaskName, setSubTaskName] = useState(item.name);

  /*const showEditTaskDialog = id => {
    setCurrentTaskIDState(id);
    setEditTaskDialogVisible(true);
  };

  const hideEditTaskDialog = () => setEditTaskDialogVisible(false);

  const renameTask = () => {
    let tempTasks = parentState.subtasks;
    tempTasks.forEach(task => {
      if (task.id === parentState.currentTaskID) {
        task.name = newSubtaskName;
      }
    });
    setSubtasksState(tempTasks);
  };

  const deleteTask = id => {
    let tempTasks = parentState.subtasks;
    tempTasks.forEach(task => {
      if (task.id === id) {
        tempTasks.splice(tempTasks.indexOf(task, 0), 1);
      }
    });
    setSubtasksState(tempTasks);
  };*/

  return (
    <View style={styles.flatlistRow}>
      <Text style={styles.taskName}>{item.name}</Text>
      <View style={styles.buttons}>
        {/*#region Edit Button*/}
        <TouchableOpacity
          style={styles.editTaskButton}
          onPress={() => {
            setDialogVisible(true);
          }}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        {/*#endregion*/}
        {/*#region Edit SubTask Name Dialog*/}
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>Edit task</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={styles.dialogTextInput}
                placeholder="Enter new task name"
                defaultValue=""
                onChangeText={text => {
                  setSubTaskName(text);
                }}
                value={subTaskName}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Pressable
                style={styles.dialogCreateTaskButton}
                onPress={() => {
                  renameSubTask({id: item.id, name: subTaskName});
                  setDialogVisible(false);
                }}>
                <Text style={styles.dialogButtonText}>Confirm</Text>
              </Pressable>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {/*#endregion*/}
        {/*#region Delete Button*/}
        <TouchableOpacity
          style={styles.editTaskButton}
          onPress={() => {
            deleteSubTask(item.id);
          }}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        {/*#endregion*/}
      </View>
    </View>
  );
};

export default CustomSubtaskRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#192734',
  },
  flatlistContainer: {
    flex: 8,
    borderTopWidth: 7,
    borderTopColor: '#324e68',
    borderBottomWidth: 7,
    borderBottomColor: '#324e68',
  },
  flatlistRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  taskName: {
    flex: 1,
    fontSize: 24,
    lineHeight: 40,
    padding: 20,
    color: 'white',
    fontWeight: '500',
  },
  fabContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  floatingButton: {
    alignSelf: 'center',
    backgroundColor: '#4b759c',
  },
  dialogTextInput: {
    borderWidth: 2,
  },
  dialogCreateTaskButton: {
    backgroundColor: 'cyan',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    padding: 7,
  },
  dialogButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 40,
    padding: 10,
    color: 'white',
    fontWeight: '400',
  },
  editTaskButton: {},
  showSubtasksButton: {},
});
