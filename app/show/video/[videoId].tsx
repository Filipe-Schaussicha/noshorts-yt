import insertDotsNumber from "@/util/insertDotsNumber";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

export default function YoutubeVideoPage(){
    const { width, height } = useWindowDimensions()
    const videHeigth = width * (9 / 16)

    const { videoId, title } = useLocalSearchParams();

    const [videoInfo, setVideoInfo] = useState<any>([]);
    const [loadingInfo, setLoadinginfo] = useState(true);

    const [showDesc, setShowDesc] = useState(false);

    const [loadingComents, setLoadingComents] = useState(0)
    const [comentsInfo, setComentsInfo] = useState([])

    const insets = useSafeAreaInsets();

    async function loadComents(){
        setLoadingComents(1)

        fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.EXPO_PUBLIC_API_KEY}&part=snippet&videoId=${videoId}&order=relevance&maxResults=50`).then(res=>
            res.json()
        ).then(json=>{setComentsInfo(
            json["items"].map((item:any)=>(item["snippet"]["topLevelComment"]))
        ); setLoadingComents(2)}).catch((e)=>{setLoadingComents(-1); Alert.alert(`Error: ${e}`)})
    }

    useEffect(()=>{
        fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.EXPO_PUBLIC_API_KEY}&part=snippet,statistics&id=${videoId}`).then(res =>
            res.json()
        ).then(json => {setVideoInfo(json["items"][0]); setLoadinginfo(false)}).catch((e)=>{setLoadinginfo(true); Alert.alert(`Error: ${e}`)})
    }, [])

    const styles = StyleSheet.create({
    "scrollView": {
        padding: 10,
        flex: 1,
        marginBottom: insets.bottom + 10,
    },
    "mainView": {
        padding: 10,
    },
    "title": {
        fontSize: 20,
        fontWeight: 'bold'
    },
})

    return (<View style={{height: height}}>
        <YoutubePlayer 
            height={videHeigth}
            videoId={videoId}
        />

        <ScrollView style={styles.scrollView}>
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

            <View style={comentsStyle.mainView}>
                {loadingComents != 2 ?
                    loadingComents == 1 ?
                    <Text style={comentsStyle.title}>Carregando...</Text>
                    :
                    <Pressable onPress={loadComents}>
                        <Text style={comentsStyle.title}>
                            {loadingComents == 0 ? 'Click aqui para carregar comentários' : 'Erro ao carregar comentários. Tentar novamente?'}
                        </Text>
                    </Pressable>
                    :
                    comentsInfo.map((item, index) => (
                        <View style={comentsStyle.comentView} key={index}>
                            <Image 
                                style={comentsStyle.image}
                                source={{
                                    uri: item["snippet"]["authorProfileImageUrl"]
                                }}
                            />

                            <View style={comentsStyle.textView}>
                                <Text>
                                    <Text style={{fontWeight: 'bold'}}>{item["snippet"]["authorDisplayName"]} </Text>
                                    {item["updatedAt"]}
                                </Text>

                                <Text>{item["snippet"]["textOriginal"]}</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
            </>
            }
        </ScrollView>
    </View>)

    
}

const comentsStyle = StyleSheet.create({
    "mainView": {
        backgroundColor: '#DDDDDD',
        borderRadius: 15,
        padding: 10,
        marginVertical: 10
    },
    "title": {
        fontWeight: 'bold',
        fontSize: 16
    },
    "comentView": {
        flexDirection: 'row',
        marginTop: 10,
        alignContent: 'center'
    },
    "image": {
        borderRadius: 50,
        width: 30,
        height: 30,
        marginRight: 10
    },
    "textView": {
        flex: 1
    }
})

const descStyles = StyleSheet.create({
    "mainView": {
        backgroundColor: '#DDDDDD',
        borderRadius: 15,
        padding: 10,
        marginTop: 10
    },
    "bold": {
        fontWeight: 'bold'
    },
})

