import YoutubeChannel from '@/components/channel';
import YoutubeVideo from '@/components/videos';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView } from 'react-native'

export default function Pesquisa(){
    const [query, setQuery] = useState('');
    const [openConfig, setOpenConfig] = useState(false);
    const [queryResults, setQueryResults] = useState([]);
    const [erro, setErro] = useState(false);
    const [erroMsg, setErroMsg] = useState('')
    const [searchOpt, setSearchOpt] = useState({
        "max": 25
    })

    async function pesquisar(q: string){
        q.replaceAll(' ', '+')

        const opts = `&maxResults=${searchOpt.max}`

        fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.EXPO_PUBLIC_API_KEY}&part=snippet&q=${q}${opts}`).then(res =>
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

        <ScrollView style={videosListStyle.scrollView}>
            {erro ? <>
                <Text>Erro ao carregar resultados da pesquisa</Text>
                <Text>{erroMsg}</Text>
            </>:<>
                {queryResults.map((item, index) => (<View key={index} style={{marginBottom: 20}}>
                    {item["id"]["kind"] == "youtube#channel" ?
                        <YoutubeChannel id={item["id"]["channelId"]} item={item["snippet"]} key={index} />
                    :
                    item["id"]["kind"] == "youtube#video" ?
                        <YoutubeVideo 
                            id={item["id"]["videoId"]} 
                            item={item["snippet"]}
                        />
                    :
                    <Text key={index}>{item["snippet"]["title"]}</Text>}
                </View>))}
            </>
            }
        </ScrollView>
    </View>
}

const videosListStyle = StyleSheet.create({
    "scrollView": {
        marginBottom: 10
    }
})

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