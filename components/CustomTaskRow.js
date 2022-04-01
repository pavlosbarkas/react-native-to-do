import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

const CustomTaskRow = item => {
  return (
    <View>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );
};

export default CustomTaskRow;

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
