import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { useFonts } from 'expo-font'
import { useState } from "react";

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Oswald': require('../assets/fonts/Oswald-Bold.ttf'),
    'Bigelow': require('../assets/fonts/BigelowRules-Regular.ttf')
  });
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  return (
    <ImageBackground source = {require('../assets/images/trees-background.png')} style = {styles.background}>
      <SafeAreaView style = {styles.bodyContainer}>
        <View style = {styles.headerTitle}>
        <View>
      <Text style = {styles.titleText}>HocusFocus</Text>
      <Text style ={styles.WelcomeText}>Welcome to your kingdom...</Text>
      </View>
      <Image source = {require('../assets/images/clouds.png')} style = {styles.headerImage}></Image>
      </View>
      <Text style = {styles.signinText}>Sign in</Text>
      <Text style = {styles.Label}>Email</Text>
      <TextInput 
      style = {styles.form} 
      placeholder = "Enter your email" 
      value = {email} 
      onChangeText = {setEmail}/>
      <Text style = {styles.Label}>Password</Text>
      <TextInput 
      style = {styles.form} 
      placeholder = "Enter your password" 
      secureTextEntry 
      value = {password} 
      onChangeText = {setPassword}/>
      </SafeAreaView>
      <TouchableOpacity>
      <Text style = {styles.forgetText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.loginButton} onPress = {() => console.log("Pressed")}>
        <Text style = {styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style = {styles.createAccountText}>Not a member yet? 
      <Text style = {styles.forgetText}> Sign up now!</Text>
      </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create ({
  background: {
    flex: 1,
  },
  bodyContainer: {
    paddingHorizontal:60,
  },
  titleText: {
    fontSize: 52,
    fontFamily: 'Bigelow',
    color: "white",
    paddingTop: 60,
  },
  WelcomeText: {
    color : "white", 
    fontStyle: 'italic', 
    fontSize: 15,
  },
  signinText: {
    color : "white",
    paddingTop: 20,
    fontSize: 20,
  },
  Label: {
    color: "#BFBFBF",
    paddingTop: 10,
  },
  placeholderText: {
    color: "#828282",
  },
  form: {
    backgroundColor: "white",
    padding: 8,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  forgetText: {
    paddingTop: 2,
    color: "#F9DFAD",
    textAlign: "right",
    width: "85%",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#F9DFAD",
    marginTop: 35,
    padding: 10,
    alignSelf: "center",
    width: "70%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loginText: {
    color: "#828282",
    textAlign: "center",
  },
  createAccountText: {
    paddingTop: 10,
    color: "white",
    textAlign: "center",
  },
  headerImage: {
    marginLeft: -22,
    marginTop: 40,
    width: 135,
    height: 60,
  },
  headerTitle: {
    flexDirection: "row",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  }
});
