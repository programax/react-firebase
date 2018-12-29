import React from 'react';
import moment from 'moment';
import Layout from '../../components/layout';
import Expense from '../expense';
import styles from './style.module.scss';
import { ExpenseContext } from '../../context/expenses';

class Page extends React.Component {
    state = {
        isOpen: false,
        expenseId: null,
    }

    render() {
        const {
            isOpen,
            expenseId,
        } = this.state;
        const {
            expenses,
        } = this.context;
        const expense = expenses.find(n => n.id === expenseId);

        return (
            <Layout>
                <div className={styles.container}>
                    <div
                        className={styles.buttonFloat}
                        onClick={() => this.setState({ expenseId: null, isOpen: true })}
                    >
                        +
                    </div>

                    <table className={styles.table} cellSpacing="0">
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {expenses.map(row => {
                            return (
                                <tr
                                    key={row.id}
                                    className={styles.tableRow}
                                    onClick={() => this.setState({ expenseId: row.id, isOpen: true })}
                                >
                                    <td>{moment(row.date).format('DD MMM YYYY hh:mm a')}</td>
                                    <td>{row.type}</td>
                                    <td>{row.amount}</td>
                                    <td>{row.description}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>

                    {isOpen &&
                        <Expense
                            expense={expense}
                            onClose={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </Layout>
        );
    }
}

Page.contextType = ExpenseContext;

export default Page;