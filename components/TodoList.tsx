import { Text, View, StyleSheet, FlatList, Modal, SectionList} from 'react-native'
import { Provider as PaperProvider, Appbar, FAB, List, IconButton, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import TaskInputModal from '@/components/TaskInputModal'
import TaskDetailModal from '@/components/TaskDetailModal'
import { differenceInCalendarDays, isToday, isThisWeek, isTomorrow, isThisMonth, isAfter, endOfMonth } from 'date-fns';
import { supabase } from '@/app/(auth)/client'


const TodoList = () => {
  const[modalVisible, setModalVisible] = useState(false);
  const[tasks, setTasks] = useState([]);
  const[selectedTask, setSelectedTask] = useState(null);
  const[taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load the tasks from Supabase
  useEffect(() => {
    const loadTasks = async () => {
      try{
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase.rpc('display_planner', 
          {auth_id : user.id})
        if (error) { throw error; }
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadTasks();
  }, []);

  async function handleAddTask (task) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const taskid = Date.now().toString()
      setTasks((prevTasks) => [...prevTasks, { id: taskid, ...task }]);
      const { data, error } = await supabase.rpc('insert_planner', 
        { auth_id : user.id, task : task.task, due_date : task.dueDate, category : task.category, task_id : taskid})
    } catch (error) {
      console.log(error);
    }
  };

  async function handleDeleteTask (id) {
    try {
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase.rpc('delete_planner', 
        { auth_id : user.id, task_id : id})
    } catch (error) {
      console.log(error)
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskDetailModalVisible(true);
  };

  async function handleSaveTask (id, newTask, newDueDate, newCategory) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase.rpc('edit_planner', 
        { auth_id : user.id, newtask : newTask, due_date : newDueDate, newcategory : newCategory, task_id : id })
  
      setTasks((prevTasks) =>
        prevTasks.map(task => task.id === id ? { ...task, task: newTask, dueDate: newDueDate, category: newCategory } : task)
    );
      setTaskDetailModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Check if a task is due today
  const isDueToday = (dueDate) => {
    return isToday(new Date(dueDate));
  }

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

  // Check if a task is overdue, including the ones today
  const isOverdue = (dueDate) => {
    const now = new Date();
    const date = new Date(dueDate);
    return date < now;
  };

  // Group the tasks by date
  const groupTasksByDate = (tasks) => {
    const groupedTasks = {
      overdue: [],
      today: [],
      tomorrow: [],
      thisWeek: [],
      thisMonth: [],
      upcoming:[],
      ungrouped:[],
    };
  
    tasks.forEach(task => {
      if (task.dueDate === null) {
        groupedTasks.ungrouped.push(task);
      } else if (isOverdue(task.dueDate)) {
        groupedTasks.overdue.push(task);
      } else if (isDueToday(task.dueDate)) {
        groupedTasks.today.push(task);
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
  
    return [
      { title: 'Overdue', data: groupedTasks.overdue },
      { title: 'Today', data: groupedTasks.today},
      { title: 'Tomorrow', data: groupedTasks.tomorrow },
      { title: 'This Week', data: groupedTasks.thisWeek },
      { title: 'This Month', data: groupedTasks.thisMonth },
      { title: 'Upcoming', data: groupedTasks.upcoming },
      { title: 'Ungrouped', data: groupedTasks.ungrouped },
    ].filter(section => section.data.length > 0);
  };

  const filteredTasks = tasks.filter(task =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedTasks = groupTasksByDate(filteredTasks);

  const renderItem = ({ item }) => (
    <List.Item
    title = {item.task}
    description={`Due: ${item.dueDate ? new Date(item.dueDate).toDateString() : ""} ${item.dueDate ? new Date(item.dueDate).toLocaleTimeString() : ""}\n${item.category || 'No Category'}`}
    onPress = {() => handleTaskClick(item)}
    right = {() => (
      <IconButton icon ="delete"
      onPress={() => handleDeleteTask(item.id)}
      />
    )}
    style = {styles.listItem}
    />
  );

  return(
    <PaperProvider>
    
    <View style = {styles.container}>

      <List.Section>
        <List.Subheader style = {styles.headerText} >My Tasks</List.Subheader>
        <Searchbar
            placeholder="Search"
            onChangeText={handleSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
          
          <SectionList
          sections={groupedTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <List.Subheader style={title === 'Overdue' ? styles.overdueText : styles.subheaderText}>{title}</List.Subheader>
          )}
          contentContainerStyle={styles.sectionList}
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
  backgroundColor: '#F3E5F5'
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
  },
  overdueText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 5,
    color: 'red'
  },
  subheaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 5,
    color: 'purple'
  },
  section: {
    marginBottom: 20,
  },
  listItem: {
    backgroundColor: '#E1BEE7',  // White background for list items
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
  sectionList: {
    marginBottom: 20
  },
})

export default TodoList