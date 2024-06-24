import { Text, View, StyleSheet, FlatList, Modal} from 'react-native'
import { Provider as PaperProvider, Appbar, FAB, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import TaskInputModal from '@/components/TaskInputModal'
import TaskDetailModal from '@/components/TaskDetailModal'


const TodoList = () => {
  const[modalVisible, setModalVisible] = useState(false);
  const[tasks, setTasks] = useState([]);
  const[selectedTask, setSelectedTask] = useState(null);
  const[taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try{
        const storedTasks = await AsyncStorage.getItem('tasks');
        if(storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async() => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error(error);
      }
    };

    saveTasks();
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { id: Date.now().toString(), ...task }]);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskDetailModalVisible(true);
  };

  const handleSaveTask = (id, newTask, newDueDate) => {
    setTasks((prevTasks) =>
      prevTasks.map(task => task.id === id ? { ...task, task: newTask, dueDate: newDueDate } : task)
  );
  setTaskDetailModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <List.Item
    title = {item.task}
    description={`Due: ${new Date(item.dueDate).toDateString()} ${new Date(item.dueDate).toLocaleTimeString()}`}
    onPress = {() => handleTaskClick(item)}
    right = {() => (
      <IconButton icon ="delete"
      onPress={() => handleDeleteTask(item.id)}
      />
    )}
    />
  );

  return(
    <PaperProvider>
    
    <View style = {styles.container}>

      <List.Section>
        <List.Subheader style = {styles.headerText} >My Tasks</List.Subheader>
    <FlatList
    data={tasks} 
    keyExtractor={(item) => item.id}
    renderItem = {renderItem}
      />
      </List.Section>

    <FAB style = {styles.fab}
    small
    icon = "plus"
    onPress={() => setModalVisible(true)}/>

      <TaskInputModal visible = {modalVisible} 
      onClose = {() => setModalVisible(false)}
      saveTask={handleAddTask}></TaskInputModal>

      {selectedTask && (
        <TaskDetailModal 
        visible = {taskDetailModalVisible}
        task = {selectedTask}
        onClose = {() => setTaskDetailModalVisible(false)}
        onSave={handleSaveTask}
        />
      )}
      
      </View>
    
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: 'white'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
  headerText: {
    fontWeight: 'bold',
    marginTop: 30,
    fontSize: 25
  }
})

export default TodoList