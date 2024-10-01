//"use client"
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { MdDashboard } from "react-icons/md";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import ControlImg from "/control.png"
import LogoDark from "/logo_d.png"
import { Link,useLocation  } from "react-router-dom";

const Sidebar = ({ isOpen, Menus }) => {
    //get current location
    const location = useLocation();

    const { logout } = useContext(AppContext)
    const [open, setOpen] = useState(isOpen);

    const topMenus = [
        { title: "Dashboard", icon: <MdDashboard /> },
        { title: "Settings", icon: <FaCog /> },
    ];

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <div className={`sticky md:block`}>
            <div className={`${open ? "w-60" : "w-20"}   h-screen p-4 flex flex-col justify-between relative duration-300`}>
                {/* <img
                    src={ControlImg}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                        border-2 rounded-full ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                /> */}

                <ul className="sideBar flex flex-col relative   overflow-y-auto custom-scrollbar">
                    <li className="flex ml-[1em] flex-row gap-3 mb-10 items-center">
                        {/* <img
                            src={LogoDark}
                            className="h-12"
                        /> */}
                        <p className="font-semibold">Credit<span className="text-pink-400">Boost</span></p>
                    </li>
                    {/* <li className="flex border rounded-lg mb-4 mt-8 p-2">
                        <input
                            className="outline-none "
                            placeholder="Search"
                        />
                    </li> */}
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex w-full cursor-pointer hover:bg-light-white text-sm items-center 
                            ${Menu.gap ? "absolute bottom-6" : "mt-2"} ${Menu.link === location.pathname && "active"}`}
                            onClick={Menu.action}
                        >


                            {Menu.action ? (
                                <div onClick={Menu.action} className="flex h-[2.75em] w-full  menuItems   md:text-base font-semibold items-center ">
                                    <div className="icon">{Menu.icon}</div>
                                    <span className={`${!open && "hidden"}  origin-left duration-200`}>
                                        {Menu.title}
                                    </span>
                                </div>
                            ) : (
                                <Link to={Menu.link} className="flex menuItems h-[2.75em] w-full  md:text-base font-semibold items-center">
                                    <div className=" icon">{Menu.icon}</div>
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        {Menu.title}
                                    </span>
                                </Link>
                            )}

                        </li>
                    ))}

                    {/* {History ? (
                        <>
                            <li className={`p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-6`}>
                                <div className="flex gap-x-4">
                                    <BsRobot />
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                                        Chats
                                    </span>
                                </div>
                            </li>
                            {History.length > 0 && History.map((Menu, index) => (
                                <li
                                    key={index}
                                    className={`p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2`}
                                >
                                    <a href='#' className="">
                                        <p className={`${!open && "hidden"} h-4 overflow-clip origin-left duration-200`}>
                                            {Menu.chatName}
                                        </p>
                                    </a>
                                </li>
                            ))}
                        </>
                    ) : (
                        <li></li>
                    )} */}


                </ul>
                <div className={` p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4
                             bottom-6 mt-2 z-30  w-full relative`}
                    onClick={logout}
                >
                    <div className="flex md:text-base font-semibold items-center gap-x-4">
                        <FaSignOutAlt className="" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            Sign Out
                        </span>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Sidebar;