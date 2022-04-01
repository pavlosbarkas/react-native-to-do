import React, {Component} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as UserServices from '../services/UserServices';
import {FAB, Portal, Dialog} from 'react-native-paper';

class SubTasks extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    subtasks: [],
    selectedTaskID: this.props.route.params.taskID,
    createTaskDialogVisible: false,
    editTaskDialogVisible: false,
    currentTaskID: null,
  };

  componentDidMount() {
    this.setState({
      subtasks: UserServices.getSubtasks(this.state.selectedTaskID),
    });
  }

  newSubtaskName = '';
  showCreateTaskDialog = () => this.setState({createTaskDialogVisible: true});
  hideCreateTaskDialog = () => this.setState({createTaskDialogVisible: false});
  addNewSubtask = () => {
    let newSubtasks = this.state.subtasks.slice();
    newSubtasks.push({name: this.newSubtaskName});
    this.setState({subtasks: newSubtasks});
  };

  showEditTaskDialog = id => {
    this.setState({currentTaskID: id});
    this.setState({editTaskDialogVisible: true});
  };
  hideEditTaskDialog = () => this.setState({editTaskDialogVisible: false});
  renameTask = () => {
    let tempTasks = this.state.subtasks;
    tempTasks.forEach(task => {
      if (task.id === this.state.currentTaskID) {
        task.name = this.newSubtaskName;
      }
    });
    this.setState({subtasks: tempTasks});
  };

  deleteTask = id => {
    let tempTasks = this.state.subtasks;
    tempTasks.forEach(task => {
      if (task.id === id) {
        tempTasks.splice(tempTasks.indexOf(task, 0), 1);
      }
    });
    this.setState({subtasks: tempTasks});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flatlistContainer}>
          <FlatList
            data={this.state.subtasks}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
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
                            this.newSubtaskName = text;
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
                </View>
              </View>
            )}
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
              <Dialog.Title>Create a new subtask</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  style={styles.dialogTextInput}
                  placeholder="Enter subtask name"
                  defaultValue=""
                  onChangeText={text => {
                    this.newSubtaskName = text;
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Pressable
                  style={styles.dialogCreateTaskButton}
                  onPress={() => {
                    this.addNewSubtask();
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

export default SubTasks;

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
