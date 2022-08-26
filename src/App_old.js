import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme'
import { StatusBar, Dimensions } from 'react-native';
import Input from './components/Input'
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import DeleteAllTask from './components/DeleteAll';

const Container = styled.View`
    flex:1;
    background-color:${({ theme }) => theme.background};
    justify-content:flex-start;
    align-items:center;

    `;

const Title = styled.Text`
    width:${({ width }) => width - 40}px;
    font-size: 40px;
    font-weight:600;
    border-radius:10px;
    text-align:center;
    background-color:${({ theme }) => theme.itemBackground};
    color:${({ theme }) => theme.text};
    margin:0 20px;
    `;

const List = styled.ScrollView`
    flex:1;
    width:${({ width }) => width - 40}px;
    `;

export default function App() {
    const width = Dimensions.get('window').width;

    const [isReady, setIsReady] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({})

    //저장
    const _saveTasks = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
            setTasks(value);
        } catch (e) {
            console.error(e);
        }
    }

    //불러오기
    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            const tasks = jsonValue != null ? JSON.parse(jsonValue) : {};
            setTasks(tasks);
          } catch(e) {
            console.log('데이터 가져오기:'+jsonValue);
          }
        }

    //추가
    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };
        _saveTasks('tasks',{ ...tasks, ...newTaskObject });
        setNewTask('');
    };
    //삭제
    const _deleteTask = id => {
        const currentTasks = { ...tasks };
        delete currentTasks[id];
        _saveTasks('tasks',currentTasks);
    }

    //완료
    const _toggleTask = id => {
        const currentTasks = { ...tasks };
        currentTasks[id]['completed'] = !currentTasks[id]['completed'];
        _saveTasks('tasks',currentTasks);
    }

    //수정
    const _updateTask = task => {
        const currentTasks = {...tasks};
        currentTasks[task.id] = task;
        _saveTasks('tasks',currentTasks);
    }

    //전체 삭제
    const _deleteAllTask = () => {
        console.log('삭제');
        // alert('삭제');
        
        const currentTasks = {...tasks};    
        const newCurrentTasks = new Map(Object.entries(currentTasks));
        console.log(newCurrentTasks)
        newCurrentTasks.forEach((value,key)=> {
            if(value.completed){
                delete currentTasks[key];
                setTasks(currentTasks);
            }
        });
    }

    const _onBlur = () => {
        setNewTask('');
    }

    const _handleTextChange = text => {
        setNewTask(text);
    };

    return !isReady ? (

        <AppLoading
        startAsync={() =>{getData('tasks')}}
        onFinish={() => setIsReady(true)}
        onError={console.error}
    />
    ):(
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor={theme.background}
                />
                <Title width={width}>버킷 리스트</Title>
                <Input
                    placeholder=" +항목추가"
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                    onBlur={_onBlur}
                />
                <List width={width}>
                    {Object.values(tasks)
                        .reverse()
                        .map(task => (
                            <Task
                                key={task.id}
                                task={task}
                                deleteTask={_deleteTask}
                                toggleTask={_toggleTask}
                                updateTask={_updateTask}
                            />
                        ))}
                </List>
                <DeleteAllTask
                    deleteAllTask={_deleteAllTask}
                >
                </DeleteAllTask>
            </Container>
        </ThemeProvider>
    );
}


