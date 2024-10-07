import React from 'react';
import NonBusinessImage from '../assets/img/nonbusiness.png';
// import Navbar from '../components/Navbar';

const NonBusinessPage: React.FC = () => {
    return (
        <div className="min-h-full flex flex-col justify-between font-lexend bg-white">
            {/* Navigation bar */}
            {/* <Navbar/> */}

            {/* Main content */}
            <div className=" container mx-auto my-6 md:my-10 flex flex-col items-center lg:mb-24 py-36">
                {/* Image */}
                <div className="max-w-full w-80 md:w-auto mb-6 md:mb-8">
                    <img src={NonBusinessImage} alt="Non-business email image" className="w-full h-auto" />
                </div>

                {/* Message */}
                <div className="text-center px-4 md:px-0">
                <p className="mb-4 text-primary font-normal text-xl">Unfortunately, we don't support <span className="font-bold">non-business email</span> addresses. Please sign up again with your business email.</p>
                    <p className="text-primary font-normal text-xl">If the issue keeps happening or you don't have another email, please contact <a href="mailto:info@pdienterprise.com" className="text-primary hover:underline font-bold">info@pdienterprise.com</a>, and our support team will get back to you soon.</p>
                </div>
            </div>

            {/* Footer */}
            {/* <footer className="bg-gray-800 text-white text-center p-2 md:p-4">
                © 2024 Freight Broker. All rights reserved.
            </footer> */}
        </div>
    );
};

export default NonBusinessPage;
