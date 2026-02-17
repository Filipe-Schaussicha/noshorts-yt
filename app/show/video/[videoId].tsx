import insertDotsNumber from "@/util/insertDotsNumber";
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function YoutubeVideoPage(){
    const { width } = useWindowDimensions()
    const videHeigth = width * (9 / 16)

    const { videoId, title } = useLocalSearchParams();

    const [videoInfo, setVideoInfo] = useState<any>([]);
    const [loadingInfo, setLoadinginfo] = useState(true);

    const [showDesc, setShowDesc] = useState(false);

    useEffect(()=>{
        fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.EXPO_PUBLIC_API_KEY}&part=snippet,statistics&id=${videoId}`).then(res =>
            res.json()
        ).then(json => {setVideoInfo(json["items"][0]); setLoadinginfo(false)}).catch((e)=>{setLoadinginfo(true); Alert.alert(`Error: ${e}`)})
    }, [])

    return (<View style={styles.mainView}>
        <YoutubePlayer 
            height={videHeigth}
            videoId={videoId}
        />

        <ScrollView>
            <Text style={styles.title} >{title}</Text>

            {!loadingInfo && <>
            <View>
                <Text>{videoInfo["snippet"]["channelTitle"]}</Text>
            </View>
            
            <View style={descStyles.mainView} >
                <Text>
                    <Text style={descStyles.bold}>Views: </Text>
                    {insertDotsNumber(videoInfo["statistics"]["viewCount"])} |  
                    <Text style={descStyles.bold}> Likes: </Text>
                    {insertDotsNumber(videoInfo["statistics"]["likeCount"])}
                </Text>

                <Text>
                    <Text style={descStyles.bold}>Release At: </Text> 
                    {videoInfo["snippet"]["publishedAt"]}
                </Text>

                <Text>
                    <Text style={descStyles.bold}>Video Id: </Text>
                    {videoId}
                </Text>

                <Text>
                    <Text style={descStyles.bold}>Description: </Text>
                    {!showDesc ?
                        <Pressable onPress={()=>setShowDesc(val=>!val)}><Text>Show</Text></Pressable>
                        :
                        <Text>
                            {videoInfo["snippet"]["description"]}
                        </Text>
                    }
                </Text>
            </View>
            </>
            }
        </ScrollView>
    </View>)
}

const descStyles = StyleSheet.create({
    "mainView": {
        backgroundColor: '#DDDDDD',
        borderRadius: 15,
        padding: 5,
        marginTop: 5
    },
    "bold": {
        fontWeight: 'bold'
    },
})

const styles = StyleSheet.create({
    "mainView": {
        padding: 10
    },
    "title": {
        fontSize: 20,
        fontWeight: 'bold'
    },
})