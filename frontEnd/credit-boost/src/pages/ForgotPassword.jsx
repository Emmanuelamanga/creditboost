import React, {  useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import AuthLayout from './Layouts/AuthLayout';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleForgot = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await axiosInstance.post('/users/reset_password/', { email });
            if (response.status === 204) {
                setMessage({
                    type: 'success',
                    text: 'Password reset link has been sent to your email'
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Failed to send reset link. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Forgot password?" 
            subtitle="Enter your email address and we'll send you a link to reset your password"
        >
            {message.text && (
                <div className={`mb-6 p-3 text-sm rounded-lg ${
                    message.type === 'success' 
                        ? 'bg-green-50 text-green-600 dark:bg-green-900/20' 
                        : 'bg-red-50 text-red-500 dark:bg-red-900/20'
                }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleForgot} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email address
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 disabled:opacity-70"
                >
                    {isSubmitting ? "Sending link..." : "Send reset link"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
                <Link to="/login" className="text-sky-600 hover:text-sky-500 font-medium">
                    Back to login
                </Link>
            </p>
        </AuthLayout>
    );
};

export default ForgotPassword;


