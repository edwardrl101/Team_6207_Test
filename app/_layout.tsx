import { Stack } from "expo-router";
import { useFonts } from 'expo-font'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Oswald': require('../assets/fonts/Oswald-Bold.ttf'),
    'Bigelow': require('../assets/fonts/BigelowRules-Regular.ttf')
  });

  return (
    // test
    <Stack screenOptions = {{headerShown: false}}> 
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(screens)"/>
    </Stack>
  );
}
