import React,{PureComponent} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
const DEVICE = Dimensions.get('window')

export default class GameItem extends PureComponent {
    render() {
        let game = this.props.game;
        return (
            <View style={styles.container}> 
                <Image source={{uri: game.image.medium_url}} style={{height: DEVICE.width * 0.25, width: DEVICE.width * 0.25,borderRadius:10}}/>
                <Text numberOfLines={2} style={styles.gameTitle}>{game.name}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        alignItems:"center",
        width: DEVICE.width * 0.25,
        margin:10
    },
    gameTitle: {
        fontSize: 15,
        width: DEVICE.width * 0.30,
        textAlign:"center",
        padding:10,
        color: '#fff'
    }

});