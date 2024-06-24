import { View, Text, StyleSheet, SafeAreaView, 
    TextInput, TouchableOpacity, KeyboardAvoidingView, 
    ActivityIndicator, ScrollView, Image } from "react-native"
import { useState } from 'react'
import { supabase } from '../app/client'

export default function forgetpassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        if(!email) errors.email = "Email is required";
        if(!newPassword) errors.newPassword = "Password is required";
        if(!confirmation) errors.confirmation = "Password is required";
    
        setErrors(errors);
    
        return Object.keys(errors).length === 0;
      }
    
    async function handleSubmit() {
        setLoading(true);
        if(!validateForm()) {
          setLoading(false);
          return;
        }

        if(newPassword != confirmation) {
            alert("Passwords do not match")
            setLoading(false);
            return
          }
    
          const { data, error } = await supabase.rpc('is_email_exist', { mail: email })
          if (!data) {
            alert("Incorrect email")
            setLoading(false);
            return
          }
          try{
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
              })
            if(error) throw error
            alert("Reset password successful!")
          } catch (error) {
            alert(error)
          }
          setLoading(false);


    }
        return (
            <SafeAreaView style = {styles.container}>
              
              <ScrollView> 

                <Text style = {styles.titleText}>HocusFocus</Text>
                <Text style = {styles.WelcomeText}>Your kingdom needs a new lock!</Text>
    
                <KeyboardAvoidingView behavior="padding" style = {styles.bodyContainer}>
    
                <Text style = {styles.createAccountText}>Reset Password</Text>
    
                 <Text style = {styles.Label}>Email</Text>
                 <TextInput 
                 style = {styles.form} 
                 placeholder = "Confirm your email" 
                 value = {email} 
                 onChangeText = {setEmail}/>
    
                 {
                 errors.email ? <Text style = {styles.errorText}>{errors.email}</Text> : null // display the error message
                 // if nothing is typed in
                 }
    
                 <Text style = {styles.Label}>Password</Text>
                 <TextInput 
                 style = {styles.form} 
                 placeholder = "Create a new password" 
                 value = {newPassword} 
                 onChangeText = {setNewPassword}
                 secureTextEntry
                 />
    
                 {
                 errors.newPassword ? <Text style = {styles.errorText}>{errors.newPassword}</Text> : null // display the error message
                 // if nothing is typed in
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
                 errors.confirmation ? <Text style = {styles.errorText}>{errors.confirmation}</Text> : null // display the error
                 // message if nothing is typed in
                 }
    
                 </KeyboardAvoidingView>
    
                 {
                 loading ? (<ActivityIndicator size = "large" color = "#0000ff"></ActivityIndicator>) : (
                <TouchableOpacity style = {styles.authButton} onPress = {() => handleSubmit()}>
                <Text style = {styles.authText}>RESET PASSWORD</Text>
                </TouchableOpacity>
                 )}
                 </ScrollView>
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
            paddingTop: 20
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