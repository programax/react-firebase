import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import TextField from '../../components/textField';
import Button from '../../components/button';
import Select from '../../components/select';
import FormControl from '../../components/formControl';
import styles from './style.module.scss';
import { ExpenseContext } from '../../context/expenses';

const formSchema = yup.object().shape({
    type: yup.string().min(1).required(),
    amount: yup.number().required(),
    description: yup.string(),
});

class Page extends React.Component {
    state = {
        expense: this.props.expense,
        showReload: false,
    }

    componentWillReceiveProps(newProps) {
        const {
            expense: oldExpense,
        } = this.state;
        const {
            expense: newExpense
        } = newProps;

        if (
            newExpense && oldExpense && (
                newExpense.type !== oldExpense.type ||
                newExpense.amount !== oldExpense.amount ||
                newExpense.description !== oldExpense.description
            )
        ) {
            this.setState({
                expense: newExpense,
                showReload: true,
            });
        }
    }

    onSubmit = async (values, { setSubmitting }) => {
        const {
            expense,
        } = this.state;

        if (expense) {
            await this.context.updateExpense(expense.id, values);
        } else {
            await this.context.createExpense(values);
        }

        setSubmitting(false);
        this.props.onClose();
    }

    onDelete = async () => {
        const { expense } = this.state;

        await this.context.deleteExpense(expense.id);
        this.props.onClose();
    }

    onCancel = () => {
        this.props.onClose();
    }

    render() {
        const {
            expense,
            showReload,
        } = this.state;
        const resource = expense || {};

        const node = (
            <div className={styles.modalContainer}>
                <div className={styles.modalBox}>
                    <h1>Expenses</h1>

                    <Formik
                        initialValues={{
                            type: resource.type || '',
                            amount: resource.amount || '',
                            description: resource.description || '',
                        }}
                        validationSchema={formSchema}
                        onSubmit={this.onSubmit}
                        render={props => {
                            const {
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                handleReset,
                                values,
                                isValid,
                                isSubmitting,
                            } = props;

                            return (
                                <React.Fragment>
                                    <FormControl type="row">
                                        <Select
                                            value={values.type}
                                            onChange={handleChange('type')}
                                            onBlur={handleBlur('type')}
                                            placeholder="Type"
                                            options={[
                                                {
                                                    value: 'house',
                                                    label: 'House',
                                                },
                                                {
                                                    value: 'savings',
                                                    label: 'Savings',
                                                },
                                                {
                                                    value: 'transportation',
                                                    label: 'Transportation',
                                                },
                                            ]}
                                        />

                                        <ErrorMessage name="type" />
                                    </FormControl>

                                    <FormControl type="row">
                                        <TextField
                                            value={values.amount}
                                            onChange={handleChange('amount')}
                                            onBlur={handleBlur('amount')}
                                            placeholder="Amount"
                                        />

                                        <ErrorMessage name="amount" />
                                    </FormControl>

                                    <FormControl type="block">
                                        <TextField
                                            value={values.description}
                                            onChange={handleChange('description')}
                                            onBlur={handleBlur('description')}
                                            placeholder="Description"
                                        />

                                        <ErrorMessage name="description" />
                                    </FormControl>

                                    <FormControl type="block">
                                        <Button
                                            label={expense ? 'Update' : 'Create'}
                                            disabled={isSubmitting || !isValid}
                                            onClick={handleSubmit}
                                        />

                                        <Button
                                            label="Cancel"
                                            type="outline"
                                            onClick={this.onCancel}
                                        />

                                        {expense &&
                                            <Button
                                                label="Delete"
                                                type="warning"
                                                onClick={this.onDelete}
                                            />
                                        }
                                    </FormControl>

                                    {showReload && !isSubmitting &&
                                        <FormControl type="row">
                                            <div>
                                                This resource has been updated.
                                                <Button
                                                    label="Click here"
                                                    type="inline"
                                                    onClick={() => {
                                                        handleReset();
                                                        this.setState({ showReload: false });
                                                    }}
                                                />
                                                to refresh.
                                            </div>
                                        </FormControl>
                                    }
                                </React.Fragment>
                            );
                        }}
                    />
                </div>
            </div>
        );

        return ReactDOM.createPortal(node, document.getElementById('modal-root'));
    }
}

Page.contextType = ExpenseContext;

export default Page;
