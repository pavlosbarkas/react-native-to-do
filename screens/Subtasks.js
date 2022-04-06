//#region imports
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
import {connect} from 'react-redux';
import {setLoading, setSubtasks, setTasks} from '../redux/actions/actions';
import Loader from '../components/Loader';
//#endregion

class SubTasks extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    createTaskDialogVisible: false,
    newSubtaskName: '',
  };

  componentDidMount() {
    this.props.setLoading(true);
    setTimeout(() => {
      this.props.setSubtasks(
        UserServices.getSubtasks(this.props.route.params.taskID),
      );
      this.props.setLoading(false);
    }, 2000);
  }

  //#region helper functions to show or hide the dialog to create a task
  showCreateTaskDialog = () => this.setState({createTaskDialogVisible: true});
  hideCreateTaskDialog = () => this.setState({createTaskDialogVisible: false});
  //#endregion

  //#region add, delete and rename subtask functions triggered on buttons press
  addNewSubtask = () => {
    let newSubtasks = [...this.props.actions.subtasks];
    newSubtasks.push({
      name: this.state.newSubtaskName,
      id: newSubtasks.length + 3,
    });
    this.props.setSubtasks(newSubtasks);
  };

  deleteSubTask = id => {
    let subtasks = this.props.actions.subtasks.filter(task => task.id !== id);
    this.props.setSubtasks(subtasks);
  };

  renameSubTask = task => {
    const subtasks = [...this.props.actions.subtasks];
    let newTask = subtasks.find(item => item.id === task.id);
    newTask.name = task.name;
    this.props.setSubtasks(subtasks);
  };
  //#endregion

  render() {
    return (
      <View style={styles.container}>
        <Loader width="1" height="1" />
        {/*#region flatlist container*/}
        <View style={styles.flatlistContainer}>
          <FlatList
            data={this.props.actions.subtasks}
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
        {/*endregion*/}
        {/*#region add subtask button container*/}
        <View style={styles.addTaskButtonContainer}>
          <DropShadow style={styles.addTaskButtonDropShadow}>
            <Pressable
              style={({pressed}) => [
                styles.addTaskButton,
                {
                  borderColor: pressed ? '#7b96ae' : '#43698c',
                },
              ]}
              onPress={this.showCreateTaskDialog}>
              <MaterialCommunityIcons name="plus" size={30} color="#e8eaeb" />
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
                  placeholderTextColor="#e8eaeb"
                  defaultValue=""
                  onChangeText={text => {
                    this.setState({newSubtaskName: text});
                  }}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Pressable
                  style={({pressed}) => [
                    styles.dialogButton,
                    {
                      borderColor: pressed ? '#7b96ae' : '#43698c',
                    },
                  ]}
                  onPress={() => {
                    this.addNewSubtask();
                    this.hideCreateTaskDialog();
                  }}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={30}
                    color="#e8eaeb"
                  />
                </Pressable>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {/*#endregion*/}
        </View>
        {/*#endregion*/}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    //actionsReducer in store.js
    actions: state.actions,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSubtasks: value => dispatch(setSubtasks(value)),
    setLoading: value => dispatch(setLoading(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubTasks);

//#region styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#192734',
  },
  flatlistContainer: {
    height: appHeight * 0.9,
    borderTopWidth: appHeight * 0.003,
    borderTopColor: '#43698c',
    borderBottomWidth: appHeight * 0.003,
    borderBottomColor: '#43698c',
    paddingBottom: appHeight * 0.005,
  },
  addTaskButtonContainer: {
    height: appHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskButton: {
    padding: appWidth * 0.018,
    borderRadius: 35,
    borderWidth: 3,
  },
  addTaskButtonDropShadow: {
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: 'black',
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
    padding: appWidth * 0.01,
  },
  dialogTextInput: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'lightgrey',
    color: '#e8eaeb',
    width: appWidth * 0.5,
    padding: appHeight * 0.02,
  },
  dialogButton: {
    borderRadius: 30,
    borderWidth: 4,
    padding: appWidth * 0.01,
  },
});
//#endregion
