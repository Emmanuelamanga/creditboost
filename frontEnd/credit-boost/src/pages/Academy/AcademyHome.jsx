import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../components/SideBar';
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Navbar from '../../components/DashboardNavbar';
import { HiAcademicCap } from 'react-icons/hi';
import { BsCreditCard2FrontFill, BsLightningFill } from 'react-icons/bs';
import { PiStarAndCrescentFill, PiTipJarFill } from 'react-icons/pi';
import { FaLock } from 'react-icons/fa';
import api from '@/api/privateInstance';

const AcademyHome = () => {
    const navigate = useNavigate();
    const { updatedProfile, learningContent, setLearningContent, userProgress, setUserProgress } = useContext(AppContext);
    const [contentOpen, setContentOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [submissionResult, setSubmissionResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    const toggleContent = () => {
        setContentOpen(!contentOpen);
    };

    useEffect(() => {
        const userMetrics = async () => {
            try {
                const response = await api.get('academy/progress/');
                if (response.status === 200) {
                    console.log(response.data)
                    setUserProgress(response.data);

                    // Process the data to count completed items and sum points
                    const { completedCount, totalPoints } = response.data.reduce(
                        (acc, progress) => {
                            if (progress.completed) {
                                acc.completedCount += 1;
                                acc.totalPoints += progress.total_points;
                            }
                            return acc;
                        },
                        { completedCount: 0, totalPoints: 0 }
                    );

                    // Set the state with calculated values
                    setCompletedCount(completedCount);
                    setTotalPoints(totalPoints);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchLearning = async () => {
            try {
                const response = await api.get('academy/modules/latest/');
                if (response.status === 200) {
                    setLearningContent(response.data);
                } else {
                    setLearningContent([]);
                }
            } catch (error) {
                console.log(error);
                setLearningContent([]);
            }
        };

        fetchLearning();
        userMetrics();
    }, []);

    const handleSelectAnswer = (questionId, choiceId) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: choiceId,
        }));
    };

    const handleSubmitAnswers = async () => {
        setSubmitting(true)
        const answers = Object.entries(userAnswers).map(([questionId, choiceId]) => ({
            question_id: questionId,
            choice_id: choiceId,
        }));

        try {
            const response = await api.post('/academy/modules/submit-answers/', {
                content_id: selectedCourse.id,
                answers,
            });

            setSubmissionResult(response.data); // Set the result from the backend
        } catch (error) {
            console.error("Error submitting answers:", error.response?.data || error.message);
        } finally {
            setSubmitting(false)
        }
    };

    const menus = [
        { title: "Dashboard", link: "/home", icon: <MdDashboard /> },
        { title: "Credit Score", link: "/score", icon: <BsCreditCard2FrontFill /> },
        { title: "Learn", link: "/academy", icon: <HiAcademicCap /> },
        //{ title: "Leads", link: "#", icon: <RiCustomerService2Fill /> },
        //{ title: "Settings", link: "#", icon: <FaCog /> },

    ];

    return (
        <div className="flex flex-row bg-[#f6f6f6] max-h-screen">
            <Sidebar isOpen={true} Menus={menus} />
            <main className="flex-1 px-4 overflow-y-auto">
                <Navbar />
                <div className="container mx-auto">
                    <div className="flex flex-col gap-6 py-4 mt-4 min-h-[86vh]">
                        <div className='grid grid-cols-3  gap-8'>
                            <div className='card-small border flex flex-col gap-1 '>
                                <BsCreditCard2FrontFill className='h-10 w-10 text-blue-500' />

                                <div className='flex text-xl items-center font-bold flex-row justify-between'>
                                    <p>Credit Score</p>
                                    <div className='border h-10 w-10 flex items-center justify-center rounded-full border-blue-500'>
                                        <p className='p-2'>0</p>
                                    </div>
                                </div>
                                <p>Your latest credit score</p>
                            </div>
                            <div className='card-small border flex flex-col gap-1 '>
                                <HiAcademicCap className='h-10 w-10 text-green-500' />
                                <div className='flex text-xl items-center font-bold flex-row justify-between'>
                                    <p>Completed</p>
                                    <div className='border h-10 w-10 flex items-center justify-center 
                                     rounded-full border-green-400'>
                                        <p className='p-2'>{completedCount}</p>
                                        {/* {completedCount} */}
                                    </div>
                                </div>
                                <p>Total completed modules</p>
                            </div>
                            <div className='card-small border flex flex-col gap-1 '>
                                <PiStarAndCrescentFill className='h-10 w-10 text-yellow-500' />
                                <div className='flex text-xl items-center font-bold flex-row justify-between'>
                                    <p>Game Score</p>
                                    <div className='border p-2 
                                    rounded-full border-yellow-500 h-10 w-10 flex items-center justify-center'>
                                        <p className='p-2'>{totalPoints}</p>
                                        {/* {totalPoints} */}
                                    </div>
                                </div>
                                <p>Total Score </p>
                            </div>

                        </div>
                        <p className='text-base font-semibold'>Learn</p>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                            {learningContent.map((course, index) => (
                                <div
                                    key={index}
                                    className='card border border-gray-200 p-4 relative'
                                >
                                    {course.locked && (
                                        <div className='absolute card inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50'>
                                            <FaLock className='text-white text-3xl' />
                                        </div>
                                    )}
                                    <div className='flex flex-col md:h-40 h-28 justify-center'>
                                        <p className='font-semibold text-lg'>{course.title}</p>
                                        <p className='text-gray-500 text-sm mt-1'>
                                            {course.content.split(' ').slice(0, 15).join(' ')}
                                        </p>
                                        <p className='text-blue-500 mt-2'>Points: {course.points}</p>
                                        <Link
                                            className={`mt-4 px-4 py-3 w-[30%] rounded-lg text-white ${course.locked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                                            onClick={() => {
                                                if (!course.locked) {
                                                    console.log(index, learningContent[index])
                                                    setSelectedCourse(learningContent[index]);
                                                    setContentOpen(true);
                                                }
                                            }}
                                        >
                                            {course.locked ? 'Locked' : 'Start'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Modal */}
                        {contentOpen && selectedCourse && (
                            <div className={`absolute flex items-center justify-center top-0 left-0 h-screen w-full`}>
                                <div className='relative flex flex-col bg-gray-200 justify-center items-center h-[85%] md:w-[85%] rounded-lg p-8'>
                                    <div onClick={toggleContent} className='absolute flex flex-row gap-1 items-center top-0 right-0 p-2 cursor-pointer'>
                                        <p>Close</p>
                                        {/* <X className='h-4' /> */}
                                    </div>

                                    <div className='overflow-y-auto h-full w-full'>
                                        <h2 className='text-2xl font-bold mb-4'>{selectedCourse.title}</h2>
                                        <p className='text-gray-700 mb-10 w-[80%] '>{selectedCourse.content}</p>

                                        {selectedCourse.questions && selectedCourse.questions.map((question) => (
                                            <div key={question.id} className='mb-6'>
                                                <div className='flex flex-row gap-8'>
                                                    <h3 className='font-semibold mb-2'>{question.question_text}</h3>
                                                    <h3 className='font-semibold mb-2'>{question.points}</h3>
                                                </div>
                                                <div className='space-y-2'>
                                                    {question.choices.map((choice) => (
                                                        <label key={choice.id} className='flex items-center space-x-2'>
                                                            <input
                                                                type="radio"
                                                                name={`question_${question.id}`}
                                                                value={choice.id}
                                                                onChange={() => handleSelectAnswer(question.id, choice.id)}
                                                                className='form-radio h-4 w-4 text-blue-500'
                                                            />
                                                            <span>{choice.letter}: {choice.text}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        <button disabled={submitting} onClick={handleSubmitAnswers} className=' py-3 px-6 bg-blue-500 rounded-lg mt-8 text-white '>
                                            {submitting ? 'Submitting.....' : 'Submit'}
                                        </button>
                                    </div>

                                    {submissionResult && (
                                        <div className='mt-4 p-3 border border-gray-400 rounded-lg'>
                                            <h3 className='text-lg font-bold'>Submission Result</h3>
                                            <p>Total Points Earned: {submissionResult.total_points}</p>
                                            <p>{submissionResult.message}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AcademyHome;
