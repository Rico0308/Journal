import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyCjEJEW1Ml0UmhpW0HZP5TSs96AsgGkreo",
//     authDomain: "app-frontend-6.firebaseapp.com",
//     projectId: "app-frontend-6",
//     storageBucket: "app-frontend-6.appspot.com",
//     messagingSenderId: "66843513700",
//     appId: "1:66843513700:web:ac800485c5370d3e30a071"
//   };

const firebaseConfig = {
    apiKey: "AIzaSyCCRC0a4HLgfllQ_uxsmfePW1xvqG4kK3Y",
    authDomain: "auth-27-05.firebaseapp.com",
    projectId: "auth-27-05",
    storageBucket: "auth-27-05.appspot.com",
    messagingSenderId: "153451184564",
    appId: "1:153451184564:web:7e48e7b80d84c12613b2e1"
};

  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}