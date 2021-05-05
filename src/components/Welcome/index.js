import React, { useState, Fragment,useContext,useEffect } from 'react';
import { FirebaseContext } from '../Firebase';
import Logout from '../Logout';
import Quiz from '../Quiz';
import '../../App.css';
const Welcome = (porps) => {

    const firebase=useContext(FirebaseContext)
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});


    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : porps.history.push('/');
           
        })

        if (!!userSession) {
            firebase.user(userSession.uid)
                .get()
                .then(doc => {

                    if (doc && doc.exists) {
                        const myData = doc.data()
                        setUserData(myData)
                    }
                })
                .catch(error => {

                })
        }
        


        return () => {
            listener();
        };

    }, [userSession, firebase])

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
        </Fragment>
    ) : (
            <div className="quiz-bg">
                <div className="container">
                    <Logout />
                    <Quiz userData={userData}/>

                </div>
            </div>
            
            )
        













    
        
        
       

   
}

export default Welcome;
