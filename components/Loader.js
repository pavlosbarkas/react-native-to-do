import React, {Component} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {connect} from 'react-redux';
import {appHeight, appWidth} from '../assets/ScreenDimensions';

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.actions.loading) {
      return null;
    }

    return (
      <View
        style={{
          width: appWidth * this.props.width,
          height: appHeight * this.props.height,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: '#192734',
          borderRadius: 20,
        }}>
        <ActivityIndicator size="large" color="#43698c" />
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

export default connect(mapStateToProps)(Loader);
