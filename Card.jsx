import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import Confetti from "react-confetti";


const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which language runs in the browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
      answer: "Tokyo",
    },
    {
      question: "What is 5 + 3?",
      options: ["5", "8", "12", "7"],
      answer: "8",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: "Pacific Ocean",
    },
    {
      question: "Who wrote 'Hamlet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      answer: "William Shakespeare",
    },
    {
      question: "What is the boiling point of water?",
      options: ["90°C", "100°C", "120°C", "80°C"],
      answer: "100°C",
    },
    {
      question: "Which gas do plants absorb?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Carbon Dioxide",
    }
  ];
  

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (selectedOption) => {
    if (!(currentQuestion in answeredQuestions)) {
      setAnsweredQuestions({ ...answeredQuestions, [currentQuestion]: selectedOption });
      if (selectedOption === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(15);
    } else {
      setShowResult(true);
      setLeaderboard([...leaderboard, score]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(15);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(15);
    setAnsweredQuestions({});
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-r from-purple to-white p-4 md:p-10 text-white w-full">
      <header className="text-3xl md:text-4xl font-bold mb-6 text-center">Quiz Challenge 🎯</header>
      {showResult && score > 6 && <Confetti />}
      <motion.div 
        className="bg-white text-black p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl text-center relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute top-2 right-4 text-red-600 font-bold text-lg">⏳ {timeLeft}s</div>
        {showResult ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg font-semibold">Your score: {score} / {questions.length}</p>
            <p className={`text-lg mt-2 font-semibold ${score <= 3 ? "text-red-500" : score <= 6 ? "text-yellow-500" : "text-green-500"}`}>
              {score <= 3 ? "Wanna Give Another Try" : score <= 6 ? "Good Going" : "Well Done!"}
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg" onClick={handleRestartQuiz}>Restart Quiz</button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-center">{questions[currentQuestion].question}</h2>
            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  className={`p-3 rounded-lg border text-white ${answeredQuestions[currentQuestion] === option ? 'bg-green-500' : 'bg-blue-700 hover:bg-blue-800'}`} 
                  disabled={answeredQuestions[currentQuestion]} 
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button className="bg-yellow-500 p-2 rounded-lg" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                <FaArrowLeft className="text-white" />
              </button>
              <button className="bg-red-500 p-2 rounded-lg" onClick={handleNextQuestion} disabled={showResult}>
                <FaArrowRight className="text-white" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
      <footer className="text-center text-gray-200 mt-6 italic">“The beautiful thing about learning is that no one can take it away from you.” - B.B. King</footer>
    </div>
  );
}
