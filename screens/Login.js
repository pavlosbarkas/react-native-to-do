import React, {Component} from 'react';
import {Button, Pressable, Text, TextInput, View} from 'react-native';
import {StyleSheet} from 'react-native';
import * as UserServices from '../services/UserServices';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your username"
          placeholderTextColor="white"
          defaultValue={this.state.username}
          onChangeText={inputUsername => {
            this.setState({username: inputUsername});
          }}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          placeholderTextColor="white"
          defaultValue={this.state.password}
          onChangeText={inputPassword => {
            this.setState({password: inputPassword});
          }}
        />
        <Pressable
          style={styles.loginButton}
          onPress={() => {
            if (
              UserServices.loginUser(this.state.username, this.state.password)
            ) {
              this.props.navigation.navigate('UserTasks', {
                userID: UserServices.getUserID(this.state.username),
              });
            } else {
              alert('Login Failed');
            }
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#192734',
    justifyContent: 'center',
  },
  label: {
    marginTop: 2,
    marginBottom: 10,
    marginHorizontal: 65,
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 10,
    padding: 20,
    fontSize: 14,
    marginBottom: 15,
    marginHorizontal: 50,
    color: 'white',
  },
  loginButton: {
    marginTop: 45,
    backgroundColor: '#324e68',
    alignSelf: 'center',
    borderRadius: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800',
    padding: 26,
  },
});
