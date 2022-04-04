import React, {Component} from 'react';
import {FlatList, Pressable, Text, TextInput, View} from 'react-native';
import {StyleSheet} from 'react-native';
import * as UserServices from '../services/UserServices';
import {FAB, Portal, Dialog} from 'react-native-paper';
import CustomTaskRow from '../components/CustomTaskRow';
import {appHeight, appWidth} from '../assets/ScreenDimensions';

class UserTasks extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    userTasks: [],
    createTaskDialogVisible: false,
    newTaskName: '',
  };

  componentDidMount() {
    this.setState({
      userTasks: UserServices.getUserTasks(this.props.route.params.userID),
    });
  }

  //helper functions to show or hide the dialog to create a task
  showCreateTaskDialog = () => this.setState({createTaskDialogVisible: true});
  hideCreateTaskDialog = () => this.setState({createTaskDialogVisible: false});

  addNewTask = () => {
    let newUserTasks = [...this.state.userTasks];
    newUserTasks.push({
      name: this.state.newTaskName,
      id: this.state.userTasks.length + 2,
    });
    this.setState({userTasks: newUserTasks});
  };

  deleteTask = id => {
    let userTasks = this.state.userTasks.filter(task => task.id !== id);
    this.setState({userTasks});
  };

  renameTask = task => {
    const userTasks = [...this.state.userTasks];
    let newTask = userTasks.find(item => item.id === task.id);
    newTask.name = task.name;
    this.setState({userTasks});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flatlistContainer}>
          <FlatList
            data={this.state.userTasks}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <CustomTaskRow
                  item={item}
                  deleteTask={this.deleteTask}
                  renameTask={this.renameTask}
                />
              );
            }}
          />
        </View>
        <View style={styles.fabContainer}>
          <FAB
            style={styles.floatingButton}
            icon="plus"
            onPress={this.showCreateTaskDialog}
          />
          {/*#region Create Task Dialog*/}
          <Portal>
            <Dialog
              style={styles.dialogContainer}
              visible={this.state.createTaskDialogVisible}
              onDismiss={this.hideCreateTaskDialog}>
              <Dialog.Title style={styles.dialogTitle}>
                Add a new task
              </Dialog.Title>
              <Dialog.Content>
                <TextInput
                  style={styles.dialogTextInput}
                  placeholder="Enter task name"
                  placeholderTextColor="white"
                  defaultValue=""
                  onChangeText={text => {
                    this.setState({newTaskName: text});
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Pressable
                  style={styles.dialogCreateTaskButton}
                  onPress={() => {
                    this.addNewTask();
                    this.hideCreateTaskDialog();
                  }}>
                  <Text style={styles.dialogButtonText}>Add</Text>
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

export default UserTasks;

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
  fabContainer: {
    height: appHeight * 0.1,
    justifyContent: 'center',
  },
  floatingButton: {
    alignSelf: 'center',
    backgroundColor: '#4b759c',
  },
  dialogContainer: {
    backgroundColor: '#192734',
    borderRadius: 25,
    height: appHeight * 0.32,
    width: appWidth * 0.7,
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
    marginHorizontal: appWidth * 0.05,
    padding: appHeight * 0.025,
  },
  dialogCreateTaskButton: {
    backgroundColor: '#324e68',
    borderRadius: 25,
  },
  dialogButtonText: {
    fontWeight: '800',
    color: 'white',
    fontSize: appWidth * 0.04,
    padding: appHeight * 0.018,
  },
});
