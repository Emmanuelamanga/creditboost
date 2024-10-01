import React, { useState, useContext } from 'react';
import Sidebar from '../components/SideBar';
import { MdArrowForwardIos, MdDashboard, MdSell } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/DashboardNavbar';
import { Link } from 'react-router-dom';
import { HiAcademicCap } from 'react-icons/hi';
import {  BsCreditCard2FrontFill } from 'react-icons/bs';
import { PiStarAndCrescentFill } from 'react-icons/pi';

const Home = () => {
    //initialize navigation and cookies
    const navigate = useNavigate()
    //get app context
    const { updatedProfile, } = useContext(AppContext);
    //set state
    const [name, setName] = useState('');

    const tasks = [
        {
            name: 'Get your score',
            icon: <BsCreditCard2FrontFill />,
            link: '/credit-scoring',
            description: 'Upload your financial history and get your credit score.',
            content: 'Learn how your credit score is calculated, upload your financial data, and monitor your score. This helps you improve your financial health.',
            buttonText: 'Check Credit Score'
        },
        {
            name: 'Learn and improve your score',
            icon: <PiStarAndCrescentFill />,
            link: '/gamification',
            description: 'Learn about SMEs, credit, and earn points through quizzes.',
            content: 'Participate in fun, interactive quizzes to learn about small business management, credit scores, and earn points. Grow your knowledge while climbing the leaderboard!',
            buttonText: 'Start Learning & Earning Points'
        }
    ]


    //menu items
    const Menus = [
        { title: "Dashboard", link: "/home", icon: <MdDashboard /> },
        { title: "Credit Score", link: "/score", icon: <BsCreditCard2FrontFill /> },
        { title: "Learn", link: "/academy", icon: <HiAcademicCap /> },
        //{ title: "Leads", link: "#", icon: <RiCustomerService2Fill /> },
        //{ title: "Settings", link: "#", icon: <FaCog /> },

    ];


    return (
        <div className="flex flex-row  bg-[#f6f6f6] max-h-screen">
            <Sidebar isOpen={true} Menus={Menus} />
            <main className="flex-1 px-4 overflow-y-auto">
                <Navbar />
                <div className="container mx-auto">
                    <div className="flex flex-col gap-6 py-4 mt-4 min-h-[86vh] ">
                        <div className='grid grid-cols-3  gap-8'>
                            <div className='card-small border flex flex-col gap-1 '>
                                <BsCreditCard2FrontFill className='h-10 w-10 text-blue-500' />

                                <div className='flex text-xl items-center font-bold flex-row justify-between'>
                                    <p>Credit Score</p>
                                    <div className='border-4 rounded-full border-blue-500'>
                                        <p className='p-2'>000</p>                             </div>
                                </div>                         <p>Your latest credit score</p>
                            </div>
                            <div className='card-small border flex flex-col gap-1 '>
                                <HiAcademicCap className='h-10 w-10 text-green-500' />
                                <div className='flex text-xl items-center font-bold flex-row justify-between'>
                                    <p>Completed</p>
                                    <div className='border-4 rounded-full border-green-400'>
                                        <p className='p-2'>066</p>
                                    </div>
                                </div>
                                <p>Total available modules 30</p>
                            </div>
                            <div className='card-small border flex flex-col gap-1 '>
                                <PiStarAndCrescentFill className='h-10 w-10 text-yellow-500' />
                                <div className='flex text-xl items-center font-bold flex-row justify-between'>
                                    <p>Game Score</p>
                                    <div className='border-4 rounded-full border-yellow-500'>
                                        <p className='p-2'>636</p>
                                    </div>
                                </div>
                                <p>Highest Score 1000</p>
                            </div>

                        </div>

                        <p className='text-base font-semibold'>Resources</p>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                            {tasks.map((task, index) => (
                                <div
                                    key={index}
                                    to={task.link}
                                    className='group card flex flex-col border border-gray-200  transition-transform transform hover:scale-105 hover:shadow-lg  p-4'
                                >
                                    <div className='flex justify-end '>
                                        <div className='h-4 w-4 group-hover:border-red-600 rounded-full border border-blue-300'></div>
                                    </div>
                                    <div className='flex flex-col md:h-40 h-28 justify-center'>
                                        <div className='md:text-4xl text-2xl mb-2 text-blue-500'>{task.icon}</div>
                                        <p className='font-semibold md:text-lg'>{task.name}</p>
                                        <p className='hidden md:block text-gray-500 text-sm mt-1'>{task.description}</p>
                                        <p className='block md:hidden text-gray-500 text-xs mt-1'>{task.description}</p>
                                    </div>
                                    <Link className='flex py-2 px-4 bg-blue-500 rounded-lg w-min text-white flex-row items-center gap-4'>
                                        <p className=''>Go</p>
                                        <MdArrowForwardIos className=''/>
                                    </Link>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;












