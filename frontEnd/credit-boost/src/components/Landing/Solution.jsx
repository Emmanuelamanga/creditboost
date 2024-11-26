import React from 'react';
import Container from '../Common/Container';
import { FaSignInAlt, FaInfoCircle, FaBoxOpen, FaLink } from 'react-icons/fa';

function Solution() {
    return (
        <div id="how-to" className="relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-sky-900/20 opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
            </div>

            {/* Content */}
            <Container className="relative">
                <div className='mb-12 space-y-2 text-center backdrop-blur-sm py-4 rounded-2xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-sky-500 mx-auto">
                        <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                    </svg>
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">How It Works</h2>
                    <p className="text-gray-600 dark:text-gray-300">Simple steps to improve your business credit</p>
                </div>

                <div className="mt-16 grid divide-x divide-y divide-gray-100/20 dark:divide-gray-700/20 overflow-hidden rounded-3xl border border-gray-100/20 dark:border-gray-700/20 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
                    {[
                        {
                            icon: <FaSignInAlt className='text-sky-500' size={25} />,
                            title: "Step 1: Sign In",
                            content: "Start by signing in or creating an account. This gives you access to our platform where you can securely integrate your financial data from various sources.",
                            gradient: "bg-gradient-to-br from-white via-sky-50/50 to-white dark:from-gray-800 dark:via-sky-900/10 dark:to-gray-800"
                        },
                        {
                            icon: <FaInfoCircle className='text-sky-500' size={25} />,
                            title: "Step 2: Provide Financial Data",
                            content: "Share your business's financial information by connecting various data sources. This helps us assess your credit score and financial health.",
                            gradient: "bg-gradient-to-bl from-white via-sky-50/50 to-white dark:from-gray-800 dark:via-sky-900/10 dark:to-gray-800"
                        },
                        {
                            icon: <FaBoxOpen className='text-sky-500' size={25} />,
                            title: "Step 3: Receive Your Credit Score",
                            content: "After integrating your financial data, our AI-powered system will generate a personalized credit score, along with actionable insights to improve it.",
                            gradient: "bg-gradient-to-tr from-white via-sky-50/50 to-white dark:from-gray-800 dark:via-sky-900/10 dark:to-gray-800"
                        },
                        {
                            icon: <FaLink className='text-sky-500' size={25} />,
                            title: "Step 4: Collaborate with Banks",
                            content: "Get access to loan opportunities from banking institutions that collaborate with us. Our AI assistant will guide you through the process and help boost your credit score over time.",
                            gradient: "bg-gradient-to-tl from-white via-sky-50/50 to-white dark:from-gray-800 dark:via-sky-900/10 dark:to-gray-800"
                        }
                    ].map((step, index) => (
                        <div key={index} className={`group relative transition hover:z-[1] hover:shadow-2xl hover:shadow-sky-500/10 ${step.gradient}`}>
                            <div className="relative space-y-8 py-12 p-8">
                                {step.icon}
                                <div className="space-y-2">
                                    <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-sky-500">
                                        {step.title}
                                    </h5>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {step.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Solution;