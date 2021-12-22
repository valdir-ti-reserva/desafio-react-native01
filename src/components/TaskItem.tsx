import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Task } from "./TasksList";

import trashIcon from '../assets/icons/trash/trash.png'

interface ITaskItemProps {
    item: Task
    handleDone: (id: number) => void
    handleRemove: (item: Task) => void
    handleEditTask: (id: number, title: string) => void
}

export function TaskItem({item, handleDone, handleRemove, handleEditTask}: ITaskItemProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [titleEdit, setTitleEdit] = useState('')

    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing(){
        setIsEditing(true)
    }
    
    function handleCancelEditing(){
        setIsEditing(false)
    }

    function handleSubmitEditing(){
        if(!item)
            return

        handleEditTask(item.id, titleEdit)
        setTitleEdit('')
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])

    return (
        <>
            <View>
              <TouchableOpacity
                testID={`button-${item.id}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => handleDone(item.id)}
                >
                <View 
                  testID={`marker-${item.id}`}
                  style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                  >
                  { item.done && (
                      <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                      />
                      )}
                </View>
                {isEditing ? 
                    <TextInput 
                        ref={textInputRef}
                        style={ item.done ? styles.taskTextDone : styles.taskText}
                        value={titleEdit}
                        editable={isEditing}
                        onChangeText={setTitleEdit}
                        onSubmitEditing={handleSubmitEditing} /> 
                    :
                    <Text style={item.done ? styles.taskTextDone : styles.taskText}>
                        {item.title}
                    </Text>
                }
              </TouchableOpacity>
            </View>

            <View style={ styles.iconsContainer } >
                { isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                    >
                       <Icon name="edit" size={18} color="#b2b2b2" style={styles.iconEdit} />
                    </TouchableOpacity>
                ) }

                <View 
                    style={ styles.iconsDivider }
                />

                <TouchableOpacity
                    disabled={isEditing}
                    onPress={() => handleRemove(item)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>   
        </>
    )
} 

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    iconsDivider: {
        borderWidth: 0.5,
        borderColor:'#b2b2b2',
        margin:2,
    },
    iconEdit: {
        marginVertical: 2
    }
  })