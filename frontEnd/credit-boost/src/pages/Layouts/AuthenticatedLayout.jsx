import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/logo-no-bg.png';
import { UserAccountDropdown } from '@/components/Common/UserAccountDropdown';

const AuthenticatedLayout = ({ children }) => {
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const location = useLocation();

    // Updated menu items with routes
    const menuItems = [
        { title: "Dashboard", icon: "mdi:view-grid", path: "/dashboard" },
        { title: "Credit Score", icon: "mdi:credit-card", path: "/credit-score" },
        { title: "Data Talk", icon: "mdi:database", path: "/data-talk" },
        { title: "Learn", icon: "mdi:school", path: "/learn" },
        { title: "Games", icon: "mdi:gamepad-circle-down", path: "/games" },
        { title: "Communities", icon: "mdi:account-group", path: "/communities" },
        { title: "Account Settings", icon: "mdi:account-cog", path: "/account-settings" },
    ];

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsMobileSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActivePath = (path) => {
        const currentPath = location.pathname;
        if (path === currentPath) return true;
        if (path !== '/') {
            return currentPath.startsWith(path) &&
                (currentPath === path || currentPath.charAt(path.length) === '/');
        }
        return path === '/';
    };  

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Top Navigation */}
            <header className="h-16 border-b border-border bg-white flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <Link to="/" aria-label="logo" className="flex items-center space-x-2">
                        <img src={logo} alt="Company Logo" className="w-50 h-10" />
                        <span>
                            <span className="font-brand text-brand-credit">CREDIT</span>
                            <span className="font-brand text-brand-boost text-primary">BOOST</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="md:hidden"
                    >
                        <Icon icon="mdi:menu" className="h-6 w-6 text-foreground" />
                    </button>
                    <button
                        onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                        className="hidden md:block"
                    >
                        <Icon icon="mdi:menu" className="h-6 w-6 text-foreground" />
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    {/* <Icon icon="mdi:bell" className="h-5 w-5 text-muted-foreground" /> */}
                    {/* <Icon icon="mdi:account" className="h-5 w-5 text-muted-foreground" /> */}
                    <UserAccountDropdown />
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar */}
                <aside
                    className={`fixed md:relative md:flex flex-col border-r border-border bg-white
                    ${isLeftSidebarOpen ? 'w-64' : 'w-16'} 
                    transition-all duration-300 ease-in-out
                    ${isMobileView ? 'hidden' : 'flex'} h-[calc(100vh-64px)]`}
                >
                    <div className="flex-1 py-4">
                        <nav className="space-y-2 px-2">
                            {menuItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative group"
                                >
                                    <Link
                                        to={item.path}
                                        className={`flex items-center w-full rounded-lg relative
                                            ${isLeftSidebarOpen ? 'px-4 py-2 justify-start' : 'p-2 justify-center'}
                                            ${isActivePath(item.path)
                                                ? 'bg-primary/10 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary'
                                                : 'hover:bg-primary/5'}
                                            transition-all duration-200`}
                                    >
                                        <Icon
                                            icon={item.icon}
                                            className={`h-5 w-5 ${isActivePath(item.path) ? 'text-primary' : 'text-foreground'}`}
                                        />
                                        {isLeftSidebarOpen && (
                                            <span className={`ml-3 text-sm ${isActivePath(item.path) ? 'text-primary' : ''}`}>
                                                {item.title}
                                            </span>
                                        )}
                                    </Link>
                                    {!isLeftSidebarOpen && (
                                        <div className="absolute left-full top-0 ml-2 hidden group-hover:block">
                                            <div className="bg-popover px-2 py-1 rounded shadow-lg">
                                                <span className="whitespace-nowrap text-sm">{item.title}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                    <button
                        onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                        className="hidden md:flex items-center justify-center h-10 border-t border-border hover:bg-muted"
                    >
                        {isLeftSidebarOpen ? (
                            <Icon icon="mdi:chevron-left" className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Icon icon="mdi:chevron-right" className="h-4 w-4 text-muted-foreground" />
                        )}
                    </button>
                </aside>

                {/* Mobile Sidebar */}
                {isMobileSidebarOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/50 z-40"
                            onClick={() => setIsMobileSidebarOpen(false)}
                        />
                        <aside className="fixed inset-y-0 right-0 w-64 bg-white border-l border-border z-50 flex flex-col">
                            <div className="h-16 border-b border-border flex items-center justify-between px-4">
                                <span className="font-brand font-semibold">Menu</span>
                                <button onClick={() => setIsMobileSidebarOpen(false)}>
                                    <Icon icon="mdi:close" className="h-5 w-5 text-muted-foreground" />
                                </button>
                            </div>
                            <nav className="flex-1 py-4 px-4 space-y-2">
                                {menuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.path}
                                        className={`flex items-center w-full px-4 py-2 rounded-lg relative
                                            ${isActivePath(item.path)
                                                ? 'bg-primary/10 font-medium before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary'
                                                : 'hover:bg-primary/5'}`}
                                        onClick={() => setIsMobileSidebarOpen(false)}
                                    >
                                        <Icon
                                            icon={item.icon}
                                            className={`h-5 w-5 ${isActivePath(item.path) ? 'text-primary' : 'text-foreground'}`}
                                        />
                                        <span className={`ml-3 text-sm ${isActivePath(item.path) ? 'text-primary' : ''}`}>
                                            {item.title}
                                        </span>
                                    </Link>
                                ))}
                            </nav>
                        </aside>
                    </>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-auto bg-background p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthenticatedLayout;