import { View, StyleSheet } from "react-native"
import Login from "./login"
import { useFonts } from 'expo-font'

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Oswald': require('@/assets/fonts/Oswald-Bold.ttf'),
    'Bigelow': require('@/assets/fonts/BigelowRules-Regular.ttf')
  });
  return (
    <View style = {styles.container}>
      <Login />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1}
})