import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../state/useAuthStore";


import NotificationModal from './NotificationModal';

interface NavbarProps {
    isAuthenticated: boolean; // Prop to determine if user is authenticated
}

const Navbar: React.FC<NavbarProps> = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { logout, isAuthenticated, role } = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleLogout = () => {
        logout(); // Call logout function from AuthContext to clear authentication state
        navigate('/login'); // Redirect to login page after logout
    };

    const handleNavigation = (path: string) => {
        if (path.startsWith('#')) {
            window.location.hash = path;
        } else {
            navigate(path);
        }
        setIsOpen(false); // Close the menu on navigation
    };
    const handleNotificationClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
        <nav className="bg-[#7783D2] px-4 py-8 ">
            <div className="container mx-auto flex justify-between items-center">
                <button
                    className="text-white text-4xl lg:text-4xl font-normal hover:text-[#252F70]"
                    onClick={() => handleNavigation('/')}
                >
                    Freight Broker
                </button>
                {/* Hamburger menu for small screens */}
                <div className="lg:hidden">
                    <button
                        className="text-white focus:outline-none focus:text-white bg-[#252F70] rounded p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Navigation links for medium screens and larger */}
                <div className="hidden lg:flex space-x-16 items-center">
                    {!isAuthenticated ? (
                        <>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/')}
                            >
                                HOME
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('#services')}
                            >
                                SERVICES
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('#about')}
                            >
                                ABOUT US
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('#contacts')}
                            >
                                CONTACTS
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/signup')}
                            >
                                CREATE ACCOUNT
                            </button>
                        </>
                    ) : role === 'admin' ? (
                        <>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/load-board')}
                            >
                                LOADBOARD
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/admin-dashboard')}
                            >
                                DASHBOARD
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/trailer-options')}
                            >
                                TRUCKS
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/notification')}
                            >
                                NOTIFICATION
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/profile')}
                            >
                                PROFILE
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/admin-dashboard')}
                            >
                                DASHBOARD
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={handleNotificationClick}
                            >
                                NOTIFICATION
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/user-payables')}
                            >
                                ACCOUNTS PAYABLE
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/trailer-options')}
                            >
                                TRUCKS
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/distance-calculator')}
                            >
                                REQUEST A QUOTE
                            </button>
                            <button
                                className="text-white no-underline font-normal transition duration-300 hover:text-[#252F70]"
                                onClick={() => handleNavigation('/profile')}
                            >
                                PROFILE
                            </button>
                        </>
                    )}
                    {isAuthenticated && (
                        <Button
                            label="LOGOUT"
                            size="medium"
                            bgColor="#252F70"
                            hoverBgColor="white"
                            onClick={handleLogout}
                            type=""
                        />
                    )}
                    {!isAuthenticated && (
                        <div className="flex justify-center items-center h-full">
                            <Button
                                label="LOGIN"
                                size="medium"
                                bgColor="#252F70"
                                hoverBgColor="white"
                                onClick={() => navigate('/login')}
                                type=""
                            />
                        </div>
                    )}
                </div>

                {/* Responsive Navigation Menu */}
               
                <Transition
                    show={isOpen}
                    enter="transition duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition duration-300 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="lg:hidden absolute top-16 right-0 left-0 bg-[#7783D2] z-10 py-4 px-2 space-y-4 shadow-md mt-4 pl-4">
                        {!isAuthenticated ? (
                            <>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/')}
                                >
                                    HOME
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('#services')}
                                >
                                    SERVICES
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('#about')}
                                >
                                    ABOUT US
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('#contacts')}
                                >
                                    CONTACTS
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/signup')}
                                >
                                    CREATE ACCOUNT
                                </button>
                            </>
                        ) : role === 'admin' ? (
                            <>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/load-board')}
                                >
                                    LOADBOARD
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/admin-dashboard')}
                                >
                                    DASHBOARD
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/trailer-options')}
                                >
                                    TRUCKS
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/notification')}
                                >
                                    NOTIFICATION
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/profile')}
                                >
                                    PROFILE
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/dashboard')}
                                >
                                    DASHBOARD
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/notification')}
                                >
                                    NOTIFICATION
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/user-payables')}
                                >
                                    ACCOUNTS PAYABLE
                                </button>
                                <button
                                className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                onClick={() => handleNavigation('/trailer-options')}
                            >
                                TRUCKS
                            </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/distance-calculator')}
                                >
                                    REQUEST A QUOTE
                                </button>
                                <button
                                    className="block text-white hover:text-[#252F70] text-center transition duration-300"
                                    onClick={() => handleNavigation('/profile')}
                                >
                                    PROFILE
                                </button>
                            </>
                        )}
                        {isAuthenticated && (
                            <div className="flex justify-center items-center h-full">
                                <Button
                                    label="LOGOUT"
                                    size="small"
                                    bgColor="#252F70"
                                    hoverBgColor="white"
                                    onClick={handleLogout}
                                    type=""
                                />
                            </div>
                        )}
                        {!isAuthenticated && (
                            <div className="flex justify-center items-center h-full">
                                <Button
                                    label="LOGIN"
                                    size="small"
                                    bgColor="#252F70"
                                    hoverBgColor="white"
                                    onClick={() => navigate('/login')}
                                    type=""
                                />
                            </div>
                        )}
                    </div>
                </Transition>

            </div>
        </nav>
        <NotificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Navbar;
