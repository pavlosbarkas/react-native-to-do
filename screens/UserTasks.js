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
    userID: this.props.route.params.userID, //STO DIDMOUNT
    createTaskDialogVisible: false,
    editTaskDialogVisible: false,
    currentTaskID: null,
    newTaskName: '',
  };
  componentDidMount() {
    this.setState({
      userTasks: UserServices.getUserTasks(this.state.userID),
    });
  }

  showCreateTaskDialog = () => this.setState({createTaskDialogVisible: true});
  hideCreateTaskDialog = () => this.setState({createTaskDialogVisible: false});
  addNewTask = () => {
    let newUserTasks = [...this.state.userTasks];
    newUserTasks.push({
      name: this.state.newTaskName,
      id: this.state.userTasks.length + 3,
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

  renderItem = ({item}) => {
    return (
      <CustomTaskRow
        item={item}
        deleteTask={this.deleteTask}
        renameTask={this.renameTask}
      />
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
