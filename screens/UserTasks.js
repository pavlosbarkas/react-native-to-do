import React, {Component} from 'react';
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import * as UserServices from '../services/UserServices';

class UserTasks extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    userTasks: [],
    userID: this.props.route.params.userID,
  };

  componentDidMount() {
    this.setState({
      userTasks: UserServices.getUserTasks(this.state.userID),
    });
  }

  renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          this.props.navigation.navigate('Subtasks', {
            taskID: item.id,
          });
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.userTasks}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const Item = ({item, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Text style={styles.taskName}>{item.name}</Text>
  </TouchableOpacity>
);

export default UserTasks;

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
