import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,ActivityIndicator,ScrollView, BackHandler,Alert,Animated,Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewGameItem from './components/NewGameItem';
import GameItem from './components/GameItem';
import VideoItem from './components/VideoItem';
import Axios from 'axios';
import {connect} from 'react-redux';
import {
    fetchApiGames,
    addApiGames,
    fetchApiNewGames,
    fetchApiVideos,
} from './actions'



class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            offset:0,
            loadDataGame:false,
            isLoading: true,
            isError: false,
            animatedValue: new Animated.Value(0)
        };
    }
    handleScroll(event){
        if(event.nativeEvent.contentOffset.y>300){
            Animated.timing(this.state.animatedValue, {
                toValue: 1,
                duration: 600,
                useNativeDriver:true
              }).start();
        }
        else{
            Animated.timing(this.state.animatedValue, {
                toValue: 0,
                duration: 600,
                useNativeDriver:true
            }).start();
         }
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        this.getApi()
        
    }
    handleBackButton = () => {
        const {index, routes} = this.props.navigation.dangerouslyGetState();
        const currentRoute = routes[index].name;
        if ( currentRoute == 'Home') {
            Alert.alert(
                'Exit App',
                'Exiting the application?', [{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => BackHandler.exitApp()
                }, ], {
                    cancelable: false
                }
             )
            return true;
        }
    };
    getApi = async () => {
        try {
            const newgames = await Axios.get(`https://www.giantbomb.com/api/games/?api_key=d04fd819f4d8865c0e97cec9b14789e5f917746b&format=json&sort=date_added:desc&limit=10`)
            const games = await Axios.get(`https://www.giantbomb.com/api/games/?api_key=d04fd819f4d8865c0e97cec9b14789e5f917746b&format=json&sort=name:asc&limit=20&offset=${this.state.offset}`)
            const videos = await Axios.get(`https://www.giantbomb.com/api/videos/?api_key=d04fd819f4d8865c0e97cec9b14789e5f917746b&format=json`)
            this.setState({ isError: false, isLoading: false,offset: this.state.offset+100})
            this.props.fetchApiGames(games.data.results)
            this.props.fetchApiNewGames(newgames.data.results)
            this.props.fetchApiVideos(videos.data.results)
        } 
        catch (error) {
            this.setState({ isLoading: false, isError: true })
        }
    }
    loadGameList = async () => {
        try {
            this.setState({loadDataGame:true})
            const games = await Axios.get(`https://www.giantbomb.com/api/games/?api_key=d04fd819f4d8865c0e97cec9b14789e5f917746b&format=json&sort=name:asc&limit=20&offset=${this.state.offset}`)
            this.setState({loadDataGame:false,offset: this.state.offset+20})
            this.props.addApiGames(games.data.results)

        } 
        catch (error) {
            alert('gagal')
        }
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
            <>
        <ScrollView contentContainerStyle={styles.container} ref='_scrollView' onScroll={this.handleScroll.bind(this)}>
            <View style={styles.navBar}>
                <Image source={require('./images/logo.png')} style={{width:100,height:20}}/>
                <View style={styles.rightNav}>
                    <TouchableOpacity onPress={() => this.props.navigation.push('AboutMe')}>
                    <Icon style={styles.navIcon} name="account-circle" color="#fff" size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                <View style={{paddingLeft:20,paddingVertical:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Latest Videos</Text>
                    <FlatList
                    data={this.props.dataVideos}
                    renderItem={videos=><VideoItem video={videos.item}/>}
                    keyExtractor={videos=>videos.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    /> 
                </View>
                <View style={{paddingLeft:20,paddingVertical:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Recently Added</Text>
                    <FlatList
                    data={this.props.dataNewGames}
                    renderItem={games=>
                    <TouchableOpacity onPress={() =>this.props.navigation.push('GameDetail',{id:games.item.guid})} >
                        <NewGameItem game={games.item}/>
                    </TouchableOpacity>
                    }
                    keyExtractor={games=>games.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                   
                    /> 
                </View>

                <View style={{paddingLeft:20,paddingVertical:10}}>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>All Games</Text>
                    <FlatList
                    data={this.props.dataGames}
                    renderItem={games=>
                    <TouchableOpacity onPress={() =>this.props.navigation.push('GameDetail',{id:games.item.guid})} >
                        <GameItem game={games.item}/>
                    </TouchableOpacity>
                    }
                    keyExtractor={(item,index)=>index.toString()}
                    contentContainerStyle={{flex: 1}}
                    onEndReached={()=>this.loadGameList()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={this.state.loadDataGame ? (
                        <ActivityIndicator size='large' color="red" style={{ margin: 15 }} />
                      ) : null}
                      
                    /> 
                </View>                
            </View>
        </ScrollView>
        
            <Animated.View style={[styles.fab,{ 
                transform: [{
                    translateY: this.state.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0]
                    })
                }]}
            ]}>
                <TouchableOpacity onPress={() => { this.refs._scrollView.scrollTo({x:0,y:0,animated:true}); }}>
                    <Text style={{color:'#141d26'}}>UP</Text>
                </TouchableOpacity>
            </Animated.View>
      
        </>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#141d26'
  },
  navBar: {
    height: 55,
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#141d26'
  },
  rightNav: {
    flexDirection: 'row'
  },
  navIcon: {
    marginLeft: 25
  },
  body: {
    flex: 1
  },
  fab: {
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    width:50,
    position: 'absolute',                                                                                             
    right: 10,
    height:50,
    backgroundColor:'#fff',
    borderRadius:100,
    bottom:10
  }
});

function mapStateToProps(state){
    return{
        dataNewGames : state.dataNewGames,
        dataGames : state.dataGames,
        dataVideos : state.dataVideos,
    }
    
}

export default connect(mapStateToProps,{
    fetchApiGames,
    addApiGames,
    fetchApiNewGames,
    fetchApiVideos,
})(Home);