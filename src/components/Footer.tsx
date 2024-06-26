import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-secondary text-white py-8">
            <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div>
                    <h2 className="font-medium mb-4 text-2xl">Freight Brokerage</h2>
                    <ul>
                        <li className='font-light'>Full Truckload</li>
                        <li className='font-light'>Flat Bed</li>
                        <li className='font-light'>Refrigerated Trailer</li>
                        <li className='font-light'>Dry Van</li>
                    </ul>
                </div>
                <div className='lg:ml-40'>
                    <h2 className="font-medium mb-4 text-2xl">Services</h2>
                    <ul>
                        <li className='font-light'>Carriers</li>
                        <li className='font-light'>Brokers</li>
                        <li className='font-light'>Shippers</li>
                    </ul>
                </div>
                <div className='lg:ml-24'>
                    <h2 className="font-medium mb-4 text-2xl">Quick Links</h2>
                    <ul>
                        <li className='font-light'>About Us</li>
                        <li className='font-light'>Services</li>
                        <li className='font-light'>Careers</li>
                        <li className='font-light'>FAQs</li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-medium mb-4 text-2xl">Connect with us</h2>
                    <address>
                        <p className='font-light'>Freight Brokerage</p>
                        <p className='font-light'>1020 A St SE Suit 7 Auburn WA 98002</p>
                        <p className='font-light'>Email: <a href="mailto:info@pdienterprise.com" className="text-white underline font-light">info@pdienterprise.com</a></p>
                        <p className='font-light'>PHONE: <a href="tel:+12532691300" className="text-white underline font-light">(253) 269 1300</a></p>
                        <p className='font-light'>FAX: <a href="tel:+12532895660" className="text-white underline font-light">(253) 289 5660</a></p>
                    </address>
                </div>
            </div>
            <div className="border-t-2 border-white mt-8 pt-4">
                <p className="text-center font-light">&copy; 2024 Freight Brokerage - All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
