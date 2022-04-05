//#region imports
import React, {Component} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {StyleSheet} from 'react-native';
import * as UserServices from '../services/UserServices';
import {appWidth, appHeight} from '../assets/ScreenDimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropShadow from 'react-native-drop-shadow';
import {Modal, Portal} from 'react-native-paper';
//#endregion

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    username: '',
    password: '',
    isUsernameInserted: true,
    isPasswordInserted: true,
    isModalVisible: false,
  };

  //#region input validator
  checkUsername = value => {
    this.state.username === ''
      ? this.setState({isUsernameInserted: false})
      : this.setState({isUsernameInserted: true});
  };

  checkPassword = value => {
    this.state.password === ''
      ? this.setState({isPasswordInserted: false})
      : this.setState({isPasswordInserted: true});
  };
  //#endregion

  render() {
    return (
      <View style={styles.container}>
        {/*#region username label and textinput*/}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your username"
          placeholderTextColor="#e8eaeb"
          defaultValue={this.state.username}
          onChangeText={inputUsername => {
            this.setState({username: inputUsername});
          }}
          onEndEditing={e => this.checkUsername(e.nativeEvent)}
        />
        {this.state.isUsernameInserted ? null : (
          <Text style={styles.errorMessage}>Please insert your username!</Text>
        )}
        {/*#endregion*/}
        {/*#region password label and textinput*/}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your password"
          placeholderTextColor="#e8eaeb"
          defaultValue={this.state.password}
          onChangeText={inputPassword => {
            this.setState({password: inputPassword});
          }}
          onEndEditing={e => this.checkPassword(e.nativeEvent)}
        />
        {this.state.isPasswordInserted ? null : (
          <Text style={styles.errorMessage}>Please insert your password!</Text>
        )}
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
              if (
                UserServices.loginUser(this.state.username, this.state.password)
              ) {
                this.props.navigation.navigate('UserTasks', {
                  userID: UserServices.getUserID(this.state.username),
                });
              } else {
                this.setState({isModalVisible: true});
              }
            }}>
            <FontAwesome5 name="sign-in-alt" size={28} color="#e8eaeb" />
          </Pressable>
        </DropShadow>
        {/*#endregion*/}
        {/*#region Modal for login failure*/}
        <Portal>
          <Modal
            visible={this.state.isModalVisible}
            onDismiss={() => this.setState({isModalVisible: false})}
            contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalText}>
              Login failed! Please make sure you have inserted your username and
              password correctly!
            </Text>
            <Pressable
              style={({pressed}) => [
                styles.modalButton,
                {
                  borderColor: pressed ? '#7b96ae' : '#43698c',
                },
              ]}
              onPress={() => this.setState({isModalVisible: false})}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </Modal>
        </Portal>
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
    marginHorizontal: appWidth * 0.2,
    fontSize: appWidth * 0.035,
    color: '#e8eaeb',
  },
  loginButton: {
    alignSelf: 'center',
    marginTop: appHeight * 0.025,
    borderWidth: 3,
    borderRadius: 25,
    padding: appWidth * 0.021,
  },
  loginButtonDropShadow: {
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowColor: 'black',
  },
  errorMessage: {
    alignSelf: 'center',
    marginTop: appHeight * 0.005,
    marginBottom: appHeight * 0.01,
    marginHorizontal: appWidth * 0.2,
    fontWeight: '700',
    fontSize: appWidth * 0.03,
    color: '#e8eaeb',
  },
  modalContainer: {
    backgroundColor: '#192734',
    height: appHeight * 0.25,
    width: appWidth * 0.6,
    alignSelf: 'center',
    borderRadius: 25,
  },
  modalText: {
    color: '#e8eaeb',
    padding: appWidth * 0.04,
    marginTop: appWidth * 0.05,
    marginHorizontal: appWidth * 0.05,
    fontSize: appWidth * 0.035,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  modalButton: {
    borderWidth: 5,
    borderRadius: 30,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#e8eaeb',
    padding: appWidth * 0.03,
  },
});
//#endregion
