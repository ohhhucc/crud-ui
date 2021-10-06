import React from 'react';
import { deleteUserActionCreator,
    editUserActionCreator,
    updateNameTextActionCreator,
    updateEmailTextActionCreator, 
    updateNumberTextActionCreator,  } from '../../store/storeReducer';
import Table from './Table';
import styles from '../../App.module.css';

export default function TableContainer(props) {

    const onDelete = (userId) => {
        let id = userId;
        let action = deleteUserActionCreator(id);
        props.dispatch(action)
    }
    
    const onEdit = (userId) => {
        let id = userId;
        let action = editUserActionCreator(id);
        props.dispatch(action)
    }
    
    const updateNameText = (event) => {
        let name = event.target.value;
        let action = updateNameTextActionCreator(name);
        props.dispatch(action);
    }
    
    const updateEmailText = (event) => {
        let email = event.target.value;
        let action = updateEmailTextActionCreator(email);
        props.dispatch(action);
    }
    
    const updateNumberText = (event) => {
        let number = event.target.value;
        let action = updateNumberTextActionCreator(number);
        props.dispatch(action);
    }

    let dataList = props.state.tablePage.users.map(user => {
        if(user._id !== undefined) {
            return (
                <tr key={user._id}>
                    {user.data.readOnly &&
                        <>
                            <th><input type="text" value={user.data.name} disabled={user.data.readOnly}/></th>
                            <th><input type="email" value={user.data.email} disabled={user.data.readOnly}/></th>
                            <th><input type="text" value={user.data.number} disabled={user.data.readOnly}/></th>
                        </>}
                    {!user.data.readOnly && 
                        <>
                            <th><input style={{ border: '1px solid grey' }} type="text" value={props.state.tablePage.name} disabled={user.data.readOnly} onChange={updateNameText}/></th>
                            <th><input style={{ border: '1px solid grey' }} type="email" value={props.state.tablePage.email} disabled={user.data.readOnly} onChange={updateEmailText}/></th>
                            <th><input style={{ border: '1px solid grey' }} type="text" value={props.state.tablePage.number} disabled={user.data.readOnly} onChange={updateNumberText}/></th>
                        </>}
                    <th><button className={styles.edit} onClick={() => onEdit(user._id)}>{user.data.button}</button></th>
                    <th><button className={styles.delete} onClick={() => onDelete(user._id)}>Delete</button></th>
                </tr>
            )
        }
        else {
            return (
                <tr key={'612e5d02ae66af078a517fb8'}>
                    {user.data.readOnly &&
                        <>
                            <th><input type="text" value={user.data.name} disabled={user.data.readOnly}/></th>
                            <th><input type="email" value={user.data.email} disabled={user.data.readOnly}/></th>
                            <th><input type="text" value={user.data.number} disabled={user.data.readOnly}/></th>
                        </>}
                    {!user.data.readOnly && 
                        <>
                            <th><input style={{ border: '1px solid grey' }} type="text" value={props.state.tablePage.name} disabled={user.data.readOnly} onChange={updateNameText}/></th>
                            <th><input style={{ border: '1px solid grey' }} type="email" value={props.state.tablePage.email} disabled={user.data.readOnly} onChange={updateEmailText}/></th>
                            <th><input style={{ border: '1px solid grey' }} type="text" value={props.state.tablePage.number} disabled={user.data.readOnly} onChange={updateNumberText}/></th>
                        </>}
                    <th><button className={styles.edit} onClick={() => onEdit(user._id)}>{user.data.button}</button></th>
                    <th><button className={styles.delete} onClick={() => onDelete(user._id)}>Delete</button></th>
                </tr>
            )
        }
    })

    return <Table state={props.state}
        dispatch={props.dispatch}
        dataList={dataList}></Table>
}