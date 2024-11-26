import React, { useState } from 'react';
import { Clock, BookOpen, AlertCircle, Trophy } from 'lucide-react';

const QuizInstructions = ({ quiz, onStart, attempts }) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
        
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="font-semibold flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Instructions
            </h2>
            <p className="mt-2 text-gray-600">{quiz.instructions}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-5 w-5" />
                <span>Time Limit:</span>
                <span className="font-semibold">{quiz.timeLimit} minutes</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <Trophy className="h-5 w-5" />
                <span>Passing Score:</span>
                <span className="font-semibold">{quiz.passingScore}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Important Notes:</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Maximum attempts allowed: {quiz.maxAttempts}</li>
              <li>Your attempts so far: {attempts}</li>
              <li>Time will be recorded from when you start</li>
              <li>Cooldown period between attempts: {quiz.cooldownPeriod} hours</li>
              {!quiz.showResults && (
                <li>Correct answers will not be shown after completion</li>
              )}
            </ul>
          </div>

          <button
            onClick={onStart}
            className="w-full mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstructions;