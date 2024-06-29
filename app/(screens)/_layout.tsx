import { Stack } from "expo-router";
import { useFonts, } from 'expo-font';
import { Drawer } from "expo-router/drawer"
import { AppState } from "react-native";
import React, {useRef, useState, useEffect} from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Oswald': require('@/assets/fonts/Oswald-Bold.ttf'),
    'Bigelow': require('@/assets/fonts/BigelowRules-Regular.ttf')
  });

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
      console.log("tes");
    });

    return () => {
      subscription.remove();
    };
  }, []);


  return (
    <Drawer/>
  );
}
