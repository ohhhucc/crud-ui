import React from 'react';
import styles from '../../App.module.css';
import { NavLink } from 'react-router-dom';
import { addUserActionCreator, 
        updateNameTextActionCreator, 
        updateEmailTextActionCreator, 
        updateNumberTextActionCreator, 
        cancelActionCreator, } from '../../store/storeReducer';

export default function AddData(props) {

    let addUser = () => {
        let action = addUserActionCreator();
        props.dispatch(action);
    }

    let cancel = () => {
        let action = cancelActionCreator();
        props.dispatch(action);
    }

    let updateNameText = (event) => {
        let name = event.target.value;
        let action = updateNameTextActionCreator(name);
        props.dispatch(action);
    }

    let updateEmailText = (event) => {
        let email = event.target.value;
        let action = updateEmailTextActionCreator(email);
        props.dispatch(action);
    }

    let updateNumberText = (event) => {
        let number = event.target.value;
        let action = updateNumberTextActionCreator(number);
        props.dispatch(action);
    }

    return (
        <div className={styles.form_container}>
            <form className={styles.form}>
                <label htmlFor='name'>Name</label>
                <input id='name' type="text" value={props.state.tablePage.name} onChange={updateNameText}/>
                <label htmlFor='email'>Email</label>
                <input id='email' type="email" value={props.state.tablePage.email} onChange={updateEmailText}></input>
                <label htmlFor='number'>Number</label>
                <input id='number' type="text" value={props.state.tablePage.number} onChange={updateNumberText}></input>
                <div className={styles.buttonsGroup}>
                    <NavLink onClick={addUser} to='/table' className={styles.submit}>Save</NavLink>
                    <NavLink onClick={cancel} to='/table' className={styles.cancel}>Cancel</NavLink>
                </div>
            </form>
        </div>
    )
}