import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store';
import './index.css';

export const reRenderEntireTree = (state) => {
    ReactDOM.render(<App state={state} dispatch={store.dispatch.bind(store)}/>, document.getElementById('root'));
}

reRenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    reRenderEntireTree(state);
});


