import React, { useState } from 'react';
import { useAuth } from './useAuth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableColumns, faMoneyCheckDollar, faCalculator, faBell, faUser, faTruckFront, faListUl, faTruckFast, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import NotificationModal from './NotificationModal';



interface SidebarProps {
    isAuthenticated: boolean;
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { logout, role } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout(); // Call logout function from AuthContext to clear authentication state
        navigate('/login'); // Redirect to login page after logout
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsOpen(false); // Close sidebar after navigation if needed
    };

    const handleNotificationClick = () => {
        setIsModalOpen(true);
    };

    console.log('User authenticated?', isAuthenticated);
    console.log('User role:', role);

    return (
        <>
            {/* Hamburger menu for smaller screens */}
            <div className="sm:hidden fixed top-0 right-0 z-50">
                <button
                    onClick={toggleSidebar}
                    className="flex items-center justify-center h-12 w-12 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-full shadow-md"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`${
                    isOpen ? 'left-0' : '-left-full'
                } sm:left-0 fixed sm:relative sm:flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 transition-transform duration-300`}
            >
                <a href="#">
                    <h2 className="text-2xl text-secondary">Freight Broker</h2>
                </a>

                <div className="relative mt-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </span>

                    <input
                        type="text"
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                        placeholder="Search"
                    />
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6 gap-2">
                    <nav>
                    {role === 'admin' ? (
                        <>
                        <button
                            className="w-full flex items-center px-4 py-4 mb-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/admin-dashboard')}
                        >
                            <FontAwesomeIcon icon={faTableColumns} />

                            <span className="font-medium ml-6 text-gray-500">Dashboard</span>
                        </button>
                        <button
                            className="w-full flex items-center px-4 py-4 mb-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/load-board')}
                        >
                            <FontAwesomeIcon icon={faListUl} />

                            <span className="font-medium ml-6 text-gray-500">Load Board</span>
                        </button>
                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/legal-page')}
                        >
                            <FontAwesomeIcon icon={faFolderOpen} />

                            <span className="font-medium ml-6 text-gray-500">Documents</span>
                        </button>
                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/report-details ')}
                        >
                            <FontAwesomeIcon icon={faTruckFast} />

                            <span className="font-medium ml-6 text-gray-500">Transactions</span>
                        </button>
                        
                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/trailer-options')}
                        >
                            <FontAwesomeIcon icon={faTruckFront} />

                            <span className="font-medium ml-6 text-gray-500">Trucks</span>
                        </button>
                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={handleNotificationClick}
                        >
                            <FontAwesomeIcon icon={faBell} />

                            <span className="font-medium ml-6 text-gray-500">Notification</span>
                        </button>
                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/profile')}
                        >
                            <FontAwesomeIcon icon={faUser} />

                            <span className="font-medium ml-6 text-gray-500">Profile</span>
                        </button>
                        </>
                    ): (
                        <>
                        <button
                            className="w-full flex items-center px-4 py-4 mb-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/admin-dashboard')}
                        >
                            <FontAwesomeIcon icon={faTableColumns} />

                            <span className="font-medium ml-6 text-gray-500">Dashboard</span>
                        </button>

                        

                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/user-payables')}
                        >
                            <FontAwesomeIcon icon={faMoneyCheckDollar} />

                            <span className="font-medium ml-6 text-gray-500">Payables</span>
                        </button>
                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/trailer-options')}
                        >
                            <FontAwesomeIcon icon={faTruckFront} />

                            <span className="font-medium ml-6 text-gray-500">Trucks</span>
                        </button>

                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/distance-calculator')}
                        >
                            <FontAwesomeIcon icon={faCalculator} />

                            <span className="font-medium ml-6 text-gray-500">Request Quote</span>
                        </button>

                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={handleNotificationClick}
                        >
                            <FontAwesomeIcon icon={faBell} />

                            <span className="font-medium ml-6 text-gray-500">Notification</span>
                        </button>

                        <button
                            className="w-full flex items-center px-4 py-4 my-2 text-gray-500 rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#252F70] dark:hover:text-[#252F70] transition duration-300"
                            onClick={() => handleNavigation('/profile')}
                        >
                            <FontAwesomeIcon icon={faUser} />

                            <span className="font-medium ml-6 text-gray-500">Profile</span>
                        </button>
                        </>
                    )}
                    {isAuthenticated && (
                            <div className="flex justify-center   lg:mt-8">
                                <Button
                                    label="Logout"
                                    size="quoteButton"
                                    bgColor="#252F70"
                                    hoverBgColor="white"
                                    onClick={handleLogout}
                                    type=""
                                />
                            </div>
                        )}
                        {!isAuthenticated && (
                            <div className="flex justify-center   lg:mt-8">
                                <Button
                                    label="Login"
                                    size="quoteButton"
                                    bgColor="#252F70"
                                    hoverBgColor="white"
                                    onClick={() => navigate('/login')}
                                    type=""
                                />
                            </div>
                        )}

                    </nav>

                    <button className="flex items-center px-4 -mx-2 mt-5">
                        <img
                            className="object-cover mx-2 rounded-full h-9 w-9"
                            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                            alt="avatar"
                        />
                        <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
                            John Doe
                        </span>
                        
                    </button>
                    
                </div>
            </aside>
            <NotificationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Sidebar;
