import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import UserTasks from './screens/UserTasks';
import {Provider as PaperProvider} from 'react-native-paper';
import SubTasks from './screens/Subtasks';
import {Provider as StoreProvider} from 'react-redux';
import configureStore from './redux/store';

const store = configureStore();

const Stack = createStackNavigator();

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="UserTasks" component={UserTasks} />
            <Stack.Screen name="Subtasks" component={SubTasks} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
