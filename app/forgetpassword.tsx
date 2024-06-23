import { View, Text, StyleSheet, Image, ImageBackground, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import { supabase } from '../app/client'

export default function forgetpassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      let errors = {};
      if(!email) errors.email = "Email is required";
      setErrors(errors);
  
      return Object.keys(errors).length === 0;
    }
    async function handleSubmit() {
      setLoading(true);
      if(!validateForm()) {
        setLoading(false);
        return;
      }
      console.log("Sent", email);
      setEmail("");
      setErrors({});

      const { data, error } = await supabase.rpc('is_email_exist', { mail: email })
      if (!data) {
        alert("No user with email entered")
        setLoading(false);
        return
      }
      
      try{
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:8081/resetpassword',
        }
      )
        if(error) throw error
        alert("Reset password email sent! Click the link in your email to reset your password.")
      } catch (error) {
        alert(error)
      }
      setLoading(false);
    }

    return(
        <SafeAreaView style = {styles.background}>
        <ImageBackground source = {require('../assets/images/woods.png')} style = {styles.background}>

        <TouchableOpacity>
        <Image source = {require('../assets/images/lock.png')} style = {styles.lock}></Image>
        </TouchableOpacity>

        <Text style = {styles.titleText}>FORGOT YOUR PASSWORD?</Text>
        <Text style = {styles.message}>Fear not! We can help...</Text>

        <KeyboardAvoidingView behavior = "padding" style = {styles.bodyContainer}>
        <Text style = {styles.instructions}>Enter the email address associated to your account, 
        and we will send a link to reset your password.</Text>
        <Text style = {styles.label}>Email</Text>

        <TextInput 
        style = {styles.form}
        placeholder = {"Enter your email"}
        value = {email}
        onChangeText = {setEmail}>
        </TextInput>
        </KeyboardAvoidingView>

        <TouchableOpacity style = {styles.authButton}>
        <Text style = {styles.authText} onPress = {() => handleSubmit()}>SEND</Text>
        </TouchableOpacity>
        
        </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    arrow: {
        height: 25,
        width: 20,
        marginTop: 20,
        marginHorizontal: 15
    },
    lock: {
        marginTop: 30,
        alignSelf: "center",
        height: 130,
        width: 130
    },
    titleText: {
        color: "white",
        marginTop: 10,
        textAlign: "center",
        fontSize: 33,
        fontWeight: "bold"
    },
    message: {
        color: "white",
        fontStyle: "italic",
        fontSize: 15,
        textAlign: "center"
    },
    bodyContainer: {
        paddingHorizontal: 40,
    },
    instructions: {
        color: "white",
        paddingTop: 15,
    },
    label: {
        color: "#BFBFBF",
        paddingTop: 10,
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
})