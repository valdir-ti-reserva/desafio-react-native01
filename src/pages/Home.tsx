import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TodoInput } from '../components/TodoInput';
import { Task, TasksList } from '../components/TasksList';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(!newTaskTitle)
      return

    const taskFinded = tasks.find(task => task.title === newTaskTitle)

    if(taskFinded){
      Alert.alert('Atenção', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }
    
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
  
  function handleRemoveTask(item: Task) {
    if(!item)
      return

    Alert.alert('Remover item', `Tem certeza que você deseja remover o item: ${item.title}?`, [
      {
        text: "Não",
        onPress: () => {},
      },
      { text: "Sim", onPress: () => setTasks(oldTasks => oldTasks.filter(
        task => task.id !== item.id
      )) }
    ])

    return
  }

  function handleEditTask(id: number, taskNewTitle: string){
    if(!id)
      return

    const updatedTasks = tasks.map(task => ({...task}))

    const taskFinded = updatedTasks.find(task => task.id === id)

    if(!taskFinded)
      return

    taskFinded.title = taskNewTitle

    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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