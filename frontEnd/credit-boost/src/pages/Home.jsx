import React from 'react';
import { CreditCard } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { Star } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import {  useNavigate } from 'react-router-dom';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';

const Home = () => {

  const navigate = useNavigate();

  const tasks = [
    {
      name: 'Get your score',
      icon: <CreditCard className="h-6 w-6" />,
      link: '/credit-score',
      description: 'Upload your financial history and get your credit score.',
      content: 'Learn how your credit score is calculated, upload your financial data, and monitor your score. This helps you improve your financial health.',
      buttonText: 'Check Credit Score'
    },
    {
      name: 'Learn and improve your score',
      icon: <Star className="h-6 w-6" />,
      link: '/learn',
      description: 'Learn about SMEs, credit, and earn points through quizzes.',
      content: 'Participate in fun, interactive quizzes to learn about small business management, credit scores, and earn points. Grow your knowledge while climbing the leaderboard!',
      buttonText: 'Start Learning & Earning Points'
    }
  ];

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col gap-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <CreditCard className="h-10 w-10 text-secondary" />
            <div className="flex items-center justify-between mt-4">
              <h3 className="text-lg font-semibold">Credit Score</h3>
              <div className="border-4 rounded-full border-secondary h-14 w-14 flex items-center justify-center">
                <span className="font-bold">000</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Your latest credit score</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <GraduationCap className="h-10 w-10 text-primary" />
            <div className="flex items-center justify-between mt-4">
              <h3 className="text-lg font-semibold">Learn Score</h3>
              <div className="border-4 rounded-full border-primary h-14 w-14 flex items-center justify-center">
                <span className="font-bold">066</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Total available modules 30</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
            <Star className="h-10 w-10 text-accent" />
            <div className="flex items-center justify-between mt-4">
              <h3 className="text-lg font-semibold">Game Score</h3>
              <div className="border-4 rounded-full border-accent h-14 w-14 flex items-center justify-center">
                <span className="font-bold">636</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Highest Score 1000</p>
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex justify-end mb-4">
                  <div className="h-4 w-4 rounded-full border border-secondary group-hover:border-primary transition-colors" />
                </div>
                
                <div className="space-y-4">
                  <div className="text-secondary group-hover:text-primary transition-colors">
                    {task.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{task.name}</h3>
                    <p className="text-sm text-muted-foreground hidden md:block">
                      {task.description}
                    </p>
                    <p className="text-xs text-muted-foreground md:hidden">
                      {task.description}
                    </p>
                  </div>

                  <button onClick={() => navigate(task.link)} className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-light text-white rounded-lg transition-colors">
                    <span>Go</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Home;