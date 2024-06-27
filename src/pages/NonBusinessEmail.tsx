import React from 'react';
import NonBusinessImage from '../assets/img/nonbusiness.png';

const NonBusinessPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-between font-lexend">
            {/* Navigation bar */}
            <nav className="bg-secondary text-white flex justify-between items-center px-4 md:px-40 py-4 md:py-10">
                <div className="flex items-center">
                    <span className="text-2xl md:text-4xl font-bold">Freight Broker</span>
                </div>
                <div>
                    <a href="#" className="text-white hover:underline">Sign Out</a>
                </div>
            </nav>

            {/* Main content */}
            <div className="container mx-auto flex-grow flex flex-col items-center md:mb-20 mt-6 md:mt-10">
                {/* Image */}
                <div className="max-w-full w-80 md:w-auto mb-6 md:mb-8">
                    <img src={NonBusinessImage} alt="Non-business email image" className="rounded-lg shadow-md w-full h-auto" />
                </div>

                {/* Message */}
                <div className="text-center px-4 md:px-0 py-12">
                    <p className="mb-4 text-primary font-normal text-xl">Unfortunately, we don't support <span className="font-bold">non-business email</span> addresses. Please sign up again with your business email.</p>
                    <p className="text-primary font-normal text-xl">If the issue keeps happening or you don't have another email, please contact <a href="mailto:info@pdienterprise.com" className="text-primary hover:underline font-bold">info@pdienterprise.com</a>, and our support team will get back to you soon.</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-secondary text-white text-center p-2 md:p-4">
                © 2024 Freight Broker. All rights reserved.
            </footer>
        </div>
    );
};

export default NonBusinessPage;
