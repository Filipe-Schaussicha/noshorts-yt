import { Stack } from 'expo-router';

export default function StackLayout() {
  return <Stack>
    <Stack.Screen name='(tabs)' options={{
        headerShown: false
    }}/>
    <Stack.Screen name='show' options={{
        headerShown: false
    }}/>
  </Stack>
}
