import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import GuardRoute from './components/guardRoute';
import Root from './components/root';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Reports from './pages/reports';
import { AuthContextProvider } from './context/auth';
import { ExpenseContextProvider } from './context/expenses';
import 'react-vis/dist/style.css';
import './style.scss';

const root = (
    <BrowserRouter>
        <AuthContextProvider>
            <ExpenseContextProvider>
                <Root>
                    <Switch>
                        <GuardRoute type="public" path="/login" component={Login} />
                        <GuardRoute type="private" path="/dashboard" component={Dashboard} />
                        <GuardRoute type="private" path="/reports" component={Reports} />
                        <Redirect from="/" to="/dashboard" />
                    </Switch>
                </Root>
            </ExpenseContextProvider>
        </AuthContextProvider>
    </BrowserRouter>
);

ReactDOM.render(root, document.getElementById('root'));