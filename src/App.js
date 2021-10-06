import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import styles from './App.module.css';
import TableContainer from './components/Table/TableContainer';
import AddData from './components/AddData/AddData';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
            <div className={styles.outer}>
            <div className={styles.app}>
                <div className={styles.header}>
                  <h1>CRUD</h1>
                  <NavLink to='/table' className={styles.start}>Update</NavLink>
                </div>
                <Route path='/data' render={() => <AddData state={this.props.state} dispatch={this.props.dispatch}></AddData>}></Route>
                <Route path='/table' render={() => <TableContainer state={this.props.state} dispatch={this.props.dispatch}></TableContainer>}></Route>
            </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
