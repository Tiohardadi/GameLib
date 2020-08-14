import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Image,ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isUserError: false,
            isPassError: false
        };
    }
    
    // Mount User Method
    Login() {
        if(this.state.userName.toLowerCase()!="tester"){
            this.setState({isPassError: false})
            this.setState({isUserError: true})
       
        }
        else if (this.state.password!=12345678){
            this.setState({isUserError: false})
            this.setState({isPassError: true})
        }
        else{
            this.setState({isUserError: false})
            this.setState({isPassError: false})
            this.props.navigation.push('Home', { nama : this.state.userName})
        }
        
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={require('./images/logo.png')} style={{width:'100%',height:100,marginTop: 60}}/>
                <Text style={{fontSize: 24, color: '#fff',fontWeight:'bold', marginTop: 60}}>Welcome Back !</Text>
                <View style={{marginTop: 60,width:'85%'}}>
                    <TextInput placeholder="Username" style={{ height: 45,width:'100%',paddingHorizontal: 15, borderBottomWidth:1,borderColor:'#003366',color:'#fff'}} onChangeText={userName => this.setState({ userName })}/>
                </View>
                <View style={{marginTop: 16, marginBottom:50,width:'85%'}}>
                    <TextInput placeholder="Password" style={{ height: 45,width:'100%',paddingHorizontal: 15, borderBottomWidth:1,borderColor:'#003366',color:'#fff' }} onChangeText={password => this.setState({ password })} secureTextEntry={true} />
                </View>
                <Text style={this.state.isUserError ? {color:'red'} : {height:0}}>Incorrect Username</Text>
                <Text style={this.state.isPassError ? {color:'red'} : {height:0}}>Incorrect Password</Text>
                <TouchableOpacity style={[{marginTop: 16,backgroundColor: '#fff'},styles.button]} onPress={() => this.Login()}>
                    <Text style={{color:'#f00'}}>SignIn</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 24, color: '#fff', marginVertical:16}}>Or</Text>
                <TouchableOpacity style={[{backgroundColor: '#003366'},styles.button]}  onPress={() => this.props.navigation.push('Register')}>
                    <Text style={{color:'white'}}>SignUp ?</Text>
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