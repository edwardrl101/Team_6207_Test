import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
import { AuthButton } from '../components/styles/styles'
import { supabase } from './client'

export default function signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      let errors = {};
      if(!username) errors.username = "Username is required";
      if(!email) errors.email = "Email is required";
      if(!password) errors.password = "Password is required";
      if(!confirmation) errors.confirmation = "Password is required";
  
      setErrors(errors);
  
      return Object.keys(errors).length === 0;
    }

    async function handleSubmit() {
      if(!validateForm()) {
        return;
      }
      console.log("Submitted", username, email, password, confirmation);
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmation("");
      setErrors({});
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

             {
             errors.username ? <Text style = {styles.errorText}>{errors.username}</Text> : null
             }

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
             placeholder = "Create a new password" 
             value = {password} 
             onChangeText = {setPassword}
             secureTextEntry
             />

             {
             errors.password ? <Text style = {styles.errorText}>{errors.password}</Text> : null
             }

             <Text style = {styles.Label}>Confirm Password</Text>
             <TextInput 
             style = {styles.form} 
             placeholder = "Confirm your password" 
             value = {confirmation} 
             onChangeText = {setConfirmation}
             secureTextEntry
             />

             {
             errors.confirmation ? <Text style = {styles.errorText}>{errors.confirmation}</Text> : null
             }

             </KeyboardAvoidingView>

             <TouchableOpacity style = {styles.authButton} onPress = {() => handleSubmit()}>
            <Text style = {styles.authText}>SIGN UP</Text>
            </TouchableOpacity>

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
        fontWeight: "500"
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
      errorText: {
        color: "red",
      },
})