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
        <View style={styles.fabContainer}>
          <FAB
            style={styles.floatingButton}
            icon="plus"
            onPress={this.showCreateTaskDialog}
          />
          {/*#region Create SubTask Dialog*/}
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
                    this.setState({newSubtaskName: text});
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
