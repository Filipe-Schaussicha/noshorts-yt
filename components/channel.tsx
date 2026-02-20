import { useRouter } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

interface Props{
    id: string,
    titulo: string,
    thumbUrl: string,
}

export default function YoutubeChannel(props: Props){
    const route = useRouter()
    const goToChannel = ()=> {
        route.push({
            pathname: "/show/channel/[channelId]",
            params: {channelId: props.id, title: props.titulo}
        })
    }

    return (<View style={style.mainView}>
        <Pressable style={style.pressable} onPress={goToChannel}>
            {props.thumbUrl != "" &&
                <Image 
                    style={style.image} 
                    source={{
                        uri: props.thumbUrl
                    }}
                />
            }
            <View>
                <Text style={style.title}>{props.titulo}</Text>
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
    },
    "mainView": {
        borderRadius: 15,
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginVertical: 10
    }
})