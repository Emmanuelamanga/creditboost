import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const ResetPasswordConfirm = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { uid, token } = useParams();

    const handleReset = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsSubmitting(true);

        try {
            const response = await axiosInstance.post('/users/reset_password_confirm/', {
                uid,
                token,
                new_password: formData.password,
                re_new_password: formData.confirmPassword,
            });

            if (response.status === 204) {
                navigate('/login');
            }
        } catch (err) {
            setError('Password reset failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout 
            title="Set new password" 
            subtitle="Enter your new password below"
        >
            {error && (
                <div className="mb-6 p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleReset} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 disabled:opacity-70"
                >
                    {isSubmitting ? "Setting new password..." : "Reset password"}
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

export default ResetPasswordConfirm;