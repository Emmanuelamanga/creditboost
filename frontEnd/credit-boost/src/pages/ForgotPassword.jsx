// src/pages/VerifyEmail.js
import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
    const handleForgot = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');


        try {
            const response = await axiosInstance.post('/users/reset_password/', {
                email,
            });

            if (response.status === 204) {
                setMessage('An email with password reset link has been sent to you.')
                //navigate('/login');

            } else {
                setMessage('Failed.Confirm your email and try again.')
            }
        } catch (error) {
            setMessage(`Failed .Check details and try again`)
            console.error('Login failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (

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
                        <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">Password reset request</h3>

                        <p className="block mt-3 text-white">
                            A reset link will be sent to the email provided
                        </p>
                        <form onSubmit={handleForgot} className="mt-10 space-y-8 dark:text-white">
                            {message && <p className="mt-4 text-center text-red-600">{message}</p>}


                            <div className="flex flex-col items-end">
                                <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                                    <input id="email" type="email" value={email} required
                                        onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-transparent pb-3 
                 border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none 
                  invalid:border-red-400 transition"/>
                                </div>

                            </div>


                            <div>
                                <button
                                    disabled={isSubmitting}
                                    className="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800"
                                >
                                    <span className="text-base font-semibold text-white dark:text-gray-900">
                                        {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                    </span>
                                </button>

                            </div>
                        </form>
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

export default ForgotPassword;




