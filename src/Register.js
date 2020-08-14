import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Image,ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require('./images/logo.png')} style={{width:'100%',height:100,marginTop: 60}}/>
                <Text style={{fontSize: 24, color: '#fff',fontWeight:'bold', marginTop: 60}}>Welcome!</Text>
                <View style={{marginTop: 60,width:'85%'}}>
                    <TextInput placeholder="Username" style={{ height: 45,width:'100%',paddingHorizontal: 15, borderBottomWidth:1,borderColor:'#003366',color:'#fff'}}/>
                </View>
                <View style={{marginTop: 15, width:'85%'}}>
                    <TextInput placeholder="Password" style={{ height: 45,width:'100%',paddingHorizontal: 15, borderBottomWidth:1,borderColor:'#003366',color:'#fff' }} secureTextEntry={true} />
                </View>
                <View style={{marginTop: 15, marginBottom:50,width:'85%'}}>
                    <TextInput placeholder="Ulangi Password" style={{ height: 45,width:'100%',paddingHorizontal: 15, borderBottomWidth:1,borderColor:'#003366',color:'#fff' }} secureTextEntry={true} />
                </View>
                <TouchableOpacity style={[{backgroundColor: '#003366'},styles.button]}  onPress={() => this.props.navigation.push('Home')}>
                    <Text style={{color:'white'}}>Daftar</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 24, color: '#fff', marginVertical:16}}>atau</Text>
                <TouchableOpacity style={[{backgroundColor: '#fff'},styles.button]} onPress={() => this.props.navigation.push('Login')}>
                    <Text style={{color:'#f00'}}>Masuk ?</Text>
                </TouchableOpacity>
       
            </ScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
        alignItems:'center',
        backgroundColor:'#141d26'
    },
    button: {
      borderRadius: 16,
      width: '50%',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      
    }
 
});