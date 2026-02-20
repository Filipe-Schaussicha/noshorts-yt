import getAPIKey from "@/util/getAPIKey"
import { useEffect, useState } from "react"
import { Alert, ScrollView, StyleSheet, Text } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import YoutubeVideo from "./videos"

interface Props{
    PlaylistId: string,
    autoNext: boolean
}

export default function YotubeVideoList({PlaylistId, autoNext}: Props){

    const [videos, setVideos] = useState([])
    const [loadingVideos, setLoadingVideos] = useState(State.LOADING)

    const insets = useSafeAreaInsets();

    useEffect(()=>{
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PlaylistId}&maxResults=50&key=${getAPIKey()}`).then(res => (
            res.json()
        )).then(json => {setVideos(json["items"]); setLoadingVideos(State.SUCCESS)}).catch((e)=>{setLoadingVideos(State.ERROR); Alert.alert(`Error: ${e}`)})
    }, [])

    if(loadingVideos == State.LOADING){
        return <Text>Carregando Videos...</Text>
    }
    if(loadingVideos == State.ERROR){
        return <Text>Erro ao carregar Vídeos</Text>
    }

    const style = StyleSheet.create({
        "scrollView": {
            marginBottom: insets.bottom,
            padding: 15
        }
    })

    return (<ScrollView style={style.scrollView}>
        {videos.map((video, index) => (
            <YoutubeVideo
                key={index}
                videoId={video["snippet"]["resourceId"]["videoId"]}
                title={video["snippet"]["title"]}
                thumb={video["snippet"]["thumbnails"]["medium"]["url"]}
                publishTime={video["snippet"]["publishedAt"]}
                channelTitle={video["snippet"]["videoOwnerChannelTitle"]}
                channelId={video["snippet"]["videoOwnerChannelId"]}
            />
        ))}
    </ScrollView>)
}

enum State{
    LOADING,
    SUCCESS,
    ERROR,
    TEST
}