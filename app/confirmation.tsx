import { View, Text, StyleSheet, Image, ImageBackground, 
    TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Link } from 'expo-router'
import BackArrow from '@/components/styles/BackArrow'

export default function Confirmation() {
    return(
        <SafeAreaView style = {styles.background}>
            <ImageBackground source = {require('../assets/images/woods.png')} style = {styles.background}>

            <Link href = "/signup" asChild>
            <TouchableOpacity>
              <BackArrow></BackArrow>
          </TouchableOpacity>
          </Link>
            <Image source = {require('../assets/images/email.png')} style = {styles.email}></Image>

            <Text style = {styles.titleText}>AUTHENTICATION</Text>
            <Text style = {styles.message}>Confirm your sign-up...</Text>
            <Text style = {styles.instructions}>We sent a link to your email address! Click on the link to
            confirm the creation of your account.</Text>

            <Link href = "/login" asChild>
            <TouchableOpacity style = {styles.authButton}>
                <Text style = {styles.authText}>NEXT</Text>
            </TouchableOpacity>
            </Link>

            </ImageBackground>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    email: {
        marginTop: 20,
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
    instructions: {
        color: "white",
        paddingTop: 15,
        paddingHorizontal: 30,
        textAlign: "center"
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