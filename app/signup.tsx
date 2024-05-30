import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
import { supabase } from "./client"

export default function signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleSubmit() {
      console.log("SIGN UP Pressed")
      try{
        const { data, error } = await supabase.auth.signUp(
          {
            email: email,
            password: password, //check if password match
            options: {
              data: {
                username: username,
              }
            }
          }
        )
        alert("Confirmation email sent")
      } catch (error) {
        alert(error)
      }
    }
    
    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.titleText}>HocusFocus</Text>
            <Text style = {styles.WelcomeText}>Tis the beginning of your journey...</Text>
            <KeyboardAvoidingView behavior="padding" style = {styles.bodyContainer}>
            <Text style = {styles.createAccountText}>Sign up</Text>
            <Text style = {styles.Label}>Username</Text>
            <TextInput 
             style = {styles.form} 
             placeholder = "Enter your username" 
             value = {username} 
             onChangeText = {setUsername}/>
             <Text style = {styles.Label}>Email</Text>
             <TextInput 
             style = {styles.form} 
             placeholder = "Enter your email" 
             value = {email} 
             onChangeText = {setEmail}/>
             <Text style = {styles.Label}>Password</Text>
             <TextInput 
             style = {styles.form} 
             placeholder = "Create a new password" 
             value = {password} 
             onChangeText = {setPassword}
             secureTextEntry
             />
             <Text style = {styles.Label}>Confirm Password</Text>
             <TextInput 
             style = {styles.form} 
             placeholder = "Confirm your password" 
             value = {password} 
             onChangeText = {setPassword}/>
             <TouchableOpacity style = {styles.signupButton} onPress = {() => console.log("Pressed")}>
                <Text style = {styles.signupText}>SIGN UP</Text>
             </TouchableOpacity>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor:"#4D3548" 
    },
    titleText: {
        fontFamily: 'Bigelow',
        fontSize: 52,
        color: "white",
        textAlign: "center",
        paddingTop: 40
    },
    WelcomeText: {
        color : "white", 
        fontStyle: 'italic', 
        fontSize: 15,
        textAlign: "center"
      },
      createAccountText: {
        color : "white",
        paddingTop: 20,
        fontSize: 20,
      },
      bodyContainer: {
        paddingHorizontal: 40
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
      signupButton: {
        backgroundColor: "#F9DFAD",
        marginTop: 35,
        padding: 10,
        alignSelf: "center",
        width: "100%",
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
      signupText: {
        color: "#828282",
        textAlign: "center",
      },
})
