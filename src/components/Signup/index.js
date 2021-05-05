import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase';

import '../../App.css';
const Signup = (props) => {
    const firebase = useContext(FirebaseContext);
    const data = {
        pseudo:'',
        email:'',
        password:'',
        confirmPassword:''}
     
    const [LoginData, setLoginData] = useState(data);

    const [error, setError] = useState('');

    const handleChange = e => {
        setLoginData({ ...LoginData, [e.target.id]:e.target.value}) 
    }


    const handleSubmit = e => {
        e.preventDefault();
        const { email, password, pseudo } = LoginData;
        firebase.signupUser(email, password)
            .then(authUser => {
                return firebase.user(authUser.user.uid).set({
                    pseudo,
                    email
                })
            })
            .then(user => {
                setLoginData({ ...data });

                    //la rediirection 

                props.history.push('/welcome');

            })
            .catch(error => {
                setError(error);
                setLoginData({ ...data });
            })
    }
    const btn = LoginData.pseudo === '' || LoginData.email === '' || LoginData.password !== LoginData.confirmPassword
        ? <button disabled> Inscription</button> : <button > Inscription</button>




    /////gestion des erreur
    const errorMsg = error !== '' && <span> {error.message}</span>;





    return (

        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup">
                </div>

                <div className="formBoxRight">

                    <div className="formContent">
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit }>
                        


                            <div className="inputBox">
                                <input onChange={handleChange} value={LoginData.pseudo} type="text"  id="pseudo"  autoComplete="off"  required />
                                <label htmlFor="pseudo">Pseudo </label>
                            </div>

                            <div className="inputBox">
                                <input onChange={handleChange} value={LoginData.email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email </label>
                            </div>


                            <div className="inputBox">
                                <input onChange={handleChange} value={LoginData.password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password ">Mot de Passe </label>
                            </div>


                            <div className="inputBox">
                                <input onChange={handleChange} value={LoginData.confirmPassword} type="password" id="confirmPassword" autoComplete="off" required />
                                <label htmlFor="confirmPassword "> Confirmer le mot de Passe </label>
                            </div>

                            {btn}

                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login"> Deja inscrit ? coonctez-vous</Link>

                        </div>

                    </div>
                </div>


            </div>
        </div>


    );
}

export default Signup;
