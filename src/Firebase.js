import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDWSjBB-0eGNfqcdnsS-kJMSLM1dw6KGuI",
    authDomain: "fir-fd6b4.firebaseapp.com",
    projectId: "fir-fd6b4",
    storageBucket: "fir-fd6b4.appspot.com",
    messagingSenderId: "233206037052",
    appId: "1:233206037052:web:46a7fbaaa6b02907172139",
    measurementId: "G-XQBZMPS9BF"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"})

export const auth = firebase.auth();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const db = firebase.firestore()