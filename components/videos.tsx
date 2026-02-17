import { Image, StyleSheet, View, Text } from "react-native"

interface Props{
    item: any,
    id: string
}

export default function YoutubeVideo({item}: Props){

    return (<View>
        <Image 
            style={style.image}
            source={{
                uri: item["thumbnails"]["high"]["url"]
            }}
        />

        <Text style={style.title}>{item["title"]}</Text>
        <Text>Enviado: {item["publishTime"]}</Text>
    </View>)
}

const style = StyleSheet.create({
    "image": {
        height: 210,
        width: '100%',
        borderRadius: 15,
    },
    "title": {
        marginBottom: 2,
        fontSize: 20,
        fontWeight: 'bold'
    },
})