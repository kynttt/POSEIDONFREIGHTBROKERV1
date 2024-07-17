import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../assets/img/404.png';
import Button from '../components/Button'; // Make sure this path is correct
// import Navbar from '../components/Navbar';
import { useAuthStore } from '../state/useAuthStore';




const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    return (
        <>
        {/* <Navbar isAuthenticated={isAuthenticated} /> */}
        <div className=" border h-screen flex flex-col items-center justify-center bg-white text-center lg:pb-32 pb-4">
            <div className="flex justify-center items-center mb-4">
                <img src={NotFoundImage} alt="404" className="max-w-full h-auto" />
            </div>
            <h1 className="text-2xl font-bold text-secondary mb-2">PAGE NOT FOUND</h1>
            <p className="text-gray-500 mb-4 font-normal">
                Uh oh, we can't seem to find the page you're looking for.
                <p>
                    Try going back to the previous page or see our Help Center for more information.
                </p>
            </p>
            <Button
                label="Go Back"
                size="medium"
                bgColor="#252F70"
                hoverBgColor="white"
                onClick={() => navigate(-1)} type={''} />
        </div>
        </>
    );
};

export default NotFound;
