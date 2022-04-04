import React, {Component} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {StyleSheet} from 'react-native';
import * as UserServices from '../services/UserServices';
import {appWidth, appHeight} from '../assets/ScreenDimensions';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: '',
    password: '',
  };

  validateInputFields = () => {
    if (this.state.username === '') {
      alert('Please enter your username');
      return false;
    } else if (this.state.password === '') {
      alert('Please enter your password');
      return false;
    }
    return true;
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
            if (this.validateInputFields()) {
              if (
                UserServices.loginUser(this.state.username, this.state.password)
              ) {
                this.props.navigation.navigate('UserTasks', {
                  userID: UserServices.getUserID(this.state.username),
                });
              } else {
                alert('Login Failed');
              }
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
    marginBottom: appHeight * 0.02,
    marginTop: appHeight * 0.015,
    marginHorizontal: appWidth * 0.2,
    fontWeight: '700',
    fontSize: appWidth * 0.045,
    color: 'white',
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 25,
    padding: appHeight * 0.025,
    marginBottom: appHeight * 0.04,
    marginHorizontal: appWidth * 0.2,
    fontSize: appWidth * 0.035,
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#324e68',
    alignSelf: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: appWidth * 0.045,
    padding: appHeight * 0.02,
  },
});
