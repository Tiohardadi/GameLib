import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import AboutMe from './AboutMe';
import GameDetail from './GameDetail';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers/reducer'




const Stack = createStackNavigator();
const store = createStore(reducer);


export default function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="AboutMe" component={AboutMe}/>
                <Stack.Screen name="GameDetail" component={GameDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({

});
