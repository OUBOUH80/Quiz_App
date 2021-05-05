import React, { Fragment,useEffect,useState} from 'react';
import '../../App.css';



const QuizOver = React.forwardRef(({ levlNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions}, ref) => {

    const [asked, setAsked] = useState([])

    useEffect(() => {
        setAsked(ref.current)

    }, [ref])


    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        setTimeout(() => loadLevelQuestions(quizLevel),3000)
    }

    const decision = score >= averageGrade ?
        (
            <Fragment>
                <div className="stepsBtnContainer">
                {
                    quizLevel < levlNames.length ?
                        (
                            <Fragment>
                                    <p className="successMsg">Super,passez au niveau suivant</p>
                                    <button className="btnResult success" onClick={() => loadLevelQuestions(quizLevel)}>Niveau suivant </button>
                            </Fragment> )
                        : (
                            <Fragment>
                                <p className="successMsg">Super, vous etes un exper</p>
                                    <button className="btnResult gameOver" onClick={() => loadLevelQuestions(0)}>Acceuil </button>
                            </Fragment>
                            )

                }
                </div>
            


                <div className="percentage" >
                    <div className="progressPercent">Reussit:{percent}%</div>
                    <div className="progressPercent">Note: {score}/{maxQuestions}</div>

                </div>
            </Fragment>

           
        )
        : (
            <Fragment>
                <div className="stepsBtnContainer">

                    <p className="failureMsg">Vous avez echoue, essyez plut tard!</p>
                   
                </div>

                <div className="percentage" >
                    <div className="progressPercent">Reussit:{percent}%</div>
                    <div className="progressPercent">Note: {score}/{maxQuestions}</div>

                </div>


            </Fragment>
        )



    const questionAnswer = score >= averageGrade ? (
        asked.map(
        question => {
            return (
                <tr kesy={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                </tr>
            )
        })
    ) :

        (
            <tr>
                <td colSpan="3">
                    <p style={{ textAlign:'center',color:'red' }}> Pas de reponses</p>
                </td>
            </tr>
        )


    





    return (

        <Fragment>
            {decision}


            <hr/>

            <div className="loader"></div>
            <p>Les repenses aux questions posees sont: </p>

            <div className="answerContainer">
                <table className="answers">
                    <thead>
                    <tr>
                        <th> Question</th>
                        <th>Repenses</th>
                            {/*<th>Infos</th>*/}
                        </tr>

                    </thead>

                    <tbody>
                        
                        {questionAnswer}

                    </tbody>
                </table>

            </div>
        </Fragment>
    )
}
)


export default QuizOver;
