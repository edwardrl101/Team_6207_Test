import { Text, View, StyleSheet, FlatList, Modal, TextInput, Button} from 'react-native'
import { Provider as PaperProvider, Appbar, FAB, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'

const TaskInputModal = ({ visible, onClose, saveTask }) => {

    const[text, setText] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    

    const handleSave = () => {
        if(text.trim()) {
          saveTask({ task: text, dueDate: dueDate.toISOString() });
            setText("");
            onClose();
        }
    }

    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || dueDate;
      setShowDatePicker(false);
      setDueDate(currentDate);
    };

    const onTimeChange = (event, selectedTime) => {
      const currentTime = selectedTime || dueDate;
      setShowTimePicker(false);
      setDueDate(currentTime);
    };
  

    return(
        <Modal style = {styles.modalContainer}
      animationType = "slide" 
      visible = {visible}
      onRequestClose={onClose}>
        <View style = {styles.modalContainer}>
        <View style = {styles.modalHeader}>
        <Text style = {styles.modalHeaderText}> Hello! </Text>
        </View>
        <IconButton style = {styles.modalCloseButton}
        icon = "arrow-left"
        size = {30}
        onPress={onClose}></IconButton>
        <Text>What do you want to do?</Text>
        <TextInput placeholder = {"Enter your task here"}
        value = {text}
        onChangeText = {setText}></TextInput>
        <Button title="Set Due Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        
        <Button title="Set Due Time" onPress={() => setShowTimePicker(true)} />
        {showTimePicker && (
          <DateTimePicker
            value={dueDate}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <Text>Due Date: {dueDate.toDateString()}</Text>
        <Text>Due Time: {dueDate.toLocaleTimeString()}</Text>
        
         <Button title = "Save" onPress = {handleSave} style={styles.button}>
        </Button>
        </View>
      </Modal>
    )
}

export default TaskInputModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'white'
      },
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        left: 5,
        color: 'white',
      },
    modalHeader: {
        backgroundColor: 'blue', // light gray background
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
      },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 55
    },
    button: {
        marginTop: 100,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      borderRadius: 28,
    }
})