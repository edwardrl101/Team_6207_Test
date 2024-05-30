import { View, Text, TouchableOpacity,  StyleSheet } from 'react-native'

export function AuthButton ( {text}:any ) {
    return (
        <TouchableOpacity style = {styles.authButton} onPress = {() => console.log("Pressed")}>
            <Text style = {styles.authText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
      },
})