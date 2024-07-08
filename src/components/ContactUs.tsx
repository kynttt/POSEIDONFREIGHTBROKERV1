import React from 'react';
import Button from './Button';

const ContactForm: React.FC = () => {
  return (
    <div id='contacts' className="bg-light-grey flex items-center justify-center w-screen p-4 pb-10">
      <div className="p-8 container w-screen">
        <h1 className="text-center text-2xl font-normal tracking-wider mb-8 text-blue-900 py-2">CONTACT US</h1>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-20">
        
          <div className="md:w-1/3">
            <h2 className="text-3xl font-semibold text-blue-900 py-4">Drop us a line</h2>
            <form className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-white w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 font-light"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-white w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 font-light"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-white w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 font-light"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  className="bg-white w-full h-32 px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 font-light"
                ></textarea>
              </div>
              <div className='flex justify-center items-center'>
              <Button
                    label="SUBMIT"
                    size="contactButton"
                    bgColor="#252F70"
                    hoverBgColor="white"
                    onClick={{} = {}} // Pass handlePickup directly as onClick handler
                    className="extra-class-for-medium-button"
        />
              </div>
            </form>
          </div>
          
          
          <div className="md:w-2/4 mt-8 md:mt-0 py-4">
            <h2 className="text-3xl font-semibold mb-4 text-blue-900">Our Location</h2>
            <div className="relative w-full h-64 md:h-96">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2705.8242246418104!2d-122.23099992322068!3d47.298234509220336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549058759e5a35ef%3A0x737cc87bb84238e0!2s1020%20A%20St%20SE%20%23%207%2C%20Auburn%2C%20WA%2098002%2C%20USA!5e0!3m2!1sen!2sph!4v1719465675435!5m2!1sen!2sph"
                    className="w-full h-full border-0 rounded-md"
                    style={{ minHeight: '300px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
