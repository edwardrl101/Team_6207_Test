import { Text, View, StyleSheet, Image, ImageBackground } from "react-native";
import { useFonts } from 'expo-font'

export default function App() {
    const [fontsLoaded] = useFonts({
      'Oswald': require('../assets/fonts/Oswald-Bold.ttf'),
      'Bigelow': require('../assets/fonts/BigelowRules-Regular.ttf')
    });
    if(!fontsLoaded) {
        return undefined;
    }
}