import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import * as UserServices from '../services/UserServices';

class SubTasks extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    subtasks: [],
    selectedTaskID: this.props.route.params.taskID,
  };

  componentDidMount() {
    this.setState({
      subtasks: UserServices.getSubtasks(this.state.selectedTaskID),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.subtasks}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.taskName}>{item.name}</Text>
            </View>
          )}
        />
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
  row: {
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
});
