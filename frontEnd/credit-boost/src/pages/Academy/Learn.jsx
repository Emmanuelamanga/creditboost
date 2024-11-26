import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { topicService } from '@/services/topic.service';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';

const Learn = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      const { topics } = await topicService.getTopics();
      setTopics(topics);
      setLoading(false);
    };
    fetchTopics();
  }, []);

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold mb-8">Quiz Topics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/learn/topics/${topic.id}/quizzes`)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {topic.title}
                  </h2>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{topic.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{topic.description}</p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    <span>{topic.creatorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <span className="font-medium">Start Learning</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>

  );
};

export default Learn;