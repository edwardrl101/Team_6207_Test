import { Stack } from "expo-router";
import { useFonts } from 'expo-font'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Oswald': require('../assets/fonts/Oswald-Bold.ttf'),
    'Bigelow': require('../assets/fonts/BigelowRules-Regular.ttf')
  });

  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup"/>
      <Stack.Screen name="forgetpassword"/>
    </Stack>
  );
}
