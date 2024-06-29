import { Modal, View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';

export default function CalendarButton ({onClose}) {
    return (
        <IconButton style = {styles.calendarIcon}
        icon = "calendar"
        size = {24}
        onPress={onClose}></IconButton>
    )
}

const styles = StyleSheet.create({
    calendarIcon: {
        marginRight: 10,
      },
})