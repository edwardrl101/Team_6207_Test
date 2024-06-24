import { View, Text, StyleSheet, Image, ImageBackground, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'

export default function forgetpassword() {

    const [email, setEmail] = useState("");

    return(
        <SafeAreaView style = {styles.background}>
        <ImageBackground source = {require('../assets/images/woods.png')} style = {styles.background}>

        <Image source = {require('../assets/images/lock.png')} style = {styles.lock}></Image>
        
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
        <Text style = {styles.authText}>SEND</Text>
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