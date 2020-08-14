import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class AboutMe extends Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{width:'10%'}} onPress={() => this.props.navigation.goBack()}>
            <Icon style={{marginLeft:15,marginTop:15,color: 'white'}} name="md-arrow-back" size={25}/>
          </TouchableOpacity>
          <Text style={{fontSize:25,color:'white',marginTop:10,width:'80%',textAlign:'center'}} >About Me</Text>
        </View>
        <View style={styles.box}>
          <View style={{marginBottom:40, flexDirection:"row"}}>
            <Image source={require('./images/me.png')} style={styles.img}  />
            <Text style={{color:'#fff' ,fontSize: 30, width:'50%', paddingHorizontal:10,textAlignVertical: 'center'}}>Tio Hardadi Somantri</Text>
          </View >
          <View style={styles.sosmed}>
            <Icon style={{color:'#fff', marginRight:10, textAlignVertical: 'center'}} name="logo-facebook" size={35}/>
            <Text style={{color:'#fff' , height: 40,width:'85%', textAlignVertical: 'center'}}>facebook.com/tio.hardadi</Text>
          </View>
          <View style={styles.sosmed}>
            <Icon style={{color:'#fff', marginRight:10, textAlignVertical: 'center'}} name="logo-instagram" size={35}/>
            <Text style={{color:'#fff' , height: 40,width:'85%', textAlignVertical: 'center'}}>instagram.com/tiohardadi</Text>
          </View>
          <View style={styles.sosmed}>
            <Icon style={{color:'#fff', marginRight:10, textAlignVertical: 'center'}} name="logo-twitter" size={35}/>
            <Text style={{color:'#fff' , height: 40,width:'85%', textAlignVertical: 'center'}}>twitter.com/t10hs</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141d26',
    
  },
  box :{
    backgroundColor: '#141d26',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop:120

  },
  img :{
    width:100,
    height:100,
    borderRadius:20,
    marginVertical:20

  },
  sosmed: {
    width:'80%',
    flexDirection: 'row',
    marginBottom:20,
    paddingHorizontal: '10%'
  }
});
