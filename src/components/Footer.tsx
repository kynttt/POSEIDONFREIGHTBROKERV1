// import React from 'react';

const Footer = () => {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#B7C0F9] text-gray-300 xs:px-[2rem] md:px-[8rem] lg:px-[12rem]">
      <div className="py-6  flex lg:justify-between border-b-2 border-white pt-10 xs:flex-col lg:flex-row ">
        {/* Left Side (Freight Brokerage) */}
        <div className="w-full md:w-auto  md:mb-0  lg:mt-10">
          <h2 className="text-3xl md:text-5xl text-primary font-bold md:mb-5">
            Freight Brokerage
          </h2>
        </div>

        {/* Right Side (Trailers, Services, Quick Links, Connect with us) */}
        <div className="flex  w-full md:w-auto gap-8 lg:gap-20 mt-8 md:mt-0  xs:flex-col lg:flex-row">
          <Trailers />
          <Services />
          <QuickLinks />
          <ConnectWithUs />
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center lg:mr-20 text-primary font-light">
        <p>
          Copyright &copy; {currentYear} Freight Brokerage - All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};
const Trailers: React.FC = () => {
  return (
    <div className="w-full md:w-auto mb-4 md:mb-0">
      <TitleWrapper>Trailers</TitleWrapper>
      <OptionWrapper>
        <li>Flatbeds</li>
        <li>Step Decks</li>
        <li>Reefers</li>
        <li>Dry Vans</li>
      </OptionWrapper>
    </div>
  );
};
const Services: React.FC = () => {
  return (
    <div className="w-full md:w-auto mb-4 md:mb-0">
      <TitleWrapper>Services</TitleWrapper>
      <OptionWrapper>
        <li>Carriers</li>
        <li>Brokers</li>
        <li>Shippers</li>
      </OptionWrapper>
    </div>
  );
};
const QuickLinks: React.FC = () => {
  return (
    <div className="w-full md:w-auto mb-4 md:mb-0">
      <TitleWrapper>Quick Links</TitleWrapper>
      <OptionWrapper>
        <li>About Us</li>
        <li>Services</li>
        <li>Careers</li>
        <li>FAQs</li>
      </OptionWrapper>
    </div>
  );
};
const ConnectWithUs: React.FC = () => {
  return (
    <div className="w-full md:w-auto mb-4 md:mb-0 text-primary font-light">
      <TitleWrapper>Connect with Us</TitleWrapper>
      <OptionWrapper>
        <p>Freight Brokerage</p>
        <p className="mb-2">1020 A St SE Suit 7 Auburn WA 98002</p>
        <p>Email: info@pdienterprise.com</p>
        <p>PHONE: (253) 269 1300</p>
        <p>FAX: (253) 289 5660</p>
      </OptionWrapper>
    </div>
  );
};
interface TitleWrapperProps {
  children: React.ReactNode;
}

interface OptionWrapperProps {
  children: React.ReactNode;
}
const TitleWrapper: React.FC<TitleWrapperProps> = ({ children }) => {
  return (
    <div className="font-bold mb-2 xs:text-lg md:text-3xl lg:text-lg text-primary">
      {children}
    </div>
  );
};

const OptionWrapper = ({ children }: OptionWrapperProps) => {
  return (
    <div className="list-none text-primary font-light xs:text-md md:text-2xl lg:text-base">
      {children}
    </div>
  );
};
export default Footer;
