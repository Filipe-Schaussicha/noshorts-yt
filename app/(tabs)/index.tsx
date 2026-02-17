import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function Index() {

  const onStateChange = useCallback((state: any) => {
    Alert.alert("Teste")
  }, []);

  return (
    <View>
      <Text>AAA</Text>

      <YoutubePlayer
        height={300}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
    </View>
  );

}