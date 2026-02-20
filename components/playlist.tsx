import { Image, Pressable, StyleSheet, Text, View } from "react-native"

interface Props{
    thumbUrl: string,
    title: string,
    playlistId: string,
    viaYoutubeApi: boolean
}

function goToPlalist(){

}

export default function YoutubePlaylist(props: Props){

    return (<View style={{marginVertical: 10}}>
        <Pressable onPress={goToPlalist}>
            <Image 
                style={style.image}
                source={{
                    uri: props.thumbUrl
                }}
            />

            <Text style={style.title}>{props.title}</Text>
            <Text>Playlist</Text>
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