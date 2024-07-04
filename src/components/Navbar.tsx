import React, { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface NavbarProps {
    isAuthenticated: boolean; // Prop to determine if user is authenticated
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { logout, role } = useAuth(); // Use useAuth hook to get logout function and role

    const handleLogout = () => {
        logout(); // Call logout function from AuthContext to clear authentication state
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav className="bg-[#7783D2] px-4 py-8">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-white text-4xl lg:text-4xl font-normal hover:text-[#252F70]">
                    Freight Broker
                </a>
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
                            <a href="/" className="text-white hover:text-[#252F70] no-underline font-normal">
                                HOME
                            </a>
                            <a href="#services" className="text-white hover:text-[#252F70] no-underline font-normal">
                                SERVICES
                            </a>
                            <a href="#about" className="text-white hover:text-[#252F70] no-underline font-normal">
                                ABOUT US
                            </a>
                            <a href="/signup" className="text-white hover:text-[#252F70] no-underline font-normal">
                                CREATE ACCOUNT
                            </a>
                        </>
                    ) : role === 'admin' ? (
                        <>
                            <a href="/profile" className="text-white hover:text-[#252F70] no-underline font-normal">
                                PROFILE
                            </a>
                            <a href="/dashboard" className="text-white hover:text-[#252F70] no-underline font-normal">
                                DASHBOARD
                            </a>
                            <a href="/tracking" className="text-white hover:text-[#252F70] no-underline font-normal">
                                TRACKING
                            </a>
                            <a href="/notification" className="text-white hover:text-[#252F70] no-underline font-normal">
                                NOTIFICATION
                            </a>
                        </>
                    ) : (
                        <>
                            <a href="/profile" className="text-white hover:text-[#252F70] no-underline font-normal">
                                PROFILE
                            </a>
                            <a href="/dashboard" className="text-white hover:text-[#252F70] no-underline font-normal">
                                DASHBOARD
                            </a>
                            <a href="/notification" className="text-white hover:text-[#252F70] no-underline font-normal">
                                NOTIFICATION
                            </a>
                            <a href="/accounts-payable" className="text-white hover:text-[#252F70] no-underline font-normal">
                                ACCOUNTS PAYABLE
                            </a>
                            <a href="/quote-details" className="text-white hover:text-[#252F70] no-underline font-normal">
                                REQUEST A QUOTE
                            </a>
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
                    ref={ref as React.MutableRefObject<HTMLDivElement>}
                >
                    {(transitionRef) => (
                        <div
                            ref={transitionRef}
                            className={`lg:hidden absolute top-16 right-0 left-0 bg-[#7783D2] z-10 py-4 px-2 space-y-4 shadow-md mt-4`}
                        >
                            {!isAuthenticated ? (
                                <>
                                    <a href="#home" className="block text-white hover:text-[#252F70] text-center">
                                        HOME
                                    </a>
                                    <a href="#services" className="block text-white hover:text-[#252F70] text-center">
                                        SERVICES
                                    </a>
                                    <a href="#about" className="block text-white hover:text-[#252F70] text-center">
                                        ABOUT US
                                    </a>
                                    <a href="#create-account" className="block text-white hover:text-[#252F70] text-center">
                                        CREATE ACCOUNT
                                    </a>
                                </>
                            ) : role === 'admin' ? (
                                <>
                                    <a href="/profile" className="block text-white hover:text-[#252F70] text-center">
                                        PROFILE
                                    </a>
                                    <a href="/dashboard" className="block text-white hover:text-[#252F70] text-center">
                                        DASHBOARD
                                    </a>
                                    <a href="/tracking" className="block text-white hover:text-[#252F70] text-center">
                                        TRACKING
                                    </a>
                                    <a href="/notification" className="block text-white hover:text-[#252F70] text-center">
                                        NOTIFICATION
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a href="/profile" className="block text-white hover:text-[#252F70] text-center">
                                        PROFILE
                                    </a>
                                    <a href="/dashboard" className="block text-white hover:text-[#252F70] text-center">
                                        DASHBOARD
                                    </a>
                                    <a href="/notification" className="block text-white hover:text-[#252F70] text-center">
                                        NOTIFICATION
                                    </a>
                                    <a href="/accounts-payable" className="block text-white hover:text-[#252F70] text-center">
                                        ACCOUNTS PAYABLE
                                    </a>
                                    <a href="/quote-details" className="block text-white hover:text-[#252F70] text-center">
                                        REQUEST A QUOTE
                                    </a>
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
                    )}
                </Transition>
            </div>
        </nav>
    );
};

export default Navbar;
