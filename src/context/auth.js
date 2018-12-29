import React from 'react';
import { watchUserChanges } from '../services/firebase';

export const AuthContext = React.createContext({});

export const AuthContextConsumer = AuthContext.Consumer;

export class AuthContextProvider extends React.Component {
    state = {
        isLoggedIn: false,
        authReady: false,
        user: null,
    }

    componentDidMount() {
        this.userWatcherUnsub = watchUserChanges((user) => {
            if (user) {
                this.setState({
                    authReady: true,
                    isLoggedIn: true,
                    user,
                });
            } else {
                this.setState({
                    authReady: true,
                    isLoggedIn: false,
                    user: null,
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.userWatcherUnsub) {
            this.userWatcherUnsub();
        }
    }

    render() {
        const {
            children,
        } = this.props;

        return (
            <AuthContext.Provider
                value={{
                    ...this.state,
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }
}
