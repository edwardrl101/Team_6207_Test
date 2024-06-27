import { Modal, View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';

export default function ResetButton ({onClose}) {
    return (
        <IconButton style = {styles.calendarIcon}
        icon = "close"
        size = {24}
        onPress={onClose}></IconButton>
    )
}

const styles = StyleSheet.create({
    calendarIcon: {
        marginRight: 10,
      },
})