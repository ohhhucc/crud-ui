import React, { Component } from 'react';
import styles from '../../App.module.css';
import { NavLink } from 'react-router-dom';
import { fetchDataActionCreator } from '../../store/storeReducer';

export default class Table extends Component {
    componentWillMount() {
        this.props.dispatch(fetchDataActionCreator());
    }
    render() {
        return (
            <>
                <NavLink to='/data' className={styles.newEntryButton}>Add Data</NavLink>
                <table className={styles.table}> 
                    <thead className={styles.thead}>
                        <tr>
                            <th style={{ width: '30%' }}>Name</th>
                            <th style={{ width: '30%' }}>Email</th>
                            <th style={{ width: '30%' }}>Number</th>
                            <th style={{ width: '5%' }}></th>
                            <th style={{ width: '5%' }}></th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {this.props.dataList}
                        {this.props.state.tablePage.users.length === 0 && 
                        <tr>
                            <th colSpan='5'>
                                <p>No Data</p>
                            </th>
                        </tr>}
                    </tbody>
                </table>
            </>
        );
    }        
}