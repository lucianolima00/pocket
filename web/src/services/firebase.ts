import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDiQ82QuDEtUuyss85YhabA0KJ2C5v5xEY",
    authDomain: "pocket-eed70.firebaseapp.com",
    projectId: "pocket-eed70",
    storageBucket: "pocket-eed70.appspot.com",
    messagingSenderId: "175237678471",
    appId: "1:175237678471:web:8c2303c50b66cbd3f53f22",
    measurementId: "G-4KMJVM1FZZ"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();