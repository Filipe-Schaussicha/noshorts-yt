import { Image, StyleSheet, View, Text } from 'react-native'

interface Props{
    item: any,
    id: string
}

export default function YoutubeChannel({item}: Props){
    return (<View style={style.view}>
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
    </View>)
}

const style = StyleSheet.create({
    "view": {
        flexDirection: 'row'
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