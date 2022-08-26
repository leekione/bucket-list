import React,{useState} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images';
import Input from './Input';


const Container = styled.View`
    flex-direction:row;
    align-items:center;
    background-color:${({theme})=>theme.itemBackground};
    border-radius:10px;
    padding:5px;
    margin:3px 0;
`;

const Contents = styled.Text`
    flex:1;
    font-size:24px;
    color:${({theme,completed})=>(completed ? theme.done : theme.text)};
    text-decoration : ${({completed})=> completed ? 'line-through' : 'none'};
`;

const Task = ({task, deleteTask,toggleTask,updateTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.text);

    const _updateBtnPress= () => {
        setIsEditing(true);
    }
    const _onSubmitEditing = () => {
        if(isEditing) {
            const editedTask = Object.assign({}, task,{text});
            setIsEditing(false);
            updateTask(editedTask);
        }
    };

    const _onBlur = () => {
        if(isEditing){
            setIsEditing(false);
            setText(task.text);
        }
    }
    return isEditing ? (
        <Input
            value={text}
            onChangeText={text=> setText(text)}
            onSubmitEditing={_onSubmitEditing}
            onBlur={_onBlur}
            />
    
    ):(
        <Container>
            <IconButton 
                type={task.completed ? images.completed : images.uncompleted}
                id={task.id}
                onPressOut={toggleTask}
                completed={task.completed}
                               ></IconButton>
            <Contents completed={task.completed}>{task.text}</Contents>
            {task.completed || (<IconButton type={images.update} onPressOut={_updateBtnPress}/>)}
            <IconButton 
                type={images.delete} 
                id={task.id} 
                onPressOut={deleteTask}
                completed={task.completed}
                ></IconButton>
        </Container>
    )
}
Task.propTypes = {
    task:PropTypes.object.isRequired,
    deleteTask:PropTypes.func.isRequired,
    toggleTask:PropTypes.func.isRequired,
    updateTask:PropTypes.func.isRequired
}


export default Task;