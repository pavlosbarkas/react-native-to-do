//#region imports
import React, {Component} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {StyleSheet} from 'react-native';
import * as UserServices from '../services/UserServices';
import {appWidth, appHeight} from '../assets/ScreenDimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropShadow from 'react-native-drop-shadow';
//#endregion

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: '',
    password: '',
  };

  //#region input validator
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
  //#endregion

  render() {
    return (
      <View style={styles.container}>
        {/*#region username label and textinput*/}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your username"
          placeholderTextColor="#e8eaeb"
          defaultValue={this.state.username}
          onChangeText={inputUsername => {
            this.setState({username: inputUsername});
          }}
        />
        {/*#endregion*/}
        {/*#region password label and textinput*/}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your password"
          placeholderTextColor="#e8eaeb"
          defaultValue={this.state.password}
          onChangeText={inputPassword => {
            this.setState({password: inputPassword});
          }}
        />
        {/*#endregion*/}
        {/*#region login button*/}
        <DropShadow style={styles.loginButtonDropShadow}>
          <Pressable
            style={({pressed}) => [
              styles.loginButton,
              {
                borderColor: pressed ? '#43698c' : 'lightgrey',
              },
            ]}
            onPress={() => {
              if (this.validateInputFields()) {
                if (
                  UserServices.loginUser(
                    this.state.username,
                    this.state.password,
                  )
                ) {
                  this.props.navigation.navigate('UserTasks', {
                    userID: UserServices.getUserID(this.state.username),
                  });
                } else {
                  alert('Login Failed');
                }
              }
            }}>
            <FontAwesome5 name="sign-in-alt" size={28} color="#e8eaeb" />
          </Pressable>
        </DropShadow>
        {/*#endregion*/}
      </View>
    );
  }
}

export default Login;

//#region styles
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
    color: '#e8eaeb',
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    borderRadius: 25,
    padding: appHeight * 0.025,
    marginBottom: appHeight * 0.04,
    marginHorizontal: appWidth * 0.2,
    fontSize: appWidth * 0.035,
    color: '#e8eaeb',
  },
  loginButton: {
    alignSelf: 'center',
    borderWidth: 3,
    borderRadius: 25,
    padding: appWidth * 0.021,
  },
  loginButtonDropShadow: {
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'black',
  },
});
//#endregion
