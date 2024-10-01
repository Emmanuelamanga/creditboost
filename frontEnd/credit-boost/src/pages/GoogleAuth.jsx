import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import LogoD from '/logo_d.png'
import { toast } from 'react-toastify';
import { socialAxiosInstance } from '../api/socialAuth';


const GoogleAuth = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Access the global state
    const { setName, setUpdatedProfile, setIsAuthenticated } = useContext(AppContext);
    //initialize navigation 
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const effectRan = useRef(false)

    //baseurl
    const baseURL = import.meta.env.VITE_PRODUCTION === 'true'
        ? import.meta.env.VITE_PROD_URL
        : import.meta.env.VITE_DEV_URL;

    useEffect(() => {
        const state = searchParams.get('state');
        const code = searchParams.get('code');


        if (state && code && !effectRan.current) {

            const authenticate = async () => {
                //console.log('auth running')
                try {

                    const response = await socialAxiosInstance.post(
                        `${baseURL}/o/google-oauth2/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
                        // {
                        //     method: 'POST',
                        //     headers: {
                        //         Accept: 'application/json',
                        //         'Content-Type': 'application/x-www-form-urlencoded',
                        //     },
                        //     credentials: 'include',
                        // }
                    );

                    console.log(response)

                    if (!response.ok) {
                        throw new Error('Failed to authenticate');
                    }

                    const data = await response.json();

                    // Assuming the API returns a success flag and user data
                    if (data.success) {
                        setIsAuthenticated(true);
                        // Update global state with  data
                        setName(response.data.name);
                        setUpdatedProfile(response.data.details_updated)
                        toast.success('Logged in');
                        navigate('/dashboard');
                    } else {
                        toast.error('Failed to log in');
                        navigate('/auth/login');
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message || 'Failed to log in');
                    navigate('/login');
                }
            };

            authenticate();
            effectRan.current = true;
        }
    }, [])


    return (
        <div className='w-full '>
            {/* 758d93 */}
            {/* <LandingNavbar /> */}
            <main className='flex min-h-[85vh] items-center justify-center'>

                <div className='md:w-[38%] w-[80%] '>
                    <div className='flex justify-center'>
                        <img src={LogoD} className='h-16 w-16 mb-8 ' />
                    </div>

                    <div className='flex justify-center'>
                        <p type="submit"
                            className='border p-3 rounded-lg  py-3 '
                        >Authenticating , you will be redirected in a second ..
                        </p>
                    </div>
                </div>
            </main>
            {/* <Foooter /> */}
        </div>
    );
};

export default GoogleAuth;
