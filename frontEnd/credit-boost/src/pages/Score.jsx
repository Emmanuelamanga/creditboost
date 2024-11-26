import React, { useState, useContext } from 'react';
import Sidebar from '../components/SideBar';
import { MdDashboard, MdSell } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/DashboardNavbar';
import { FaRobot } from 'react-icons/fa6';
import { HiAcademicCap } from 'react-icons/hi';
import { BiCreditCard } from 'react-icons/bi';
import { BsCreditCard2FrontFill } from 'react-icons/bs';
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';

const AddProductPage = () => {
    //initialize navigation and cookies
    const navigate = useNavigate()
    //get app context
    const { updatedProfile, } = useContext(AppContext);
    //set state
    const [name, setName] = useState('');
    

    //menu items
    const Menus = [
        { title: "Dashboard", link: "/home", icon: <MdDashboard /> },
        { title: "Credit Score", link: "/score", icon: <BsCreditCard2FrontFill /> },
        { title: "Learn", link: "/academy", icon: <HiAcademicCap /> },
        //{ title: "Leads", link: "#", icon: <RiCustomerService2Fill /> },
        //{ title: "Settings", link: "#", icon: <FaCog /> },

    ];


    return (
        <AuthenticatedLayout>
            <main className="flex-1 px-4 overflow-y-auto">
                <div className="container mx-auto">
                    <div className="flex flex-col gap-8 py-4 mt-4 min-h-[86vh] ">
                        <div>
                        </div>                      
                        
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default AddProductPage;

