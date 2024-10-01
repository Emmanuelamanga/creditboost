import React from 'react';
import Container from '../Common/Container';
import { FaSignInAlt, FaInfoCircle, FaBoxOpen, FaLink } from 'react-icons/fa';

function Solution() {
    return (
        <div id="solution">
            <Container>
                <div className="md:w-2/3 lg:w-1/2">
                    <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
                        How to Get Started with Our Credit Improvement Solution
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Seamlessly integrate your financial data, get a credit score, and access loans to improve your business's credit health.
                    </p>
                </div>
                <div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
                    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                        <div className="relative space-y-8 py-12 p-8">
                            <FaSignInAlt className='text-[#EC4899]' size={25} />
                            <div className="space-y-2">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                    Step 1: Sign In
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Start by signing in or creating an account. This gives you access to our platform where you can securely integrate your financial data from various sources.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                        <div className="relative space-y-8 py-12 p-8">
                            <FaInfoCircle className='text-[#EC4899]' size={25} />
                            <div className="space-y-2">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                    Step 2: Provide Financial Data
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Share your business's financial information by connecting various data sources. This helps us assess your credit score and financial health.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                        <div className="relative space-y-8 py-12 p-8">
                            <FaBoxOpen className='text-[#EC4899]' size={25} />
                            <div className="space-y-2">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                    Step 3: Receive Your Credit Score
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    After integrating your financial data, our AI-powered system will generate a personalized credit score, along with actionable insights to improve it.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
                        <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
                            <FaLink className='text-[#f59f0bda]' size={25} />
                            <div className="space-y-2">
                                <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                                    Step 4: Collaborate with Banks
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Get access to loan opportunities from banking institutions that collaborate with us. Our AI assistant will guide you through the process and help boost your credit score over time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Solution;
