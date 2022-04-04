import React, {Component} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as UserServices from '../services/UserServices';
import {FAB, Portal, Dialog} from 'react-native-paper';
import CustomSubtaskRow from '../components/CustomSubtaskRow';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropShadow from 'react-native-drop-shadow';
import {appHeight, appWidth} from '../assets/ScreenDimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class SubTasks extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    subtasks: [],
    createTaskDialogVisible: false,
    editTaskDialogVisible: false,
    currentTaskID: null,
    newSubtaskName: '',
  };

  // //handler for flatlist child component
  // setSubtasksState = value => {
  //   this.setState({subtasks: value});
  // };
  // setEditTaskDialogVisible = value => {
  //   this.setState({editTaskDialogVisible: value});
  // };
  // setCurrentTaskIDState = value => {
  //   this.setState({currentTaskID: value});
  // };
  // //handler for flatlist child component

  componentDidMount() {
    this.setState({
      subtasks: UserServices.getSubtasks(this.props.route.params.taskID),
    });
  }

  //helper functions to show or hide the dialog to create a task
  showCreateTaskDialog = () => this.setState({createTaskDialogVisible: true});
  hideCreateTaskDialog = () => this.setState({createTaskDialogVisible: false});

  addNewSubtask = () => {
    let newSubtasks = [...this.state.subtasks];
    newSubtasks.push({
      name: this.state.newSubtaskName,
      id: newSubtasks.length + 2,
    });
    this.setState({subtasks: newSubtasks});
  };

  deleteSubTask = id => {
    let subtasks = this.state.subtasks.filter(task => task.id !== id);
    this.setState({subtasks});
  };

  renameSubTask = task => {
    const subtasks = [...this.state.subtasks];
    let newTask = subtasks.find(item => item.id === task.id);
    newTask.name = task.name;
    this.setState({subtasks});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flatlistContainer}>
          <FlatList
            data={this.state.subtasks}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <CustomSubtaskRow
                  item={item}
                  deleteSubTask={this.deleteSubTask}
                  renameSubTask={this.renameSubTask}
                />
              );
            }}
          />
        </View>
        <View style={styles.addTaskButtonContainer}>
          <DropShadow style={styles.addTaskButtonDropShadow}>
            <Pressable
              style={({pressed}) => [
                styles.addTaskButton,
                {
                  backgroundColor: pressed ? '#7b96ae' : '#43698c',
                },
              ]}
              onPress={this.showCreateTaskDialog}>
              <MaterialCommunityIcons
                name="plus-thick"
                size={30}
                color="white"
              />
            </Pressable>
          </DropShadow>
          {/*#region Create SubTask Dialog*/}
          <Portal>
            <Dialog
              style={styles.dialogContainer}
              visible={this.state.createTaskDialogVisible}
              onDismiss={this.hideCreateTaskDialog}>
              <Dialog.Title style={styles.dialogTitle}>
                Add a new subtask
              </Dialog.Title>
              <Dialog.Content>
                <TextInput
                  style={styles.dialogTextInput}
                  placeholder="Enter subtask name"
                  placeholderTextColor="white"
                  defaultValue=""
                  onChangeText={text => {
                    this.setState({newSubtaskName: text});
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Pressable
                  onPress={() => {
                    this.addNewSubtask();
                    this.hideCreateTaskDialog();
                  }}>
                  <MaterialIcons name="add-circle" size={45} color="white" />
                </Pressable>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/*#endregion*/}
        </View>
      </View>
    );
  }
}

export default SubTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#192734',
  },
  flatlistContainer: {
    height: appHeight * 0.9,
    borderTopWidth: appHeight * 0.006,
    borderTopColor: '#324e68',
    borderBottomWidth: appHeight * 0.006,
    borderBottomColor: '#324e68',
  },
  addTaskButtonContainer: {
    height: appHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskButton: {
    padding: appWidth * 0.02,
    borderRadius: 35,
  },
  addTaskButtonDropShadow: {
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: 'black',
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
    padding: appWidth * 0.01,
  },
  dialogTextInput: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'lightgrey',
    color: 'white',
    width: appWidth * 0.5,
    padding: appHeight * 0.01,
  },
});
