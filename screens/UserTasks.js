import React, {Component} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StyleSheet} from 'react-native';
import * as UserServices from '../services/UserServices';
import {FAB, Portal, Dialog} from 'react-native-paper';
import CustomTaskRow from '../components/CustomTaskRow';

class UserTasks extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    userTasks: [],
    userID: this.props.route.params.userID,
    createTaskDialogVisible: false,
    editTaskDialogVisible: false,
    currentTaskID: null,
  };

  componentDidMount() {
    this.setState({
      userTasks: UserServices.getUserTasks(this.state.userID),
    });
  }

  newTaskName = '';
  showCreateTaskDialog = () => this.setState({createTaskDialogVisible: true});
  hideCreateTaskDialog = () => this.setState({createTaskDialogVisible: false});
  addNewTask = () => {
    let newUserTasks = this.state.userTasks.slice();
    newUserTasks.push({name: this.newTaskName});
    this.setState({userTasks: newUserTasks});
  };

  showEditTaskDialog = id => {
    this.setState({currentTaskID: id});
    this.setState({editTaskDialogVisible: true});
  };
  hideEditTaskDialog = () => this.setState({editTaskDialogVisible: false});
  renameTask = () => {
    let tempTasks = this.state.userTasks;
    tempTasks.forEach(task => {
      if (task.id === this.state.currentTaskID) {
        task.name = this.newTaskName;
      }
    });
    this.setState({userTasks: tempTasks});
  };

  deleteTask = id => {
    let tempTasks = this.state.userTasks;
    tempTasks.forEach(task => {
      if (task.id === id) {
        tempTasks.splice(tempTasks.indexOf(task, 0), 1);
      }
    });
    this.setState({userTasks: tempTasks});
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.flatlistRow}>
        <Text style={styles.taskName}>{item.name}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.editTaskButton}
            onPress={() => {
              this.showEditTaskDialog(item.id);
            }}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <Portal>
            <Dialog
              visible={this.state.editTaskDialogVisible}
              onDismiss={this.hideEditTaskDialog}>
              <Dialog.Title>Edit task</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  style={styles.dialogTextInput}
                  placeholder="Enter new task name"
                  defaultValue=""
                  onChangeText={text => {
                    this.newTaskName = text;
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Pressable
                  style={styles.dialogCreateTaskButton}
                  onPress={() => {
                    this.renameTask();
                    this.hideEditTaskDialog();
                  }}>
                  <Text style={styles.dialogButtonText}>Confirm</Text>
                </Pressable>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <TouchableOpacity
            style={styles.editTaskButton}
            onPress={() => {
              this.deleteTask(item.id);
            }}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.showSubtasksButton}
            onPress={() => {
              this.props.navigation.navigate('Subtasks', {
                taskID: item.id,
              });
            }}>
            <Text style={styles.buttonText}>Subtasks</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flatlistContainer}>
          <FlatList
            data={this.state.userTasks}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
          />
        </View>
        <View style={styles.fabContainer}>
          <FAB
            style={styles.floatingButton}
            icon="plus"
            onPress={this.showCreateTaskDialog}
          />
          <Portal>
            <Dialog
              visible={this.state.createTaskDialogVisible}
              onDismiss={this.hideCreateTaskDialog}>
              <Dialog.Title>Create a new task</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  style={styles.dialogTextInput}
                  placeholder="Enter task name"
                  defaultValue=""
                  onChangeText={text => {
                    this.newTaskName = text;
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
                  <Text style={styles.dialogButtonText}>Create</Text>
                </Pressable>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
  },
  taskName: {
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
