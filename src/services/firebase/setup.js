import firebase from 'firebase';
import firebaseui from 'firebaseui';
import config from '../../config';

const firebaseConfig = {
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
};

const uiConfig = {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
};

firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true,
});

export const startUi = (elementId) => {
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start(elementId, uiConfig);
};
