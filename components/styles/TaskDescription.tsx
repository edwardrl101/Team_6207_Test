import React from 'react';
import { Text, View } from 'react-native';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

const TaskDescription = ({ startDate, dueDate, category }) => {
  return (
    <View>
      <Text>{`Start: ${startDate ? formatDate(new Date(startDate)) : ""} ${startDate ? formatTime(new Date(startDate)) : ""}`}</Text>
      <Text>{`End: ${dueDate ? formatDate(new Date(dueDate)) : ""} ${dueDate ? formatTime(new Date(dueDate)) : ""}`}</Text>
      <Text>{`${category || 'No Category'}`}</Text>
    </View>
  );
};

export default TaskDescription;