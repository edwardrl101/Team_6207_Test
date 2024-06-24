import { Text, View, StyleSheet, FlatList, Modal} from 'react-native'
import { Provider as PaperProvider, Appbar, FAB, List, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import TaskInputModal from '@/components/TaskInputModal'
import TaskDetailModal from '@/components/TaskDetailModal'
import { differenceInCalendarDays, isThisWeek, isTomorrow, isThisMonth, isAfter, endOfMonth } from 'date-fns';


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

  // Takes in two parameters, namely task name and date(along with time). 
  // Copies all the contents of the current tasks and changes the parameter being updated.
  const handleSaveTask = (id, newTask, newDueDate) => {
    setTasks((prevTasks) =>
      prevTasks.map(task => task.id === id ? { ...task, task: newTask, dueDate: newDueDate } : task)
  );
  setTaskDetailModalVisible(false);
  };

  // Check if a task is due tomorrow
  const isDueTomorrow = (dueDate) => {
    return isTomorrow(new Date(dueDate));
  };
  
  // Check if a task is due this week (excluding tomorrow)
  const isDueThisWeek = (dueDate) => {
    const date = new Date(dueDate);
    return isThisWeek(date, { weekStartsOn: 1 }) && !isDueTomorrow(dueDate); // Assuming week starts on Monday
  };

  // Check if a task is due this month (excluding tomorrow and this week)
  const isDueThisMonth = (dueDate) => {
    const date = new Date(dueDate);
    return isThisMonth(date) && !isDueThisWeek(dueDate);
  };

  // Check if a task is due next month or later
  const isUpcoming = (dueDate) => {
    const date = new Date(dueDate);
    return isAfter(date, endOfMonth(new Date()));
  };

  // Check if a task is overdue
  const isOverdue = (dueDate) => {
    const today = new Date();
    const date = new Date(dueDate);
    return differenceInCalendarDays(date, today) < 0;
  };

  // Group the tasks by date
  const groupTasksByDate = (tasks) => {
    const groupedTasks = {
      overdue: [],
      tomorrow: [],
      thisWeek: [],
      thisMonth: [],
      upcoming:[]
    };
  
    tasks.forEach(task => {
      if (isOverdue(task.dueDate)) {
        groupedTasks.overdue.push(task);
      } else if (isDueTomorrow(task.dueDate)) {
        groupedTasks.tomorrow.push(task);
      } else if (isDueThisWeek(task.dueDate)) {
        groupedTasks.thisWeek.push(task);
      } else if (isDueThisMonth(task.dueDate)) {
        groupedTasks.thisMonth.push(task);
      } else if (isUpcoming(task.dueDate)) {
        groupedTasks.upcoming.push(task);
      }
    });
  
    return groupedTasks;
  };

  const groupedTasks = groupTasksByDate(tasks);

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
        
        {groupedTasks.overdue.length > 0 && (
            <>
              <List.Subheader style={styles.headerText}>Overdue</List.Subheader>
              <FlatList
                data={groupedTasks.overdue}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </>
          )}

          {groupedTasks.tomorrow.length > 0 && (
            <>
              <List.Subheader style={styles.headerText}>Tomorrow</List.Subheader>
              <FlatList
                data={groupedTasks.tomorrow}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </>
          )}

          {groupedTasks.thisWeek.length > 0 && (
            <>
              <List.Subheader style={styles.headerText}>This Week</List.Subheader>
              <FlatList
                data={groupedTasks.thisWeek}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </>
          )}
          
          {groupedTasks.thisMonth.length > 0 && (
            <>
              <List.Subheader style={styles.headerText}>This Month</List.Subheader>
              <FlatList
                data={groupedTasks.thisMonth}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </>
          )}

          {groupedTasks.upcoming.length > 0 && (
            <>
              <List.Subheader style={styles.headerText}>Upcoming</List.Subheader>
              <FlatList
                data={groupedTasks.upcoming}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            </>
          )}
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