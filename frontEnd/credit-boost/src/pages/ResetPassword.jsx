import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const { uid, token } = useParams()

    const handleReset = async (e) => {
        e.preventDefault();
        setMessage('');

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        setIsSubmitting(true);


        try {
            const response = await axiosInstance.post('/users/reset_password_confirm/', {
                uid,
                token,
                new_password: password,
                re_new_password: confirmPassword,
            });

            if (response.status === 204) {
                navigate('/login');
            } else {
                setMessage(`Failed. ${response.data.message}`);
            }
        } catch (error) {
            setMessage(`Failed. Check details and try again.`);
            console.error('Password reset failed', error);
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
                            {/* <img src={LogoD} className="w-20 " alt="logo" /> */}
                            {/* <img src="images/tailus.svg" className="w-40 dark:hidden" alt="tailus logo" />
                <img src="images/logo.svg" className="w-40 hidden dark:block" alt="tailus logo" /> */}
                        </Link>
                    </div>
                    <div className="mt-6 rounded-3xl md:min-w-[500px] border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
                        <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">Password reset</h3>

                        <form onSubmit={handleReset} className="mt-10 space-y-8 dark:text-white">
                            {message && <p className="mt-4 text-center text-red-600">{message}</p>}


                            <div className="flex flex-col items-end">
                                <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                                    <input id="password" type="password" value={password} required
                                        onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full bg-transparent pb-3 
                                            border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none 
                                            invalid:border-red-400 transition"/>
                                </div>

                            </div>

                            <div className="flex flex-col items-end">
                                <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                                    <input id="password2" type="password" value={confirmPassword} required
                                        onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full bg-transparent pb-3 
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
                                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
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

export default ResetPassword;


// <div className='flex flex-col  justify-between'>
    
//     <div className='flex justify-center min-h-[80vh] items-center'>
//         <form onSubmit={handleReset} className='md:w-[38%] w-[80%] '>
//             <div className='flex justify-center'>
//                 <img src={LogoD} className='h-16 w-16 mb-8 ' />
//             </div>
//             <h2 className="text-2xl text-center font-bold mb-4">Reset Your Password</h2>
//             {message && <p className="mt-4 text-center text-red-600">{message}</p>}

//             <div className="mb-4">
//                 <label htmlFor="password" className="block text-gray-700 mb-3">Password</label>
//                 <input
//                     type="password"
//                     id="password"
//                     className="w-full px-3 py-3 border rounded-lg"
//                     placeholder="**************"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="confirmPassword" className="block text-gray-700 mb-3">Confirm Password</label>
//                 <input
//                     type="password"
//                     id="confirmPassword"
//                     className="w-full px-3 py-3 border rounded-lg"
//                     placeholder="***************"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//             </div>

//             <button
//                 disabled={isSubmitting}
//                 type="submit"
//                 className="bg-blue-500 text-white w-full py-3 rounded-lg"
//             >
//                 {isSubmitting ? 'Resetting...' : 'Reset Password'}
//             </button>
//         </form>
//     </div>
    
// </div>
