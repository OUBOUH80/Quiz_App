import React, { useState,useEffect ,useContext} from 'react';
import {FirebaseContext} from '../Firebase';
import '../../App.css';
import ReactToolTip from 'react-tooltip';

const Lougout = () => {

    const firebase = useContext(FirebaseContext);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (checked) {

            //signoutUser
            firebase.signoutUser();

        }
    }, [checked, firebase]);



    const handleChange = e => {

        setChecked(  e.target.checked)
    }
    return (
        <div className="logoutContainer">
            <label className="switch">
        
                <input onChange={ handleChange}type="checkbox" checked={checked} />
                <span className="slider round" data-tip="Deconnexion" ></span>
            </label>
            <ReactToolTip place="left" effect="solid"/>
        </div>
       


    );
}

export default Lougout;
