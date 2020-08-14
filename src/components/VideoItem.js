;import React,{PureComponent} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Video from 'react-native-youtube-iframe';

const DEVICE = Dimensions.get('window')

export default class VideoItem extends PureComponent {
    render() {
        let video = this.props.video;
        return (
            <View style={styles.container}> 
                <Video 
                 videoId={video.youtube_id}
                 height={DEVICE.width * 0.5}
                 width={DEVICE.width * 0.8}
                />
                <Text numberOfLines={2} style={styles.videoTitle}>{video.name}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        width: DEVICE.width * 0.8,
        marginTop:10,
    },
    videoTitle: {
        fontSize: 15,
        width:DEVICE.width * 0.8,
        color: '#fff',
        
    }

});