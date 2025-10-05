import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizAPI } from '../utils/api';

const StartPage = ({ onStart }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useQuiz();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await quizAPI.startQuiz(email);
      
      if (response.success) {
        dispatch({ 
          type: 'START_QUIZ', 
          payload: { 
            ...response, 
            email 
          } 
        });
        onStart();
      } else {
        setError(response.message || 'Failed to start quiz');
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
      setError('Failed to start quiz. Please try again.');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <div className="quiz-header">
          <h1>📝 Quiz Application</h1>
          <p>Welcome to the CausalFunnel Quiz Challenge!</p>
        </div>

        <div className="quiz-info">
          <h2>Quiz Instructions</h2>
          <ul>
            <li>✅ 15 questions to answer</li>
            <li>⏰ 30 minutes time limit</li>
            <li>🧭 Navigate between questions freely</li>
            <li>📊 Get detailed results at the end</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="start-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email address"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="start-btn">
            🚀 Start Quiz
          </button>
        </form>
      </div>
      <div className="assignment-credit">
        CausalFunnel assignment by Ritik Garg
      </div>
    </div>
  );
};

export default StartPage;
