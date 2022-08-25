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

  const _addTask = () =>{
    alert('작성완료');
    setNewTask('');
  };

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
          <Task text= "test1"/>
          <Task text= "test2"/>
          <Task text= "test3"/>
          <Task text= "test4"/>
        </List>
    </Container>
    </ThemeProvider>
  );
}


