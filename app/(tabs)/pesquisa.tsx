import YoutubeChannel from '@/components/channel';
import YoutubePlaylist from '@/components/playlist';
import YoutubeVideo from '@/components/videos';
import getAPIKey from '@/util/getAPIKey';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Pesquisa(){
    const [query, setQuery] = useState('');
    const [openConfig, setOpenConfig] = useState(false);
    const [queryResults, setQueryResults] = useState([]);
    const [erro, setErro] = useState(false);
    const [erroMsg, setErroMsg] = useState('')
    const [searchOpt, setSearchOpt] = useState({
        "max": 50
    })

    const insets = useSafeAreaInsets();

    async function pesquisar(q: string){
        q.replaceAll(' ', '+')

        const opts = `&maxResults=${searchOpt.max}`

        fetch(`https://www.googleapis.com/youtube/v3/search?key=${getAPIKey()}&part=snippet&q=${q}${opts}`).then(res =>
            res.json()
        ).then(json => {setQueryResults(json["items"]); setErro(false)}).catch((e)=>{setErro(true); setErroMsg(e)})
    }

    return <View style={{padding: 15}}>
        {/* Barra de pesquisa */}
        <View>
            <View style={searchStyles.searchBar}>
                <TextInput 
                    value={query}
                    onChangeText={setQuery}
                    style={searchStyles.input}
                />
                
                <TouchableHighlight 
                    onPress={()=>setOpenConfig(val => !val)} 
                    activeOpacity={0.1}
                    underlayColor="#DDDDDD"
                    style={searchStyles.searchBtn}
                >
                    <MaterialIcons name="list" size={36} />
                </TouchableHighlight>

                <TouchableHighlight 
                    onPress={()=>pesquisar(query)} 
                    activeOpacity={0.1}
                    underlayColor="#DDDDDD"
                    style={searchStyles.searchBtn}
                >
                    <MaterialIcons name="search" size={36} />
                </TouchableHighlight>
            </View>
            
            {openConfig &&
                <View>
                    <Text>Configs</Text>
                </View>
            }
        </View>

        <ScrollView style={{marginBottom: insets.bottom}}>
            {erro ? <>
                <Text>Erro ao carregar resultados da pesquisa</Text>
                <Text>{erroMsg}</Text>
            </>:<>
                {queryResults.map((item, index) => (<View key={index}>
                    {item["id"]["kind"] == "youtube#channel" ?
                        <YoutubeChannel 
                            id={item["id"]["channelId"]}
                            key={index}
                            titulo={item["snippet"]["title"]}
                            thumbUrl={item["snippet"]["thumbnails"]["medium"]["url"]}
                        />
                    :
                    item["id"]["kind"] == "youtube#video" ?
                        <YoutubeVideo 
                            videoId={item["id"]["videoId"]} 
                            title={item["snippet"]["title"]}
                            thumb={item["snippet"]["thumbnails"]["medium"]["url"]}
                            publishTime={item["snippet"]["publishedAt"]}
                            channelTitle={item["channelTitle"]}
                            channelId={item["snippet"]["channelId"]}
                        />
                    :
                    item["id"]["kind"] == "youtube#playlist" ?
                    <YoutubePlaylist 
                        playlistId={item["id"]["playlistId"]}
                        title={item["snippet"]["title"]}
                        thumbUrl={item["snippet"]["thumbnails"]["medium"]["url"]}
                        viaYoutubeApi={true}
                    />
                    :
                    <Text key={index}>{item["snippet"]["title"]}</Text>}
                </View>))}
            </>
            }
        </ScrollView>
    </View>
}

const searchStyles = StyleSheet.create({
    "searchBar": {
        padding: 3,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#DDDDDD",
        borderRadius: 15,
        marginBottom: 10
    },
    "input": {
        flex: 1,
        padding: 5,
    },
    "searchBtn": {
        marginHorizontal: 3,
    },
})