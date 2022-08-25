import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

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
    color:${({theme})=> theme.text};
`;

const DeleteAllTask = ({task,deleteAllTask,onPressOut,completed})=> {

    
    return (
        <Container>
            <TouchableOpacity onPressOut={deleteAllTask}>
                
            <Contents>전체항목 삭제</Contents>

            </TouchableOpacity>
        </Container>
    )
}

export default DeleteAllTask;