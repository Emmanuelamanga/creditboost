import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { topicService } from '@/services/topic.service';
import { Clock, Book, Star, ChevronRight } from 'lucide-react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

const TopicQuizzes = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopicQuizzes = async () => {
      try {
        if (!topicId) {
          setError('Topic ID is missing');
          return;
        }
        const { topic, quizzes } = await topicService.getTopicQuizzes(topicId);
        if (!topic) {
          setError('Topic not found');
          return;
        }
        setTopic(topic);
        setQuizzes(quizzes);
      } catch (error) {
        console.error('Failed to fetch topic quizzes:', error);
        setError('Failed to load topic quizzes');
      } finally {
        setLoading(false);
      }
    };
    fetchTopicQuizzes();
  }, [topicId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error || 'Topic not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <AuthenticatedLayout>
        <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
          <p className="text-gray-600">{topic.description}</p>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-600">No quizzes available for this topic.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {quizzes.map((quiz) => (
              <div 
                key={quiz.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/learn/topics/quiz/${quiz.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{quiz.title}</h3>
                    <p className="text-gray-600">{quiz.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{quiz.estimatedTime} mins</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>{quiz.points} points</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Book className="h-4 w-4" />
                        <span className="capitalize">{quiz.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthenticatedLayout>
    
  );
};

export default TopicQuizzes;