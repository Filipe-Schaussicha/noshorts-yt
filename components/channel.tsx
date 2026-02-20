import { useRouter } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

interface Props{
    item: any,
    id: string
}

export default function YoutubeChannel({item, id}: Props){
    const route = useRouter()
    const goToChannel = ()=> {
        route.push({
            pathname: "/show/channel/[channelId]",
            params: {channelId: id, title: item["title"], imgUrl: item["thumbnails"]["default"]["url"]}
        })
    }

    return (<View>
        <Pressable style={style.pressable} onPress={goToChannel}>
            <Image 
                style={style.image} 
                source={{
                    uri: item["thumbnails"]["default"]["url"]
                }}
            />
            <View>
                <Text style={style.title}>{item["title"]}</Text>
                <Text>{item["description"]}</Text>
            </View>
        </Pressable>
    </View>)
}

const style = StyleSheet.create({
    "pressable": {
        flexDirection: 'row',
        alignContent: 'center'
    },
    "image": {
        width: 75,
        height: 75,
        borderRadius: 15,
        marginRight: 10
    },
    "title": {
        marginBottom: 2,
        fontSize: 20,
        fontWeight: 'bold'
    }
})