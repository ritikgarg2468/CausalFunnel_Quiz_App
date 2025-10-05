import React from 'react';
import { useQuiz } from '../context/QuizContext';

const QuestionNav = ({ onQuestionSelect }) => {
  const { state } = useQuiz();
  const { questions, currentQuestion, visitedQuestions, attemptedQuestions } = state;

  const getQuestionStatus = (index) => {
    if (attemptedQuestions.has(index)) return 'attempted';
    if (visitedQuestions.has(index)) return 'visited';
    return 'unvisited';
  };

  const getQuestionClass = (index) => {
    const status = getQuestionStatus(index);
    const isActive = index === currentQuestion;
    return `nav-question ${status} ${isActive ? 'active' : ''}`;
  };

  return (
    <div className="question-nav">
      <div className="nav-header">
        <h3>📋 Question Overview</h3>
        <div className="nav-legend">
          <div className="legend-item">
            <span className="legend-dot attempted"></span>
            <span>Attempted</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot visited"></span>
            <span>Visited</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot unvisited"></span>
            <span>Not Visited</span>
          </div>
        </div>
      </div>
      
      <div className="nav-questions">
        {questions.map((_, index) => (
          <button
            key={index}
            className={getQuestionClass(index)}
            onClick={() => onQuestionSelect(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="nav-stats">
        <div className="stat-item">
          <span className="stat-number">{attemptedQuestions.size}</span>
          <span className="stat-label">Attempted</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{visitedQuestions.size}</span>
          <span className="stat-label">Visited</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{questions.length - visitedQuestions.size}</span>
          <span className="stat-label">Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNav;
