import React from 'react';
import { startUi } from '../../services/firebase';

class Page extends React.Component {
    componentDidMount() {
        startUi('#firebaseui-auth-container');
    }

    render() {
        return <div id="firebaseui-auth-container"></div>;
    }
}

export default Page;