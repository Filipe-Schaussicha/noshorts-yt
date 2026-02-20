import React, { useCallback } from "react";
import { Alert, Text, View } from "react-native";

export default function Index() {

  const onStateChange = useCallback((state: any) => {
    Alert.alert("Teste")
  }, []);

  return (
    <View>
      <Text>Index</Text>
    </View>
  );

}