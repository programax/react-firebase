import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

class GuardRoute extends React.Component {
    render() {
        const {
            type,
            history,
            ...rest
        } = this.props;
        const {
            isLoggedIn,
        } = this.context;

        if (type === 'private' && !isLoggedIn) {
            return <Redirect to="/login" />;
        } else if (type === 'public' && isLoggedIn) {
            return <Redirect to="/dashboard" />;
        }

        return <Route {...rest} />;
    };
}

GuardRoute.contextType = AuthContext;

export default GuardRoute;
