import axios from 'axios';
import { ADD_USER, 
    DELETE_USER, 
    EDIT_USER, 
    CANCEL, 
    FETCH_DATA, 
    UPDATE_NAME_TEXT, 
    UPDATE_EMAIL_TEXT, 
    UPDATE_NUMBER_TEXT, } from './actions';

let initialState = {
    users: [],
    name: '',
    email: '',
    number: '',
}



const url = 'http://178.128.196.163:3000';

const storeReducer = (state = initialState, action) => {   

    let fetchData = async() => {
        try {
            await axios
                .get(`${url}/api/records`)
                .then((response) => {
                    let newData = [];
                    let newIds = [];
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].hasOwnProperty('data')) {
                            if (response.data[i].data.hasOwnProperty('name') &&
                                response.data[i].data.hasOwnProperty('email') &&
                                response.data[i].data.hasOwnProperty('number') &&
                                response.data[i].data.hasOwnProperty('button') &&
                                response.data[i].data.hasOwnProperty('readOnly')) {
                                    newData = [...newData, response.data[i]]
                            }
                        }
                    }
                    console.log('update state');
                    state.users = newData;
                    state.ids = newIds;
            });
        } 
        catch (e) {
            console.log(e);
        }
    }

    let deleteData = async(id) => {
        try {
            await axios
                .delete(`${url}/api/records/${id}`)
                .then(() => {
                    fetchData();
                })
        } 
        catch (e) {
            console.log(e);
        }
    }

    let addData = async(newUser) => {
        try {
            await axios
                .put(`${url}/api/records`, {
                data: newUser,
                })
                .then(() => {
                    fetchData();
                })
        } 
        catch (e) {
            console.log(e);
        }
    }

    let editData = async(id, data) => {
        try {
            await axios
                .post(`${url}/api/records/${id}`, {data})
                .then(() => {
                    fetchData();
                })
        } 
        catch (e) {
            console.log(e);
        }
    }

    switch(action.type) {
        case ADD_USER:
            if(state.name !== '' && state.email !== '' && state.number !== '') {
                let newUser = {
                    name: state.name,
                    email: state.email,
                    number: state.number,
                    button: 'Edit',
                    readOnly: true,
                }
                addData(newUser);
                state.users = [...state.users, { data: newUser }];
                console.log(state);
                state.name = '';
                state.email = '';
                state.number = '';
                return state;
            }
            else {
                alert('Error, empty data!')
            }
        case DELETE_USER:
            console.log(action.id);
            deleteData(action.id);
            state.users = state.users.filter(x => x._id !== action.id);
            return state;
        case EDIT_USER:
            for(let i = 0; i < state.users.length; i++) {
                if(state.users[i]._id === action.id) {
                    if(state.users[i].data.readOnly === true) {
                        state.users[i].data.readOnly = false;
                        state.users[i].data.button = 'Save';
                        state.name = state.users[i].data.name;
                        state.email = state.users[i].data.email;
                        state.number = state.users[i].data.number;
                    }
                    else {
                        state.users[i].data.readOnly = true;
                        state.users[i].data.button = 'Edit';
                        if (state.name !== '') {state.users[i].data.name = state.name};
                        if (state.email !== '') {state.users[i].data.email = state.email};
                        if (state.number !== '') {state.users[i].data.number = state.number};
                        let newData = {
                            name: state.name,
                            email: state.email,
                            number: state.number,
                            button: 'Edit',
                            readOnly: true
                        }
                        editData(action.id, newData);
                        state.name = '';
                        state.email = '';
                        state.number = '';
                    }
                }
            }
            return state;
        case FETCH_DATA:
            fetchData();
            return state;
        case CANCEL:
            state.name = '';
            state.email = '';
            state.number = '';
            return state;
        case UPDATE_NAME_TEXT:
            state.name = action.name;
            return state;
        case UPDATE_EMAIL_TEXT:
            state.email = action.email;
            return state;
        case UPDATE_NUMBER_TEXT:
            state.number = action.number;
            return state;
        default:
            return state;
    }
}

export const addUserActionCreator = () => {
    return {type: ADD_USER}
}

export const deleteUserActionCreator = (id) => {
    return {type: DELETE_USER, id: id}
}

export const editUserActionCreator = (id) => {
    return {type: EDIT_USER, id: id}
}

export const fetchDataActionCreator = () => {
    return {type: FETCH_DATA}
}

export const cancelActionCreator = () => {
    return {type: CANCEL};
}

export const updateNameTextActionCreator = (name) => {
    return {type: UPDATE_NAME_TEXT, name: name}
}

export const updateEmailTextActionCreator = (email) => {
    return {type: UPDATE_EMAIL_TEXT, email: email}
}

export const updateNumberTextActionCreator = (number) => {
    return {type: UPDATE_NUMBER_TEXT, number: number}
}

export default storeReducer;