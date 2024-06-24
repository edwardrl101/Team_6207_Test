import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskDetailModal = ({ visible, onClose, task, onSave }) => {
  const [text, setText] = useState(task ? task.task : '');
  const [dueDate, setDueDate] = useState(task ? new Date(task.dueDate) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if(task) {
        setText(task.task);
        setDueDate(new Date(task.dueDate));
    }
  }, [task]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(task.id, text, dueDate);
      onClose();
    }
  };

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

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Edit Task</Text>
          <IconButton
            icon="arrow-left"
            size={30}
            onPress={onClose}
            style={styles.modalCloseButton}
          />
        </View>
        <Text>Edit your task:</Text>
        <TextInput
          placeholder="Enter your task here"
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
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
  
        <Button title="Save" onPress={handleSave} style={styles.button} />
      </View>
    </Modal>
  );
};

export default TaskDetailModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  modalHeader: {
    backgroundColor: 'blue',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
  },
});
