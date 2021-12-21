import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TodoInput } from '../components/TodoInput';
import { Task, TasksList } from '../components/TasksList';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(!newTaskTitle)
      return
    
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldTasks => [...oldTasks, newTask])
  }
  
  function handleToggleTaskDone(id: number) {
    if(!id)
      return

    const updatedTasks = tasks.map(task => ({...task}))

    const taskFiltered = updatedTasks.find(item => item.id === id)

    if(!taskFiltered)
      return

    taskFiltered.done = !taskFiltered.done

    setTasks(updatedTasks)
    
  }
  
  function handleRemoveTask(id: number) {
    if(!id)
      return

    setTasks(oldTasks => oldTasks.filter(
      task => task.id !== id
    ))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})