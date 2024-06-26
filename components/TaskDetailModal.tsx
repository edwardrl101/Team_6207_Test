import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

const TaskDetailModal = ({ visible, onClose, task, onSave }) => {
  const [text, setText] = useState(task ? task.task : '');
  const [dueDate, setDueDate] = useState(task.dueDate === null ? null : new Date(task.dueDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [category, setCategory] = useState(task ? task.category : '');
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if(task) {
        setText(task.task);
        if(task.dueDate) {
          setDueDate(new Date(task.dueDate));
          } else {
            setDueDate(null);
          }
        setCategory(task.category);
    }
  }, [task]);

  const resetInputs = () => {
    if(task) {
      setText(task.task);
      if(task.dueDate) {
        setDueDate(new Date(task.dueDate));
        } else {
          setDueDate(null);
        }
      setCategory(task.category);
      setIsEdited(false);
    }
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
    if (text.trim()) {
      onSave(task.id, text, dueDate, category);
      setIsEdited(false);
      onClose();
    }
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    } else {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
    setIsEdited(true);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowTimePicker(false);
      return;
    } else {
    const currentTime = selectedTime || dueDate;
    setShowTimePicker(false);
    setDueDate(currentTime);
    setIsEdited(true);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}>Edit Task</Text>
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={handleClose}
            style={styles.modalCloseButton}
          />
        </View>
        <Text style = {styles.subheaderText}>Edit your task:</Text>
        <TextInput
          placeholder="Enter your task here"
          value={text}
          onChangeText={(value) => { setText(value); setIsEdited(true); }}
          style={styles.textInput}
        />
        
        <Text style = {styles.subheaderText}>When?</Text>
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
            onPress={() => setShowDatePicker(true)}
            style={styles.calendarIcon}
          />
        </View>

        {dueDate && (<View style={styles.dateInputContainer}>
        <TextInput
            style={styles.dateInput}
            placeholder="Select due time"
            value={dueDate ? dueDate.toLocaleTimeString() : ""}
            editable={false}
          />
          <IconButton
            icon="clock"
            color="#6200EE"
            size={24}
            onPress={() => setShowTimePicker(true)}
            style={styles.calendarIcon}
          />
          </View>)}

        {showDatePicker && (
          <DateTimePicker
           value={dueDate || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={dueDate || new Date()}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <Text style={styles.subheaderText}>Choose a Category</Text>
        <View style = {styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => { setCategory(value); setIsEdited(true); }}
          items={[
            { label: 'Work', value: 'Work' },
            { label: 'Personal', value: 'Personal' },
            { label: 'Shopping', value: 'Shopping' },
            { label: 'Others', value: 'Others' },
          ]}

          placeholder={{ label: 'Select a category', value: category }}
        />
        </View> 
  
        <FAB style = {styles.fab}
        small
        icon = "check"
        onPress={handleSave}/>

      </View>
    </Modal>
  );
};

export default TaskDetailModal;

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
});
