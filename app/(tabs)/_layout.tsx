import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs>
    <Tabs.Screen 
      name="index"
      options={{
        title: "Inscrições",
        tabBarIcon: ({color}) => <MaterialIcons size={28} name="people" color={color} />
      }}
    />

    <Tabs.Screen 
      name="pesquisa"
      options={{
        title: "Pesquisar",
        tabBarIcon: ({color}) => <MaterialIcons size={28} name="search" color={color} />
      }}
    />

    <Tabs.Screen 
      name="playlists"
      options={{
        title: "Playlists",
        tabBarIcon: ({color}) => <MaterialIcons size={28} name="video-library" color={color} />
      }}
    />
  </Tabs>
}
