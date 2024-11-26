import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Icon } from '@iconify/react';
import api from '@/api/privateInstance';

const AcademyHome = () => {
    const { updatedProfile, learningContent, setLearningContent, userProgress, setUserProgress } = useContext(AppContext);
    const [contentOpen, setContentOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submissionResult, setSubmissionResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleContent = () => {
        setContentOpen(!contentOpen);
    };

    useEffect(() => {
        const calculateMetrics = (data) => {
            // Ensure data is an array
            const progressArray = Array.isArray(data) ? data : [];
            
            return progressArray.reduce(
                (acc, progress) => {
                    // Check if progress is an object and has the required properties
                    if (progress && typeof progress === 'object' && progress.completed) {
                        acc.completedCount += 1;
                        acc.totalPoints += Number(progress.total_points) || 0;
                    }
                    return acc;
                },
                { completedCount: 0, totalPoints: 0 }
            );
        };

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Fetch user progress
                const progressResponse = await api.get('academy/progress/');
                
                if (progressResponse.status === 200) {
                    const progressData = progressResponse.data;
                    setUserProgress(progressData);

                    // Safely calculate metrics
                    const metrics = calculateMetrics(progressData);
                    setCompletedCount(metrics.completedCount);
                    setTotalPoints(metrics.totalPoints);
                }

                // Fetch learning content
                const learningResponse = await api.get('academy/modules/latest/');
                if (learningResponse.status === 200) {
                    // Ensure learning content is an array
                    const contentData = Array.isArray(learningResponse.data) 
                        ? learningResponse.data 
                        : [];
                    setLearningContent(contentData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load content. Please try again later.');
                setLearningContent([]);
                setUserProgress([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [setLearningContent, setUserProgress]);
    
    const handleSelectAnswer = (questionId, choiceId) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: choiceId,
        }));
    };

    const handleSubmitAnswers = async () => {
        if (!selectedCourse?.id) return;
        
        setSubmitting(true);
        setError(null);

        const answers = Object.entries(userAnswers).map(([questionId, choiceId]) => ({
            question_id: questionId,
            choice_id: choiceId,
        }));

        try {
            const response = await api.post('/academy/modules/submit-answers/', {
                content_id: selectedCourse.id,
                answers,
            });

            setSubmissionResult(response.data || { total_points: 0, message: 'Submission completed' });
        } catch (error) {
            setError('Failed to submit answers. Please try again.');
            console.error("Error submitting answers:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <AuthenticatedLayout>
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </AuthenticatedLayout>
        );
    }

    if (error) {
        return (
            <AuthenticatedLayout>
                <div className="flex flex-col items-center justify-center h-screen">
                    <Icon icon="mdi:alert-circle" className="h-12 w-12 text-red-500 mb-4" />
                    <p className="text-lg text-gray-700">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        Try Again
                    </button>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <main className="flex-1 px-4 overflow-y-auto">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-6 py-4 mt-4 min-h-[86vh]">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="card-small border flex flex-col gap-1">
                                <Icon icon="mdi:credit-card" className="h-10 w-10 text-blue-500" />
                                <div className="flex text-xl items-center font-bold flex-row justify-between">
                                    <p>Credit Score</p>
                                    <div className="border h-10 w-10 flex items-center justify-center rounded-full border-blue-500">
                                        <p className="p-2">{updatedProfile?.credit_score || 0}</p>
                                    </div>
                                </div>
                                <p>Your latest credit score</p>
                            </div>

                            <div className="card-small border flex flex-col gap-1">
                                <Icon icon="mdi:school" className="h-10 w-10 text-green-500" />
                                <div className="flex text-xl items-center font-bold flex-row justify-between">
                                    <p>Learn Scores</p>
                                    <div className="border h-10 w-10 flex items-center justify-center rounded-full border-green-400">
                                        <p className="p-2">{completedCount}</p>
                                    </div>
                                </div>
                                <p>Total completed modules</p>
                            </div>

                            <div className="card-small border flex flex-col gap-1">
                                <Icon icon="mdi:star" className="h-10 w-10 text-yellow-500" />
                                <div className="flex text-xl items-center font-bold flex-row justify-between">
                                    <p>Game Score</p>
                                    <div className="border h-10 w-10 flex items-center justify-center rounded-full border-yellow-500">
                                        <p className="p-2">{totalPoints}</p>
                                    </div>
                                </div>
                                <p>Total Score</p>
                            </div>
                        </div>

                        <p className="text-base font-semibold">Learn</p>

                        {/* Learning Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {(learningContent || []).map((course, index) => (
                                <div
                                    key={course?.id || index}
                                    className="card border border-gray-200 p-4 relative"
                                >
                                    {course?.locked && (
                                        <div className="absolute card inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                                            <Icon icon="mdi:lock" className="text-white text-3xl" />
                                        </div>
                                    )}
                                    <div className="flex flex-col md:h-40 h-28 justify-center">
                                        <p className="font-semibold text-lg">{course?.title || 'Untitled Course'}</p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            {(course?.content || '').split(' ').slice(0, 15).join(' ')}
                                        </p>
                                        <p className="text-blue-500 mt-2">Points: {course?.points || 0}</p>
                                        <Link
                                            className={`mt-4 px-4 py-3 w-[30%] rounded-lg text-white ${
                                                course?.locked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                            }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!course?.locked) {
                                                    setSelectedCourse(course);
                                                    setContentOpen(true);
                                                }
                                            }}
                                        >
                                            {course?.locked ? 'Locked' : 'Start'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Course Content Modal */}
                        {contentOpen && selectedCourse && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                                <div className="relative flex flex-col bg-white rounded-lg p-8 w-[85%] h-[85%] overflow-hidden">
                                    <button 
                                        onClick={toggleContent}
                                        className="absolute top-4 right-4 flex items-center gap-2 text-gray-500 hover:text-gray-700"
                                    >
                                        <span>Close</span>
                                        <Icon icon="mdi:close" className="h-5 w-5" />
                                    </button>

                                    <div className="overflow-y-auto h-full">
                                        <h2 className="text-2xl font-bold mb-4">{selectedCourse.title}</h2>
                                        <p className="text-gray-700 mb-10 w-[80%]">{selectedCourse.content}</p>

                                        {(selectedCourse.questions || []).map((question) => (
                                            <div key={question?.id} className="mb-6">
                                                <div className="flex flex-row gap-8">
                                                    <h3 className="font-semibold mb-2">{question?.question_text}</h3>
                                                    <h3 className="font-semibold mb-2">{question?.points || 0} points</h3>
                                                </div>
                                                <div className="space-y-2">
                                                    {(question?.choices || []).map((choice) => (
                                                        <label key={choice?.id} className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                name={`question_${question.id}`}
                                                                value={choice?.id}
                                                                onChange={() => handleSelectAnswer(question.id, choice.id)}
                                                                className="form-radio h-4 w-4 text-blue-500"
                                                            />
                                                            <span>{choice?.letter}: {choice?.text}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        <button 
                                            disabled={submitting} 
                                            onClick={handleSubmitAnswers}
                                            className="py-3 px-6 bg-blue-500 text-white rounded-lg mt-8 disabled:bg-gray-400"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit'}
                                        </button>

                                        {error && (
                                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                                {error}
                                            </div>
                                        )}

                                        {submissionResult && (
                                            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                                <h3 className="text-lg font-bold">Submission Result</h3>
                                                <p>Total Points Earned: {submissionResult.total_points || 0}</p>
                                                <p>{submissionResult.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default AcademyHome;