import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizService } from '@/services/quiz.service';
import { Check, ChevronRight, ArrowLeft } from 'lucide-react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { AppContext } from '@/context/AppContext';
import QuizInstructions from './QuizInstructions';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const { user } = useContext(AppContext);

  const [showInstructions, setShowInstructions] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [attemptId, setAttemptId] = useState(null);

  useEffect(() => {
    if (!quiz?.timeLimit || !attemptId) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attemptId, quiz]);


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizData = await quizService.getQuizById(quizId);
        const progressData = await quizService.getUserProgress(quizId, user?.id);
        setQuiz(quizData);
        setAttempts(progressData.attempts || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [quizId]);

  const handleAnswer = (questionId, answerId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const startQuiz = async () => {
    try {
      const { id, startTime } = await quizService.startQuiz(quizId, user);
      setAttemptId(id);
      setTimeLeft(quiz.timeLimit * 60);
      setShowInstructions(false);
    } catch (error) {
      console.error('Failed to start quiz:', error);
    }
  };

  
  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault(); 
    }
    
    setSubmitting(true);
    try {
      const submissionData = {
        answers,
        attemptId,
        timeSpent: quiz.timeLimit ? (quiz.timeLimit * 60 - timeLeft) : 0,
        isTimeout: typeof e === 'boolean' ? e : false // If called with boolean, it's a timeout
      };

      console.log('Submitting answers:', submissionData);
      const result = await quizService.submitQuizAnswers(quizId, submissionData);
      setResult(result);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showInstructions) {
    return (
      <AuthenticatedLayout>
        <QuizInstructions 
          quiz={quiz}
          attempts={attempts}
          onStart={startQuiz}
        />
      </AuthenticatedLayout>
    );
  }


  if (result) {
    return (
      <AuthenticatedLayout>
          <div className="max-w-2xl mx-auto p-6 space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* timer */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            {timeLeft && (
              <div className="text-lg font-semibold">
                Time: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            )}
          </div>
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Score</span>
                <span className="text-xl font-bold text-primary">{result.score}%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Correct Answers</span>
                <span className="text-xl font-bold text-green-500">{result.correctAnswers}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Time Taken</span>
                <span className="text-xl font-bold text-blue-500">{result.timeTaken} minutes</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/learn')}
              className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </AuthenticatedLayout>
      
    );
  }

  const currentQ = quiz?.questions[currentQuestion];

  return (
    <AuthenticatedLayout>
        <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
          </div>

          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-medium">{currentQ.question}</h2>
            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(currentQ.id, option.id)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    answers[currentQ.id] === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {answers[currentQ.id] === option.id && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(curr => curr - 1)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
            )}
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(curr => curr + 1)}
                className="ml-auto flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="ml-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
    
  );
};

export default Quiz;