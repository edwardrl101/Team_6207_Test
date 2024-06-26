import { Text, View, StyleSheet, FlatList, Modal, TextInput, Button, Alert} from 'react-native'
import { Provider as PaperProvider, Appbar, FAB, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';

const TaskInputModal = ({ visible, onClose, saveTask }) => {

    const[text, setText] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showDueDatePicker, setShowDueDatePicker] = useState(false);
    const [showDueTimePicker, setShowDueTimePicker] = useState(false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState(["Personal", "Work", "School", "Others"]);
    const [newCategory, setNewCategory] = useState("");
    const [isEdited, setIsEdited] = useState(false);
    
    const handleAddCategory = () => {
      if (newCategory.trim() && !categories.includes(newCategory)) {
        setCategories([...categories, newCategory]);
        setCategory(newCategory);
        setNewCategory("");
        setIsEdited(true);
      }
    };

    const resetInputs = () => {
      setText("");
      setStartDate(null);
      setDueDate(null);
      setCategory('');
      setNewCategory("");
      setShowDatePicker(false);
      setShowTimePicker(false);
      setIsEdited(false);
    }

    const handleClose = () => {
      if (isEdited) {
        Alert.alert(
          "Confirm",
          "Are you sure you want to go back? All changes will be lost.",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () => {
                resetInputs();
                onClose();
              }
            }
          ]
        );
      } else {
      resetInputs();
      onClose();
    }
  }

  const handleSave = () => {
    if((dueDate && startDate) && dueDate < startDate) {
      Alert.alert('Invalid Date Selection', 'Due date cannot be before the start date.');
        return;
    }
    if(text.trim()) {
      const dueDateTime = dueDate ? new Date(dueDate) : null;
      saveTask({ task: text, dueDate: dueDateTime ? dueDateTime.toISOString() : null, category: category });
        setText("");
        setCategory('');
        setStartDate(null);
        setDueDate(null);
        setNewCategory("");
        setIsEdited(false);
        onClose();
    }
}

   const onStartDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
     setShowStartDatePicker(false);
     return;
     } else {
      const currentDate = selectedDate || startDate;
      setShowStartDatePicker(false);
      setStartDate(currentDate);
      setIsEdited(true);
     };
   }

    const onStartTimeChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
     setShowStartTimePicker(false);
     return;
    } else {
     const currentDate = selectedDate || startDate;
     setShowStartTimePicker(false);
     setStartDate(currentDate);
     setIsEdited(true);
    };
   }

    const onDueDateChange = (event, selectedDate) => {
      if (event.type === 'dismissed') {
        setShowDueDatePicker(false);
        return;
      } else {
        const currentDate = selectedDate || dueDate;
        setShowDueDatePicker(false);
        setDueDate(currentDate);
        setIsEdited(true);
    };
  }

    const onDueTimeChange = (event, selectedTime) => {
      if (event.type === 'dismissed') {
        setShowDueTimePicker(false);
        return;
      } else {
      const currentTime = selectedTime || dueDate;
      setShowDueTimePicker(false);
      setDueDate(currentTime);
      setIsEdited(true);
      }
    };
  
    return(
        <Modal style = {styles.modalContainer}
      animationType = "slide" 
      visible = {visible}
      onRequestClose={handleClose}>

        <View style = {{backgroundColor: 'yellow', flex: 1}}>
        <View style = {styles.modalHeader}>
        <Text style = {styles.modalHeaderText}> Hello! </Text>
        </View>

        <IconButton style = {styles.modalCloseButton}
        icon = "arrow-left"
        size = {30}
        onPress={handleClose}></IconButton>

        <Text style = {styles.subheaderText}>What do you want to do?</Text>
        <TextInput style = {styles.textInput}
        placeholder = {"Enter your task here"}
        value = {text}
        onChangeText={(value) => { setText(value); setIsEdited(true); }}/>

        
        <Text style = {styles.subheaderText}>Start</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="Select a date"
            value={startDate ? startDate.toDateString() : ""}
            editable={false}
          />
          <IconButton
            icon="calendar"
            color="#6200EE"
            size={24}
            onPress={() => setShowStartDatePicker(true)}
            style={styles.calendarIcon}
          />
          {showStartDatePicker && (
          <DateTimePicker
           value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
          {startDate && (<IconButton
            icon="close"
            color="#6200EE"
            size={24}
            onPress={() => setStartDate(null)}
            style={styles.calendarIcon}
          />)}
        </View>

        {startDate && (<View style={styles.dateInputContainer}>
        <TextInput
            style={styles.dateInput}
            placeholder="Select a time"
            value={startDate.toLocaleTimeString()}
            editable={false}
          />
          <IconButton
            icon="clock"
            color="#6200EE"
            size={24}
            onPress={() => setShowStartTimePicker(true)}
            style={styles.calendarIcon}
          />
          {showStartTimePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="time"
            display="default"
            onChange={onStartTimeChange}
          />)}
          </View>)}

        {startDate && (<View>
          <Text style = {styles.subheaderText}>End</Text>
          <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="Select due date"
            value={dueDate ? dueDate.toDateString() : ""}
            editable={false}
          />
          <IconButton
            icon="calendar"
            color="#6200EE"
            size={24}
            onPress={() => setShowDueDatePicker(true)}
            style={styles.calendarIcon}
          />
          
          {dueDate && (<IconButton
            icon="close"
            color="#6200EE"
            size={24}
            onPress={() => setDueDate(null)}
            style={styles.calendarIcon}
          />)}
        </View>
        </View>)}

        {dueDate && (<View style={styles.dateInputContainer}>
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
            onPress={() => setShowDueTimePicker(true)}
            style={styles.calendarIcon}
          />
          </View>)}

        {showDueDatePicker && (
          <DateTimePicker
           value={dueDate || new Date()}
            mode="date"
            display="default"
            onChange={onDueDateChange}
          />
        )}
        
        {showDueTimePicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="time"
            display="default"
            onChange={onDueTimeChange}
          />
        )}
        
        <Text style={styles.subheaderText}>Choose a Category</Text>
        <View style = {styles.dropdownContainer}>
        <RNPickerSelect
           onValueChange={(value) => { setCategory(value); setIsEdited(true); }}
           items={categories.map(cat => ({ label: cat, value: cat }))}
           placeholder={{ label: 'Select a category', value: null }}
        />
        </View>
        
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="Add a new category"
            value={newCategory}
            onChangeText={(value) => { setNewCategory(value); setIsEdited(true); }}/>
          
           <IconButton
            icon="plus"
            color="#6200EE"
            size={24}
            onPress={handleAddCategory}
            style={styles.calendarIcon}
          />
        </View>

        <FAB style = {styles.fab}
        small
        icon = "check"
        onPress={handleSave}/>
         
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