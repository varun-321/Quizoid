
import './App.css';

import Axios from 'axios';
import React, {useState, useEffect} from 'react';

import Questionaire from './components/Question';


const API_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

function App() {


  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);


  useEffect(() =>{
    Axios.get(API_URL)
      .then(res => res.data)
      .then(data => {
        const questions = data.results.map((question) => ({
          ...question,
          answers:[question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5)
        }))
        setQuestions(questions)
      });
  },[])


  const handleAnswer = (answer) => {
    if(!showAnswers){
      if(answer === questions[currentIndex].correct_answer){
        setScore(score+1);
      }
    }
    

    setShowAnswers(true);
    
  }


  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex+1);
    setShowAnswers(false);
  }

  return (
    questions.length > 0 ? (

      <div className="container">
        {currentIndex >= questions.length ? (
        <h1>Game Ended, Your Score is {score}</h1>): (<Questionaire   handleAnswer={handleAnswer}
          showAnswers={showAnswers}
          handleNextQuestion={handleNextQuestion}
          data={questions[currentIndex]}/>)}
        
      </div>
  
    ) : <div className="container">


<div className="card">
        <div className="card-content">
          <div className="content">
            <h1>Welcome to the Quiz</h1>
            <ul align="left">
                <li>This Quiz has 5 questions regarding web.</li>
                <li>Every question has a single correct answer.</li>
                <li> Every question will give 4 options </li>
                <li>Click on Resume button and start it.</li>
            </ul>
            <p>Good luck!</p>
            
           
        </div>  
          </div>
        </div>
           

              Loading..... Please Wait


               
    </div>


  );
}

export default App;
