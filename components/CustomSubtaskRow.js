import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appHeight, appWidth} from '../assets/ScreenDimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropShadow from 'react-native-drop-shadow';

const CustomSubtaskRow = ({item, renameSubTask, deleteSubTask}) => {
  let [dialogVisible, setDialogVisible] = useState(false);
  let [subTaskName, setSubTaskName] = useState(item.name);

  return (
    <View style={styles.flatlistRow}>
      <Text style={styles.taskName}>{item.name}</Text>
      <View style={styles.buttonsContainer}>
        {/*#region Edit Button*/}
        <Pressable
          style={styles.editButton}
          onPress={() => {
            setDialogVisible(true);
          }}>
          <MaterialIcons name="edit" size={25} color="white" />
        </Pressable>
        {/*#endregion*/}
        {/*#region Edit SubTask Name Dialog*/}
        <Portal>
          <Dialog
            style={styles.dialogContainer}
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title style={styles.dialogTitle}>Edit task</Dialog.Title>
            <Dialog.Content>
              <TextInput
                style={styles.dialogTextInput}
                placeholder="Enter new task name"
                placeholderTextColor="white"
                defaultValue=""
                onChangeText={text => {
                  setSubTaskName(text);
                }}
                value={subTaskName}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <DropShadow style={styles.confirmEditButtonDropShadow}>
                <Pressable
                  onPress={() => {
                    renameSubTask({id: item.id, name: subTaskName});
                    setDialogVisible(false);
                  }}>
                  <FontAwesome5 name="check-circle" size={40} color="white" />
                </Pressable>
              </DropShadow>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {/*#endregion*/}
        {/*#region Delete Button*/}
        <Pressable
          style={styles.deleteButton}
          onPress={() => {
            deleteSubTask(item.id);
          }}>
          <MaterialIcons name="delete" size={28} color="white" />
        </Pressable>
        {/*#endregion*/}
      </View>
    </View>
  );
};

export default CustomSubtaskRow;

const styles = StyleSheet.create({
  flatlistRow: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: 'lightgrey',
  },
  taskName: {
    width: appWidth * 0.6,
    fontSize: appWidth * 0.05,
    lineHeight: appHeight * 0.07,
    padding: appHeight * 0.028,
    color: 'white',
    fontWeight: '500',
  },
  buttonsContainer: {
    width: appWidth * 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginLeft: appWidth * 0.05,
    marginRight: appWidth * 0.04,
    padding: appWidth * 0.01,
  },
  deleteButton: {
    marginRight: appWidth * 0.03,
    padding: appWidth * 0.01,
  },
  dialogContainer: {
    backgroundColor: '#192734',
    borderRadius: 25,
    height: appHeight * 0.32,
    width: appWidth * 0.75,
    alignSelf: 'center',
    alignItems: 'center',
  },
  dialogTitle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: appWidth * 0.04,
    fontWeight: 'bold',
  },
  dialogTextInput: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'lightgrey',
    color: 'white',
    width: appWidth * 0.5,
    padding: appHeight * 0.02,
  },
  confirmEditButtonDropShadow: {
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowColor: '#6887a3',
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
});
