import React from 'react';
import '../../App.css';

import ERROR from "../../images/ERROR1.jpg";

const centerH2 = {

    textAlign: "center",
    marginTop: '50px'
}

const centerImg = {
    display: "block",
    marginTop: "40px auto",
    
}

const ErrorPage = () => {
    return (

        

        <div className="quiz-bg">
            <div className="container">
                <h2 style={ centerH2}>Oups, cette page n'existe pas!, :(</h2>
                <img src={ERROR} style={centerImg }  alt="error page"></img>

            </div>
        </div>


    );
}

export default ErrorPage;
