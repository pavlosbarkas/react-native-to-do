//#region imports
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {appHeight, appWidth} from '../assets/ScreenDimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropShadow from 'react-native-drop-shadow';
//#endregion

const CustomSubtaskRow = ({item, renameSubTask, deleteSubTask}) => {
  let [dialogVisible, setDialogVisible] = useState(false);
  let [subTaskName, setSubTaskName] = useState(item.name);

  return (
    <View style={styles.flatlistRow}>
      <Text style={styles.taskName}>{item.name}</Text>
      <View style={styles.buttonsContainer}>
        {/*#region Edit Button*/}
        <Pressable
          style={({pressed}) => [
            styles.editButton,
            {
              borderColor: pressed ? '#7b96ae' : '#43698c',
            },
          ]}
          onPress={() => {
            setDialogVisible(true);
          }}>
          <MaterialIcons name="edit" size={22} color="#e8eaeb" />
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
                placeholderTextColor="#e8eaeb"
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
                  style={({pressed}) => [
                    styles.dialogButton,
                    {
                      borderColor: pressed ? '#7b96ae' : '#43698c',
                    },
                  ]}
                  onPress={() => {
                    renameSubTask({id: item.id, name: subTaskName});
                    setDialogVisible(false);
                  }}>
                  <FontAwesome5 name="check" size={20} color="#e8eaeb" />
                </Pressable>
              </DropShadow>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {/*#endregion*/}
        {/*#region Delete Button*/}
        <Pressable
          style={({pressed}) => [
            styles.deleteButton,
            {
              borderColor: pressed ? '#7b96ae' : '#43698c',
            },
          ]}
          onPress={() => {
            deleteSubTask(item.id);
          }}>
          <MaterialIcons name="delete" size={22} color="#e8eaeb" />
        </Pressable>
        {/*#endregion*/}
      </View>
    </View>
  );
};

export default CustomSubtaskRow;

//#region styles
const styles = StyleSheet.create({
  flatlistRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8eaeb',
    borderBottomRightRadius: appWidth * 0.05,
    borderBottomLeftRadius: appWidth * 0.05,
    height: appHeight * 0.13,
  },
  taskName: {
    width: appWidth * 0.6,
    fontSize: appWidth * 0.052,
    lineHeight: appHeight * 0.07,
    padding: appHeight * 0.028,
    color: '#e8eaeb',
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
    marginRight: appWidth * 0.02,
    padding: appWidth * 0.015,
    borderWidth: 3,
    borderRadius: 10,
  },
  deleteButton: {
    marginRight: appWidth * 0.05,
    padding: appWidth * 0.015,
    borderWidth: 3,
    borderRadius: 10,
  },
  dialogContainer: {
    backgroundColor: '#192734',
    borderRadius: 25,
    height: appHeight * 0.33,
    width: appWidth * 0.75,
    alignSelf: 'center',
    alignItems: 'center',
  },
  dialogTitle: {
    color: '#e8eaeb',
    alignSelf: 'center',
    fontSize: appWidth * 0.04,
    fontWeight: 'bold',
  },
  dialogTextInput: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'lightgrey',
    color: '#e8eaeb',
    width: appWidth * 0.5,
    padding: appHeight * 0.02,
  },
  confirmEditButtonDropShadow: {
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowColor: '#6887a3',
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  dialogButton: {
    borderRadius: 30,
    borderWidth: 3,
    padding: appWidth * 0.02,
  },
});
//#endregion
