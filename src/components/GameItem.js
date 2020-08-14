import { StatusBar } from 'expo-status-bar';
import React,{PureComponent} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const DEVICE = Dimensions.get('window')

export default class GameItem extends PureComponent {
    render() {
        let game = this.props.game;
       
        return (
                <View style={styles.container}> 
                    <Image source={{uri: game.image.medium_url}} style={{height: DEVICE.width * 0.20, width: DEVICE.width * 0.20,borderRadius:10}}/>
                    <View>
                        <Text numberOfLines={2} style={styles.gameTitle}>{game.name}</Text>
                        <Text numberOfLines={2} style={styles.gameplatforms}>
                            {this.getplatforms(game.platforms)}
                        </Text>
                    </View>
                </View>
        )
    }
    getplatforms(data){
        if(data!=null){
            let result=`Platforms: ${data[0].name}`
            for (let i = 1; i < data.length; i++) {
                result+=`, ${data[i].name}`
            }
            return result
        }
        return ""
    }
}


const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        alignItems:"center",
        width: DEVICE.width * 0.25,
        margin:10,
        flexDirection:'row'
    },
    gameTitle: {
        fontSize: 15,
        width: DEVICE.width * 0.6,
        marginLeft:10,
        color: '#fff'
    },
    gameplatforms: {
        fontSize: 12,
        width: DEVICE.width * 0.6,
        marginLeft:10,
        color: '#708090'
    }

});