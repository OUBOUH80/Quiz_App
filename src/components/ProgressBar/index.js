import React, { Fragment}from 'react';
import '../../App.css';
const ProgressBar = ({ idQuestion, maxQuestions }) => {
    const acualQuestion = idQuestion + 1;

    const getWidth = (totalquestion, idquestion) => {
        return (100 / totalquestion) * idquestion;

    }
    const progressPercent = getWidth(maxQuestions, acualQuestion);

    return (

        <Fragment>
        <div className="percentage">
                <div className="progressPercent"> {`Question:${acualQuestion}/${maxQuestions}`}</div>
                <div className="progressPercent">{`Progression:${progressPercent}%`}</div>
            </div>
            <div className="progressBar">

                <div className="progressBarChange" style={{ width:`${progressPercent}%`}}></div>
            </div>

            
        </Fragment>

    
    )
}

export default ProgressBar;
