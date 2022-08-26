import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Dimensions } from 'react-native';


const Container = styled.View`
    flex-direction:row;
    flex:0.1;
    width:${({width})=> width-40}px;
    background-color:${({theme})=>theme.itemBackground};
    justify-content:center;
    align-items:center;
    border-radius:10px;
    padding:5px;
    margin:3px 0;
`;

const Contents = styled.Text`
    font-size:24px;
    color:${({theme})=> theme.text};
    text-align:center;

`;

const DeleteAllTask = ({deleteAllTask})=> {

    const width = Dimensions.get('window').width
    
    return (
        <Container width={width}>
            <TouchableOpacity onPressOut={deleteAllTask}>

            <Contents>완료항목 전체삭제</Contents>

            </TouchableOpacity>
        </Container>
    )
}

export default DeleteAllTask;