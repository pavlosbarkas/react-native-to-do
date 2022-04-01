import React, {useState} from 'react';
import {Pressable, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CustomTaskRow = ({item, renameTask, deleteTask}) => {
  let newTaskName = '';
  let [currentTask, setCurrentTask] = useState(item);
  let [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  let [taskName, setTaskName] = useState(item.name);

  const hideEditTaskDialog = () => {
    setVisible(false);
  };

  return (
    <View style={styles.flatlistRow}>
      <Text style={styles.taskName}>{item.name}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.editTaskButton}
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <Portal>
          <Dialog visible={visible} onDismiss={hideEditTaskDialog}>
            <Dialog.Title>Edit task</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={styles.dialogTextInput}
                placeholder="Enter new task name"
                defaultValue=""
                onChangeText={text => {
                  setTaskName(text);
                }}
                value={taskName}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Pressable
                style={styles.dialogCreateTaskButton}
                onPress={() => {
                  renameTask({id: item.id, name: taskName});
                  hideEditTaskDialog();
                }}>
                <Text style={styles.dialogButtonText}>Confirm</Text>
              </Pressable>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <TouchableOpacity
          style={styles.editTaskButton}
          onPress={() => {
            deleteTask(item.id);
          }}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showSubtasksButton}
          onPress={() => {
            navigation.navigate('Subtasks', {
              taskID: item.id,
            });
          }}>
          <Text style={styles.buttonText}>Subtasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTaskRow;

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
