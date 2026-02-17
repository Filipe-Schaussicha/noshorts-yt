import { Link, useRouter } from "expo-router"
import { Image, StyleSheet, View, Text, Pressable } from "react-native"

interface Props{
    item: any,
    id: string,
}

export default function YoutubeVideo({item, id}: Props){
    const route = useRouter()
    const goToVideo = ()=> {
        route.push({
            pathname: "/show/video/[videoId]",
            params: {videoId: id, title: String(item["title"])}
        })
    }

    return (<View>
        <Pressable onPress={goToVideo}>
            <Image 
                style={style.image}
                source={{
                    uri: item["thumbnails"]["high"]["url"]
                }}
            />

            <Text style={style.title}>{item["title"]}</Text>
            <Text>Enviado: {item["publishTime"]}</Text>
        </Pressable>
    </View>)
}

const style = StyleSheet.create({
    "image": {
        height: 210,
        width: '100%',
        borderRadius: 15,
    },
    "title": {
        fontSize: 20,
        fontWeight: 'bold'
    },
})