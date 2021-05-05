import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyCIScz1jLEd0Ec3QvqnC9GWV6hm6eB8MNs",
    authDomain: "web-site-react.firebaseapp.com",
    projectId: "web-site-react",
    storageBucket: "web-site-react.appspot.com",
    messagingSenderId: "218513749353",
    appId: "1:218513749353:web:fd8cf17f8d8b7b26f179f8"
};


class Firebase {


    constructor() {

        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    //inscription

    signupUser = (email, password) => 

        this.auth.createUserWithEmailAndPassword(email, password)


    //Connexion

    loginUser = (email, password) =>

        this.auth.signInWithEmailAndPassword(email, password)


    //Déconnexion

    signoutUser = () =>

        this.auth.signOut()


        //Récuperer le mot de passe  
    passwordReset = email => 

        this.auth.sendPasswordResetEmail(email)

    // base dedonnées
    user = uid =>  this.db.doc(`user/${uid}`);

}

export default Firebase;