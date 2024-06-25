import { Text, View, StyleSheet, FlatList, Modal, TextInput, Button} from 'react-native'
import { Provider as PaperProvider, Appbar, FAB, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

const TaskInputModal = ({ visible, onClose, saveTask }) => {

    const[text, setText] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [category, setCategory] = useState('');
    

    const handleSave = () => {
        if(text.trim()) {
          saveTask({ task: text, dueDate: dueDate.toISOString(), category: category});
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

        <Text style = {styles.subheaderText}>What do you want to do?</Text>

        <TextInput style = {styles.textInput}
        placeholder = {"Enter your task here"}
        value = {text}
        onChangeText = {setText}></TextInput>
        
        <Text style = {styles.subheaderText}>When?</Text>

        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="Select due date"
            value={dueDate.toDateString()}
            editable={false}
          />
          <IconButton
            icon="calendar"
            color="#6200EE"
            size={24}
            onPress={() => setShowDatePicker(true)}
            style={styles.calendarIcon}
          />

        </View>
        <View style={styles.dateInputContainer}>
        <TextInput
            style={styles.dateInput}
            placeholder="Select due time"
            value={dueDate.toLocaleTimeString()}
            editable={false}
          />
          <IconButton
            icon="clock"
            color="#6200EE"
            size={24}
            onPress={() => setShowTimePicker(true)}
            style={styles.calendarIcon}
          />
          </View>

        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        
        {showTimePicker && (
          <DateTimePicker
            value={dueDate}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
        
        <Text style={styles.subheaderText}>Choose a Category</Text>
        <View style = {styles.dropdownContainer}></View>
        <RNPickerSelect
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: 'Work', value: 'Work' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Shopping', value: 'Shopping' },
            { label: 'Others', value: 'Others' },
          ]}
          placeholder={{ label: 'Select a category', value: null }}
        />
        
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
        backgroundColor: '#F3E5F5', // light gray background
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
      },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 1,
        marginLeft: 40,
        color: 'purple'
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
    },
    subheaderText: {
      fontWeight: 'bold',
      fontSize: 20,
      paddingVertical: 5,
      marginHorizontal: 15,
      color: 'purple'
    },
    textInput:{
      marginHorizontal: 25,
      marginBottom: 20,
      backgroundColor: 'white',  // White background for list items
      borderRadius: 20,
      marginVertical: 10,
      marginHorizontal: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      shadowColor: '#000000',  // Black shadow color
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 3,
    },
    dateInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 25,
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      marginVertical: 10,
      paddingHorizontal: 15,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 3,
    },
    calendarIcon: {
      marginRight: 10,
    },
    dateInput: {
      flex: 1,
      paddingVertical: 10,
    },
    dropdownContainer: {
      marginHorizontal: 25,
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      marginVertical: 10,
      paddingHorizontal: 0,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 1,
      elevation: 3,
    },
})