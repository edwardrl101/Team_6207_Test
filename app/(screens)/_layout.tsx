import { Stack } from "expo-router";
import { useFonts, } from 'expo-font';
import { Drawer } from "expo-router/drawer"

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Oswald': require('@/assets/fonts/Oswald-Bold.ttf'),
    'Bigelow': require('@/assets/fonts/BigelowRules-Regular.ttf')
  });


  return (
    <Drawer/>
  );
}
