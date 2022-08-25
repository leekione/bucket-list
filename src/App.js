import React, {useState} from 'react';
import styled ,{ThemeProvider} from 'styled-components/native';
import {theme} from './theme'
import {StatusBar,Dimensions} from 'react-native';
import Input from './components/Input'
import IconButton from './components/IconButton';
import { images } from './images';
import Task from './components/Task';

const Container = styled.View`
  flex:1;
  background-color:${({theme})=>theme.background};
  justify-content:flex-start;
  align-items:center;

`;

const Title = styled.Text`
  width:${({width})=> width - 40}px;
  font-size: 40px;
  font-weight:600;
  border-radius:10px;
  text-align:center;
  background-color:${({theme})=>theme.itemBackground};
  color:${({theme})=>theme.text};
  margin:0 20px;
`;

const List = styled.ScrollView`
  flex:1;
  width:${({width})=> width-40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width;
  const [newTask,setNewTask] = useState('');
  const [tasks,setTasks] = useState({})
    // '1':{id:'1',text:'test1',completed:false},
    // '2':{id:'2',text:'test2',completed:false},
    // '3':{id:'3',text:'test3',completed:false},
    // '4':{id:'4',text:'test4',completed:false},


  //추가
  const _addTask = () =>{
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID] : {id:ID,text:newTask,completed:false}
    }
    setNewTask('');
    setTasks({...tasks,...newTaskObject});
  };
  //삭제
  const _deleteTask = id => {
    const currentTasks = {...tasks};
    delete currentTasks[id];
    setTasks(currentTasks);
  }


  const _handleTextChange = text => {
    setNewTask(text);
  };

  return (
    <ThemeProvider theme ={theme}>
    <Container>
      <StatusBar
        barStyle='light-content'
        backgroundColor={theme.background}
      />
      <Title width={width}>버킷 리스트</Title>
      <Input 
        placeholder =" +항목추가"
        value={newTask}
        onChangeText={_handleTextChange}
        onSubmitEditing={_addTask}
        />
        <List width={width}>
          {Object.values(tasks)
                 .reverse()
                 .map(task => (
                  <Task key = {task.id} text={text} deleteTask={_deleteTask}/>
                 ))}
        </List>
    </Container>
    </ThemeProvider>
  );
}


