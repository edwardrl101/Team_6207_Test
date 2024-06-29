import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import TodoList from '@/components/TodoList';
import CompletedTasks from '@/components/CompletedTasks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

const Planner = () => {
  return (
    <NavigationContainer independent = {true}>
    <Tab.Navigator initialRouteName="TodoList">
      <Tab.Screen 
        name="TodoList" 
        component={TodoList} 
        options={{ tabBarLabel: 'Active Tasks',
          headerShown: false
         }} 
      />
      <Tab.Screen 
        name="CompletedTasks" 
        component={CompletedTasks} 
        options={{ tabBarLabel: 'Completed Tasks',
          headerShown: false
         }} 
      />
    </Tab.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Planner;
