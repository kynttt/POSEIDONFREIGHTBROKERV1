// import React from 'react';

const Footer = () => {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#B7C0F9] text-gray-300">
      <div className="mx-auto py-6 lg:mx-24 px-6 flex flex-wrap lg:justify-between border-b-2 border-white pt-10">
        {/* Left Side (Freight Brokerage) */}
        <div className="w-full md:w-auto mb-8 md:mb-0 flex-shrink-0 lg:mt-10">
          <h2 className="text-3xl md:text-5xl text-primary font-bold md:mb-5">Freight Brokerage</h2>
        </div>

        {/* Right Side (Trailers, Services, Quick Links, Connect with us) */}
        <div className="flex flex-wrap w-full md:w-auto gap-8 lg:gap-20 mt-8 md:mt-0">
          
          {/* Trailers */}
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h3 className="font-bold mb-2 text-lg text-primary">Trailers</h3>
            <ul className="list-none text-primary font-light">
              <li>Full Truckload</li>
              <li>Flat Bed</li>
              <li>Refrigerated Trailer</li>
              <li>Dry Van</li>
            </ul>
          </div>

          {/* Services */}
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h3 className="font-bold mb-2 text-lg text-primary">Services</h3>
            <ul className="list-none text-primary font-light">
              <li>Carriers</li>
              <li>Brokers</li>
              <li>Shippers</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h3 className="font-bold mb-2 text-lg text-primary">Quick Links</h3>
            <ul className="list-none text-primary font-light">
              <li>About Us</li>
              <li>Services</li>
              <li>Careers</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Connect with us */}
          <div className="w-full md:w-auto mb-4 md:mb-0 text-primary font-light">
            <h3 className="font-bold mb-2 text-lg text-primary">Connect with us</h3>
            <p>Freight Brokerage</p>
            <p className="mb-2">1020 A St SE Suit 7 Auburn WA 98002</p>
            <p>Email: info@pdienterprise.com</p>
            <p>PHONE: (253) 269 1300</p>
            <p>FAX: (253) 289 5660</p>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center lg:mr-20 text-primary font-light">
        <p>Copyright &copy; {currentYear} Freight Brokerage - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
