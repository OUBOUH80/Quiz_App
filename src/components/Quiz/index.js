import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 
import '../../App.css';
import QuizOver from '../QuizOver';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';




toast.configure();

class Quiz extends React.Component {

    constructor(props) { 
        super(props)
        this.initialState = {
            levlNames: ["debutant", "confirme", "expert"],
            quizLevel: 0,
            maxQuestions: 10,
            storedQuestions: [],
            question: null,
            options: [],
            idQuestion: 0,
            userAnswer: null,
            btnDisabled: true,
            score: 0,
            showWelcomeMsg: false,
            quizEnd: false,
            percent: 0,
            count: 5,
            visibilityStart: 'visible',
            visibiltyTimer: 'hidden',
            classe: "tweety",
            displaybtn:"flex"

        }

        this.state = this.initialState;
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        ;
    }

    startTimer() {

        this.timer = setInterval(() => 
            this.setState({
                count: this.state.count - 1
            }),1000
        )
        this.setState({ visibilityStart: 'hidden', visibiltyTimer: 'visible', classe: "quiz", displaybtn:"none" })

        }

    
    stopTimer() {
        clearInterval(this.timer)
    }
    resetTimer() {
        this.setState({count:5})
    }

  
    
  
   


    storedDataRef = React.createRef();
    loadQuestions = quizz => {

        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];


        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
            const newArry = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest)
            this.storedDataRef.current = fetchedArrayQuiz;
            this.setState({
                storedQuestions: newArry
            })
        }
    }


    showToastMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {

            this.setState(

                {
                    showWelcomeMsg:true
                })

            toast.warn(`Bienvune ${pseudo} et bonne chance ;) `, {

                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnclick: true,
                pauseOnHover: true,
                draggable: false
            });
}

        
    }

    componentDidMount() {

        this.loadQuestions(this.state.levlNames[this.state.quizLevel]);
       


    }


    componentDidUpdate(prevProps, prevState) {

        if ((this.state.storedQuestions !== prevState.storedQuestions) && this.state.storedQuestions.length) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            });
        
            
        }



        if ((this.state.idQuestion !== prevState.idQuestion) &&this.state.storedQuestions.length ) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            });
        }

        if (this.props.userData.pseudo !== prevProps.userData.pseudo ) {
            this.showToastMsg(this.props.userData.pseudo);

        }

        if (this.state.quizEnd !== prevState.quizEnd) {
            const gradepercent = this.getPersontage(this.state.maxQuestions, this.state.score)
            this.gameOver(gradepercent);
        }
        if (this.state.count == 0) {
          
            this.nextQuestion();
            this.resetTimer();
            
        }

       
    }

        submitAnswer = selectedAnswer => {
            this.setState({
                userAnswer: selectedAnswer,
                btnDisabled: false
            })
        }



    

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {

            this.setState({ quizEnd: true })
            this.stopTimer();

        } else {
           
                this.resetTimer();
                this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1 }))
            
        }
      const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;
            if (this.state.userAnswer === goodAnswer) {
                this.setState(prevState => ({
                    score: prevState.score + 1
                }));
  
                 

                toast.success(`Bravo +1 ${this.props.userData.pseudo} ;) `, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnclick: true,
                    pauseOnHover: true,
                    draggable: false
                });
            } else {

                toast.error(`Echoue 0 `, {

                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnclick: true,
                    pauseOnHover: true,
                    draggable: false,
                    bodyClasseName:"toastify-color"
                });
            }

    }

    getPersontage = (maxQuestuion, ourscore) =>  (ourscore / maxQuestuion)*100

    gameOver = percent => {

       

        if (percent > 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: percent
            })
            this.stopTimer();
        } else {
            this.setState({
                percent: percent
            })
        }
        
        
}
    loadLevelQuestions = param => {

        this.setState({ ...this.initialState, quizLevel:param })
        this.loadQuestions(this.state.levlNames[param])
    }



    







        render() {


            const displayOptions = this.state.options.map((option, index) => {
                return (
                    <p key={index}
                        className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
                        onClick={() => this.submitAnswer(option)}
                    >
                        {option} </p>
                )
            })

            return this.state.quizEnd ? (<QuizOver
                ref={this.storedDataRef}
                levlNames={this.state.levlNames}
                score={this.state.score}
                quizLevel={this.state.quizLevel}
                maxQuestions={this.state.maxQuestions}
                percent={this.state.percent}
                loadLevelQuestions={this.loadLevelQuestions}
                />)
                :
                (
                    <Fragment>
                        <Levels
                            levlNames={this.state.levlNames}
                            quizLevel={this.state.quizLevel}
                        />
                        <ProgressBar
                            idQuestion={this.state.idQuestion}
                            maxQuestions={this.state.maxQuestions}
                        />
                        <div >
                            
                            <p
                                className="timer"
                                style={{ visibility: this.state.visibiltyTimer }}
                            >Timer: {this.state.count}</p>
                        </div>
                        <div className={this.state.classe}>
                            <button className="start"
                                onClick={this.startTimer}
                                style={{ visibility: this.state.visibilityStart, display: this.state.displaybtn }}
                            >Start</button>
                            <div style={{ visibility: this.state.visibiltyTimer }}>   
                <h2>{this.state.question}</h2>
                {displayOptions}
                        <button
                            disabled={this.state.btnDisabled}
                            className="btnSubmit"
                            onClick={this.nextQuestion}
                        >
                            {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant " : "Terminer"}
                                </button></div></div>
                    </Fragment>)

            
        }


    }

export default Quiz;
