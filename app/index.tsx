import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Button } from "react-native";
import { useFonts } from 'expo-font'
import { useState } from "react";
import { Link } from 'expo-router';
import { AuthButton } from '../components/styles/styles'
import { supabase } from "./client"

export default function Index() {
  const [fontsLoaded] = useFonts({
    'Oswald': require('../assets/fonts/Oswald-Bold.ttf'),
    'Bigelow': require('../assets/fonts/BigelowRules-Regular.ttf')
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if(!email) errors.email = "Email is required";
    if(!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if(!validateForm()) {
      return;
    }
      console.log("Submitted", email, password);
      setEmail("");
      setPassword("");
      setErrors({});
    console.log("LOG IN Pressed")
    try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) throw error
      console.log(data)
      alert("Successful") 
    }
    catch(error){
      alert(error);
    }
  }

  return (
    <SafeAreaView style = {styles.background}>
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

      {
        errors.email ? <Text style = {styles.errorText}>{errors.email}</Text> : null
      }

      <Text style = {styles.Label}>Password</Text>
      <TextInput 
      style = {styles.form} 
      placeholder = "Enter your password" 
      secureTextEntry 
      value = {password} 
      onChangeText = {setPassword}/>

      {
        errors.password ? <Text style = {styles.errorText}>{errors.password}</Text> : null
      }

      </SafeAreaView>

      <TouchableOpacity style = {styles.authButton} onPress = {handleSubmit}>
            <Text style = {styles.authText}>LOGIN</Text>
        </TouchableOpacity>

      <Link href = "/signup" asChild>
      <TouchableOpacity onPress = {() => setErrors({})}>
      <Text style = {styles.createAccountText}>Not a member yet? 
      <Text style = {styles.forgetText}> Sign up now!</Text>
      </Text>
      </TouchableOpacity>
      </Link>

    </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create ({
  background: {
    flex: 1,
  },
  bodyContainer: {
    paddingHorizontal:40,
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
    fontWeight: "500"
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
    width: "89%",
    fontWeight: "500",
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
  },
  authButton: {
    backgroundColor: "#F9DFAD",
    marginTop: 35,
    padding: 10,
    alignSelf: "center",
    width: "80%",
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
  authText: {
    color: "#828282",
    textAlign: "center",
    fontWeight: "bold"
  },
});
