import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import TodoList from '@/components/TodoList';

const Planner = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TodoList/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Planner;
