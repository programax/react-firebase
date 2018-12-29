import React from 'react';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import {
    XYPlot,
    DiscreteColorLegend,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    VerticalBarSeries,
} from 'react-vis';
import Layout from '../../components/layout';
import styles from './style.module.scss';
import { ExpenseContext } from '../../context/expenses';

function getDefaultDays() {
    const start = moment().startOf('day');
    const mask = 'DD MMM, YYYY';

    return {
        [start.format(mask)]: { total: 0, timestamp: start.valueOf() },
        [start.add(1, 'day').format(mask)]: { total: 0, timestamp: start.valueOf() },
        [start.add(1, 'day').format(mask)]: { total: 0, timestamp: start.valueOf() },
        [start.add(1, 'day').format(mask)]: { total: 0, timestamp: start.valueOf() },
        [start.add(1, 'day').format(mask)]: { total: 0, timestamp: start.valueOf() },
    };
}

function formatExpenses(expenses) {
    const config = {
        savings: {
            color: '#f00',
            title: 'Savings',
            strokeWidth: 10,
        },
        transportation: {
            color: '#0f0',
            title: 'Transportation',
            strokeWidth: 10,
        },
        house: {
            color: '#00f',
            title: 'House',
            strokeWidth: 10,
        },
    };
    const expensesByType = groupBy(expenses, n => n.type);

    return Object.entries(expensesByType).map(([key, arr]) => {
        const totals = arr.reduce((result, expense) => {
            const date = moment(expense.date).startOf('day');
            const key = date.format('DD MMM, YYYY');

            if (!result[key]) {
                result[key] = { total: 0, timestamp: date.valueOf() };
            }

            result[key].total += expense.amount;

            return result;
        }, getDefaultDays());

        let data = Object.entries(totals).map(([key, data]) => ({
            x: key,
            y: data.total,
            timestamp: data.timestamp,
        }));

        data.sort((a, b) => {
            if (a.timestamp > b.timestamp) return 1;
            if (a.timestamp < b.timestamp) return -1;
            return 0;
        });

        return {
            ...config[key],
            type: key,
            data,
        };
    });
}

class Page extends React.Component {
    render() {
        const { expenses } = this.context;
        const groups = formatExpenses(expenses);

        return (
            <Layout>
                <div className={styles.container}>
                    <div>
                        <DiscreteColorLegend
                            className={styles.legends}
                            orientation="horizontal"
                            items={groups.map(n => ({
                                title: n.title,
                                strokeWidth: n.strokeWidth,
                                color: n.color,
                            }))}
                        />
                        <XYPlot
                            className={styles.xyPlot}
                            xType="ordinal"
                            stackBy="y"
                            width={window.innerWidth * .8}
                            height={500 > window.innerHeight ? window.innerHeight : 500}
                        >
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis />
                            <YAxis />
                            {groups.map(group =>
                                <VerticalBarSeries
                                    key={group.title}
                                    color={group.color}
                                    data={group.data}
                                />
                            )}
                        </XYPlot>
                    </div>
                </div>
            </Layout>
        );
    }
}

Page.contextType = ExpenseContext;

export default Page;