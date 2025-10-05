import React, { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { quizAPI } from '../utils/api';

const ReportPage = ({ onRestart }) => {
  const { state } = useQuiz();
  const { quizId, quizResults } = state;
  const [detailedResults, setDetailedResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailedResults = async () => {
      try {
        const response = await quizAPI.getResults(quizId);
        if (response.success) {
          setDetailedResults(response.quiz);
        }
      } catch (error) {
        console.error('Error fetching detailed results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchDetailedResults();
    }
  }, [quizId]);

  if (loading) {
    return <div className="loading">Loading results...</div>;
  }

  if (!detailedResults) {
    return <div className="error">Failed to load results</div>;
  }

  const { questions, score, total_questions, time_taken, email } = detailedResults;
  const percentage = Math.round((score / total_questions) * 100);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreClass = () => {
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    if (percentage >= 40) return 'average';
    return 'poor';
  };

  return (
    <div className="report-page">
      <div className="report-container">
        <div className="report-header">
          <h1>🎉 Quiz Complete!</h1>
          <div className="user-info">
            <p>Email: <strong>{email}</strong></p>
          </div>
        </div>

        <div className="score-summary">
          <div className={`score-card ${getScoreClass()}`}>
            <div className="score-main">
              <div className="score-number">{score}</div>
              <div className="score-total">/ {total_questions}</div>
            </div>
            <div className="score-percentage">{percentage}%</div>
          </div>
          
          <div className="quiz-stats">
            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <span className="stat-label">Time Taken</span>
              <span className="stat-value">{formatTime(time_taken)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <span className="stat-label">Correct</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">❌</span>
              <span className="stat-label">Incorrect</span>
              <span className="stat-value">{total_questions - score}</span>
            </div>
          </div>
        </div>

        <div className="detailed-results">
          <h2>📊 Detailed Results</h2>
          
          {questions.map((question, index) => (
            <div key={index} className="result-item">
              <div className="result-header">
                <span className="question-number">Q{index + 1}</span>
                <span className={`result-status ${question.is_correct ? 'correct' : 'incorrect'}`}>
                  {question.is_correct ? '✅ Correct' : '❌ Incorrect'}
                </span>
              </div>
              
              <div className="result-question">
                <div dangerouslySetInnerHTML={{ __html: question.question }} />
              </div>
              
              <div className="result-answers">
                <div className="answer-comparison">
                  <div className="answer-section">
                    <h4>Your Answer:</h4>
                    <div className={`answer-box ${question.is_correct ? 'correct' : 'incorrect'}`}>
                      {question.user_answer ? (
                        <span dangerouslySetInnerHTML={{ __html: question.user_answer }} />
                      ) : (
                        <span className="no-answer">No answer selected</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="answer-section">
                    <h4>Correct Answer:</h4>
                    <div className="answer-box correct">
                      <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="report-actions">
          <button onClick={onRestart} className="restart-btn">
            🔄 Take Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
