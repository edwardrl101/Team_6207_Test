import { Stack } from "expo-router";
import { useFonts, } from 'expo-font';
import { Drawer } from "expo-router/drawer"
import { AppState } from "react-native";
import React, {useRef, useState, useEffect} from 'react'
import { supabase } from "@/app/(auth)/client"

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Oswald': require('@/assets/fonts/Oswald-Bold.ttf'),
    'Bigelow': require('@/assets/fonts/BigelowRules-Regular.ttf')
  });

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const handleApp = async nextAppState => {
     if (nextAppState === 'background') {
        const {data, error} = await supabase.rpc('background_time', 
        {auth_id : "a9d5c701-4364-4c96-88f2-10c93e2ac09e", back_time : "ugh"})
        console.log(error);
        console.log("hilool");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    };

    const subscription = AppState.addEventListener('change', handleApp)

    return () => {
      subscription.remove();
    };
  }, []); 


  return (
    <Drawer/>
  );
}
