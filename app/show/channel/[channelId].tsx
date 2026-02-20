import YotubeVideoList from "@/components/videoList";
import getAPIKey from "@/util/getAPIKey";
import insertDotsNumber from "@/util/stringUtils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

enum State{
    LOADING,
    SUCCESS,
    ERROR,
    TEST
}

export default function YoutubeChannelPage(){
    const { channelId, title } = useLocalSearchParams();
    
    const [data, setData] = useState<any>({});
    const [loadingData, setLoadingData] = useState(State.LOADING)

    useEffect(()=>{
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&key=${getAPIKey()}&id=${channelId}`).then(res=>{
            return res.json()
        }).then((json) => {setData(json["items"][0]); setLoadingData(State.SUCCESS)}).catch((e)=>{setLoadingData(State.ERROR); Alert.alert(`Erro: ${e}`)})
    }, [])

    return (<ScrollView>
        {loadingData == State.SUCCESS &&
            <Image 
                source={{
                    uri: String(data["brandingSettings"]["image"]["bannerExternalUrl"])
                }}
                height={100}
            />
        }

        <View style={style.redView}>
            {loadingData == State.SUCCESS &&
                <Image 
                    style={style.channelPhoto}
                    source={{
                        uri: data["snippet"]["thumbnails"]["medium"]["url"]
                    }}
                />
            }

            <View>
                <Text style={style.title}>{title}</Text>
                {loadingData == State.SUCCESS &&
                    <Text>Inscrições: {insertDotsNumber(data["statistics"]["subscriberCount"])}</Text>
                }
            </View>
        </View>

        {loadingData == State.LOADING && <Text>Carregando...</Text>}
        {loadingData == State.ERROR && <Text>Erro ao Carregar</Text>}
        {loadingData == State.SUCCESS &&
            <YotubeVideoList 
                PlaylistId={data["contentDetails"]["relatedPlaylists"]["uploads"]}
                autoNext={false}
            />
        }
        
    </ScrollView>)

}

const style = StyleSheet.create({
    "redView": {
        backgroundColor: "#ff7f7f",
        flexDirection: "row",
        padding: 10
    },
    "channelPhoto": {
        width: 75,
        height: 75,
        borderRadius: 15,
        marginRight: 10
    },
    "title": {
        fontWeight: 'bold',
        fontSize: 18
    },
})