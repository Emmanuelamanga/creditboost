// src/pages/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const VerifyEmail = ({ match }) => {
    const [status, setStatus] = useState('Verifying...');
    const { uid, token } = useParams()



    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axiosInstance.post('users/activation/', { uid, token });
                if (response.status === 204) {
                    setStatus('Email verified successfully! Redirecting to login...');
                    setTimeout(() => {
                        window.location.href = '/login'; // Redirect to the login page after successful verification
                    }, 3000);
                } else {
                    setStatus('Verification failed. Please try again.');
                }
            } catch (error) {
                setStatus('Verification failed. Please try again.');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        // <div className='flex flex-col min-h-[100vh] justify-between'>
        //     <LandingNavbar />
        //     <div className='flex justify-center items-center' >
        //         <div className='p-4 rounded-lg border border-gray-300'>
        //             <h1 className='text-2xl font-semibold'>{status}</h1>
        //         </div>
        //     </div>
        //     <Foooter />
        // </div>

        <div className="m-auto xl:container px-12 sm:px-0 mx-auto">

            <div className="mx-auto h-full sm:w-max">
                <div className="m-auto  py-12">
                    <div className="space-y-4">
                        <Link to="/" className='flex items-center justify-center'>
                            {/* <img src="logo_d.png" className="w-20 " alt="logo" /> */}
                            {/* <img src="images/tailus.svg" className="w-40 dark:hidden" alt="tailus logo" />
                <img src="images/logo.svg" className="w-40 hidden dark:block" alt="tailus logo" /> */}
                        </Link>
                    </div>
                    <div className="mt-6 rounded-3xl md:min-w-[500px] border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
                        <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">Email Verification</h3>

                        <div className='flex  items-center' >
                            <div className='py-4 rounded-lg'>
                                <h1 className='text-2xl font-semibold'>{status}</h1>
                            </div>
                        </div>

                    </div>
                    <div className="border-t pt-12 text-gray-500 dark:border-gray-800">
                        <div className="space-x-4 text-center">
                            <span>&copy; CreditBoost</span>
                            <a href="#" className="text-sm hover:text-sky-900 dark:hover:text-gray-300">Contact</a>
                            <a href="#" className="text-sm hover:text-sky-900 dark:hover:text-gray-300">Privacy & Terms</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
