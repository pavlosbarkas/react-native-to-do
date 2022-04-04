import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CustomTaskRow = ({item, renameTask, deleteTask}) => {
  let [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();
  let [taskName, setTaskName] = useState(item.name);

  return (
    <View style={styles.flatlistRow}>
      <Text style={styles.taskName}>{item.name}</Text>
      <View style={styles.buttons}>
        {/*#region Edit Button*/}
        <Pressable
          style={styles.editTaskButton}
          onPress={() => {
            setDialogVisible(true);
          }}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        {/*#endregion*/}
        {/*#region Edit Task Name Dialog*/}
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
                  setDialogVisible(false);
                }}>
                <Text style={styles.dialogButtonText}>Confirm</Text>
              </Pressable>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {/*#endregion*/}
        {/*#region Delete Button*/}
        <Pressable
          style={styles.editTaskButton}
          onPress={() => {
            deleteTask(item.id);
          }}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
        {/*#endregion*/}
        {/*#region Subtasks Button*/}
        <Pressable
          style={styles.showSubtasksButton}
          onPress={() => {
            navigation.navigate('Subtasks', {
              taskID: item.id,
            });
          }}>
          <Text style={styles.buttonText}>Subtasks</Text>
        </Pressable>
        {/*#endregion*/}
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
