import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,TextInput,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SliderBox } from "react-native-image-slider-box";
import Axios from 'axios';
export default class GameDetail extends Component{
    constructor(props) {
      super(props);
      this.state = {
          dataGame: [],
          isLoading: true,
          isError: false,
      };
    }
    // Mount User Method
    componentDidMount() {
      this.getApi()
    }
    //   Get Api Users
    getApi = async () => {
        try {
            const game = await Axios.get(`https://www.giantbomb.com/api/game/${this.props.route.params.id}/?api_key=d04fd819f4d8865c0e97cec9b14789e5f917746b&format=json`)
            this.setState({ isError: false, isLoading: false, dataGame: game.data.results})

        } 
        catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }
    getImages(data){
      let result =[]
      for (let i = 0; i < data.images.length; i++) {
        result.push(data.images[i].screen_url)
      }
      return result
    }

    getarrdat(data,name){
      if(data!=null){
          let result=`${data[0].name}`
          for (let i = 1; i < data.length; i++) {
              result+=`, ${data[i].name}`
          }
          return <Text><Text style={{fontWeight: 'bold'}}>{name} : </Text>{result}</Text>
      }
      return ""
  }
  render(){
    //  If load data
    if (this.state.isLoading) {
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor:'#141d26'}}
        >
          <ActivityIndicator size='large' color='red' />
        </View>
      )
    }
    // If data not fetch
    else if (this.state.isError) {
      return (
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor:'#141d26' }}
        >
          <Text style={{color:'#fff'}}>Terjadi Error Saat Memuat Data</Text>
        </View>
      )
    }
    // If data finish load
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row',marginBottom:20}}>
          <TouchableOpacity style={{width:'10%'}} onPress={() => this.props.navigation.goBack()}>
            <Icon style={{marginLeft:15,marginTop:15,color: 'white'}} name="md-arrow-back" size={25}/>
          </TouchableOpacity>
          <Text style={{fontSize:25,color:'white',marginTop:10,width:'80%',textAlign:'center'}} >Game Detail</Text>
        </View>
        <View style={{ flexDirection:"row",padding:20}}>
            <Image source={{uri: this.state.dataGame.image.medium_url}} style={styles.img}  />
            <Text style={{color:'#fff' ,fontSize: 20, width:'70%', paddingHorizontal:10,textAlignVertical: 'center'}}>{this.state.dataGame.name}</Text>
        </View >
        <Text style={{color:'#fff' ,fontSize: 14,paddingHorizontal:20,paddingVertical:10}}>{this.state.dataGame.deck}</Text>
        <SliderBox 
          images={this.getImages(this.state.dataGame)}
          autoplay
          circleLoop
          ImageComponentStyle={{borderRadius: 15, width: '90%', marginVertical: 20}}
          paginationBoxStyle={{opacity: 0}}
          />
          <Text style={{color:'#fff' ,fontSize: 14,paddingHorizontal:20,paddingVertical:5}}>{this.getarrdat(this.state.dataGame.developers,"Developers")}</Text>
          <Text style={{color:'#fff' ,fontSize: 14,paddingHorizontal:20,paddingVertical:5}}>{this.getarrdat(this.state.dataGame.franchises,"Franchises")}</Text>
          <Text style={{color:'#fff' ,fontSize: 14,paddingHorizontal:20,paddingVertical:5}}>{this.getarrdat(this.state.dataGame.genres,"Genres")}</Text>
          <Text style={{color:'#fff' ,fontSize: 14,paddingHorizontal:20,paddingVertical:5}}>{this.getarrdat(this.state.dataGame.platforms,"Flatforms")}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141d26',
    
  },
  img :{
    width:100,
    height:100,
    borderRadius:20,
    marginVertical:20

  },
});



