import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Index from './src/Index'


export default function App() {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#141d26'}}>
      <Index></Index>
    </SafeAreaView>
  );
}

