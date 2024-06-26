import { View, Text, StyleSheet, SafeAreaView, 
    TextInput, TouchableOpacity, KeyboardAvoidingView, 
    ActivityIndicator, ScrollView, Image } from "react-native"
import { useState } from 'react'
import { supabase } from '@/app/(auth)/client'

export default function forgetpassword() {
        return (
            <SafeAreaView style = {styles.container}>
              
              <ScrollView> 

                <Text style = {styles.titleText}>HocusFocus</Text>
                <Text style = {styles.WelcomeText}>Thank you! Your kingdom is waiting for you!</Text>
    
                <KeyboardAvoidingView behavior="padding" style = {styles.bodyContainer}>
                 </KeyboardAvoidingView>
                
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
         
    })