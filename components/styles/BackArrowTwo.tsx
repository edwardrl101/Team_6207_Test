import { Modal, View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';

export default function BackArrowTwo (onClose) {
    return (
        <IconButton style = {styles.modalCloseButton}
        icon = "arrow-left"
        size = {30}
        onPress={onClose}></IconButton>
    )
}

const styles = StyleSheet.create({
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        left: 5,
        color: 'white',
      },
})