import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import CalendarButton from './styles/CalendarButton';
import ClockButton from './styles/ClockButton';
import ResetButton from './styles/ResetButton';
import BackArrowTwo from './styles/BackArrowTwo';

const TaskDetailModal = ({ visible, onClose, task, onSave, onDelete }) => {
  const [text, setText] = useState(task ? task.task : '');
  const [dueDate, setDueDate] = useState(task.dueDate === null ? null : new Date(task.dueDate));
  const [startDate, setStartDate] = useState(task.startDate === null ? null : new Date(task.startDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [category, setCategory] = useState(task ? task.category : '');
  const [isEdited, setIsEdited] = useState(false);
  const [dateType, setDateType] = useState(''); // 'start' or 'due'
  const [timeType, setTimeType] = useState(''); // 'start' or 'due'
  const [categories, setCategories] = useState(["Work", "Personal", "Shopping", "Others"]); // Default categories
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if(task) {
      setText(task.task);
      setStartDate(new Date(task.startDate))
      if(task.dueDate) {
      setDueDate(new Date(task.dueDate));
      } else {
        setDueDate(null);
      }
      setCategory(task.category);
    }
  }, [task]);

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      setNewCategory("");
      setIsEdited(true);
    }
  };

  const resetInputs = () => {
    setText(task.task);
    if(task.startDate) {
      setStartDate(new Date(task.startDate));
    } else {
      setStartDate(null);
    }
      if(task.dueDate) {
      setDueDate(new Date(task.dueDate));
      } else {
        setDueDate(null);
      }
      setCategory(task.category);
      setNewCategory("");
      setDateType('');
      setTimeType('');
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
    if(!dueDate || !startDate) {
      Alert.alert('Invalid Date Selection', 'Please Enter a Date')
      return;
    }
    if((dueDate && startDate) && dueDate < startDate) {
      Alert.alert('Invalid Date Selection', 'Due date cannot be before the start date.');
        return;
    }
    if (text.trim()) {
      onSave(task.id, text, dueDate, startDate, category);
      setIsEdited(false);
      onClose();
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            onClose();
            onDelete(task.id);
          }
        }
      ]
    );
    
  }

  const onDateChange = (event, selectedDate) => {
    if(event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    } else {
      const currentDate = selectedDate || (dateType === 'start' ? startDate : dueDate);
      setShowDatePicker(false);
      if (dateType === 'start') {
      setStartDate(currentDate);
    } else {
      setDueDate(currentDate);
    }
    setIsEdited(true);
  }
}

const onTimeChange = (event, selectedTime) => {
  if(event.type === 'dismissed') {
    setShowTimePicker(false);
    return;
  } else {
    const currentTime = selectedTime || (dateType === 'start' ? startDate : dueDate);
    setShowTimePicker(false);
    if (dateType === 'start') {
    setStartDate(currentTime);
  } else {
    setDueDate(currentTime);
  }
  setIsEdited(true);
}
}

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <ScrollView>
        <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}>Edit Task</Text>
        <IconButton style = {styles.modalCloseButton}
        icon = "arrow-left"
        size = {30}
        onPress={onClose}></IconButton>
          <IconButton
          icon = "delete"
          size = {30}
          onPress = {handleDelete}
          style = {styles.deleteButton}
          />
        </View>
        <Text style = {styles.subheaderText}>What do you want to do?</Text>
        <TextInput
          placeholder="Enter your task here"
          value={text}
          onChangeText={(value) => { setText(value); setIsEdited(true); }}
          style={styles.textInput}
        />
        
        <Text style = {styles.subheaderText}>Start</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="Select a date"
            value={startDate ? startDate.toDateString() : ""}
            editable={false}/>
            
            <CalendarButton onClose = {() => {setDateType('start'); setShowDatePicker(true)}}/>

          {startDate && (<ResetButton onClose = {() => {setStartDate(null) ; setDueDate(null)}}/>
            )}
        </View>

        {startDate && (<View style={styles.dateInputContainer}>
        <TextInput
            style={styles.dateInput}
            placeholder="Select a time"
            value={startDate.toLocaleTimeString()}
            editable={false}
          />
          <ClockButton onClose = {() => {setTimeType('start'); setShowTimePicker(true)}}/>
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
          <CalendarButton onClose = {() => {setDateType('due'); setShowDatePicker(true)}}/>
          {dueDate && (<ResetButton
            onClose={() => setDueDate(null)}
          />)}
        </View>

        {dueDate && (<View style={styles.dateInputContainer}>
        <TextInput
            style={styles.dateInput}
            placeholder="Select due time"
            value={dueDate ? dueDate.toLocaleTimeString() : ""}
            editable={false}
          />
          <ClockButton onClose = {() => {setTimeType('due'); setShowTimePicker(true)}}/>
          </View>)}
          </View>)}

          {showDatePicker && (
          <DateTimePicker
            value={dateType === 'start' ? (startDate || new Date()) : (dueDate || new Date())}
            mode="date"
            display="default"
            onChange={onDateChange}/>
        )}
        
          {showTimePicker && (
          <DateTimePicker
            value={timeType === 'start' ? (startDate || new Date()) : (dueDate || new Date())}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <Text style={styles.subheaderText}>Choose a Category</Text>
        <View style = {styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={(value) => { setCategory(value); setIsEdited(true); }}
          items={categories.map(cat => ({ label: cat, value: cat }))}
          placeholder={{ label: 'Select a category', value: category }}
        />
        </View> 

        <KeyboardAvoidingView behavior = "padding">
        <View style={styles.dateInputContainer}>
          <TextInput
            style={styles.dateInput}
            placeholder="Add a new category"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <IconButton
            icon="plus"
            color="#6200EE"
            size={24}
            onPress={handleAddCategory}
            style={styles.addButton}
          />
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
  
        <FAB style = {styles.fab}
        small
        icon = "check"
        onPress={handleSave}/>

      </SafeAreaView>
    </Modal>
  );
};

export default TaskDetailModal;

const styles = StyleSheet.create({
  modalContainer: {
        flex: 1,
        backgroundColor: '#F9DFAD'
      },
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        left: 5,
        color: 'white',
      },
    modalHeader: {
        flexDirection: 'row',
        backgroundColor: '#F3E5F5', 
        padding: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
      },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 18,
        marginLeft: 55,
        color: 'purple'
    },
    deleteButton: {
      marginTop: 12,
        marginLeft: 160,
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
