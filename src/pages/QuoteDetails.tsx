// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import sampleData from './sampleData.json';
// import Button from '../components/Button';
// import { calculatePrice } from '../utils/priceCalculator';
// import { useAuth } from '../components/useAuth';
// import SideBar from '../components/SideBar';


// const QuoteDetails: React.FC = () => {
//     const navigate = useNavigate();
//     const { isAuthenticated } = useAuth();

//     console.log('User authenticated?', isAuthenticated);

//     const [pickUpLocation, setPickUpLocation] = useState('');
//     const [pickUpState, setPickUpState] = useState('');
//     const [deliveryLocation, setDeliveryLocation] = useState('');
//     const [deliveryState, setDeliveryState] = useState('');
//     const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
//     const [trailerType, setTrailerType] = useState('');
//     const [trailerSize, setTrailerSize] = useState('');
//     const [commodity, setCommodity] = useState('');
//     const [maxWeight, setMaxWeight] = useState('');
//     const [companyName, setCompanyName] = useState('');
//     const [price, setPrice] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
//     const [availableDeliveryLocations, setAvailableDeliveryLocations] = useState<string[]>([]);

//     useEffect(() => {
//         if (pickUpLocation) {
//             setAvailableDeliveryLocations(Object.keys(sampleData.distances[pickUpLocation] || {}));
//         } else {
//             setAvailableDeliveryLocations([]);
//         }
//     }, [pickUpLocation]);

//     useEffect(() => {
//         setIsLoading(true);
//         const newPrice = calculatePrice(
//             pickUpLocation,
//             deliveryLocation,
//             trailerType,
//             trailerSize,
//             maxWeight,
//             sampleData.distances
//         );

//         setTimeout(() => {
//             setPrice(newPrice);
//             setIsLoading(false);
//         }, 1300);
//     }, [pickUpLocation, deliveryLocation, trailerType, trailerSize, maxWeight]);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Form submitted");
//     };

//     const handleQuoteButtonClick = () => {
//         if (!isAuthenticated) {
//             navigate('/login'); // Redirect to login page if not authenticated
//         } else {
//             navigate('/payment-option'); // Redirect to payment-method page if authenticated
//         }
//     };

//     return (
//         <div className='flex h-screen'>
//             {/* <Navbar isAuthenticated={isAuthenticated} /> */}
//             <SideBar isAuthenticated={isAuthenticated} />
//             <div className="flex-1 bg-white min-h-screen overflow-y-auto">
//                 <form onSubmit={handleSubmit} className="max-w-6xl mx-auto py-10 px-4">
//                     <div className="mb-6">
//                         <h2 className="text-2xl font-semibold lg:mb-20 text-secondary">PICK UP DETAILS</h2>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         {/* PICK UP */}
//                         <div className="mb-8 md:mb-0">
//                             <h3 className="text-lg font-semibold text-secondary mb-4">PICK UP</h3>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     Pick Up Location <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     value={pickUpLocation}
//                                     onChange={(e) => setPickUpLocation(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
//                                 >
//                                     <option className="text-primary font-normal" value="">Select Pick Up Location</option>
//                                     {Object.keys(sampleData.distances).map(location => (
//                                         <option className="text-primary font-normal" key={location} value={location}>{location}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     State <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="State"
//                                     value={pickUpState}
//                                     onChange={(e) => setPickUpState(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     Pick Up Date <span className="text-red-500">*</span>
//                                 </label>
//                                 <div className="relative">
//                                     <DatePicker
//                                         selected={pickUpDate}
//                                         onChange={(date) => setPickUpDate(date)}
//                                         className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
//                                         placeholderText="MM/DD/YYYY"
//                                         dateFormat="MM/dd/yyyy"
//                                     />
//                                     <div
//                                         className="absolute top-2 right-2 cursor-pointer"
//                                         onClick={() => {
//                                             const datePickerInput = document.querySelector('.react-datepicker-wrapper input') as HTMLInputElement;
//                                             if (datePickerInput) {
//                                                 datePickerInput.focus();
//                                             }
//                                         }}
//                                     >
//                                         <FontAwesomeIcon icon={faCalendarAlt} className="text-secondary" />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     Trailer Type <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     value={trailerType}
//                                     onChange={(e) => setTrailerType(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white text-black font-thin text-black"
//                                 >
//                                     <option className="text-primary font-normal" value="">Select Trailer Type</option>
//                                     <option className="text-primary font-normal" value="Flat Bed">Flat Bed</option>
//                                     <option className="text-primary font-normal" value="Dry Van">Dry Van</option>
//                                     <option className="text-primary font-normal" value="Refrigerated">Refrigerated</option>
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     Trailer Size <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     value={trailerSize}
//                                     onChange={(e) => setTrailerSize(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white text-black font-thin text-black"
//                                 >
//                                     <option className="text-primary font-normal" value="">Select Trailer Size</option>
//                                     <option className="text-primary font-normal" value="48 ft">48 ft</option>
//                                     <option className="text-primary font-normal" value="53 ft">53 ft</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* DROP */}
//                         <div className="mb-8 md:mb-0 lg:border-l-4 lg:border-secondary lg:pl-8">
//                             <h3 className="text-lg font-semibold text-secondary mb-4">DROP</h3>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     Delivery Location <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     value={deliveryLocation}
//                                     onChange={(e) => setDeliveryLocation(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
//                                     disabled={!pickUpLocation}
//                                 >
//                                     <option className="text-primary font-normal" value="">Select Delivery Location</option>
//                                     {availableDeliveryLocations.map(location => (
//                                         <option className="text-primary font-normal" key={location} value={location}>{location}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     State <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="State"
//                                     value={deliveryState}
//                                     onChange={(e) => setDeliveryState(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
//                                 />
//                             </div>
//                         </div>

//                         {/* ADDITIONAL DETAILS */}
//                         <div className="mb-8 md:mb-0 lg:border-l-4 lg:border-secondary lg:pl-8">
//                             <h3 className="text-lg font-semibold text-secondary mb-4">ADDITIONAL DETAILS</h3>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     Commodity <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="e.g. Fruits"
//                                     value={commodity}
//                                     onChange={(e) => setCommodity(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     Max Wt. <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="e.g. 1000lbs"
//                                     value={maxWeight}
//                                     onChange={(e) => setMaxWeight(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-primary font-normal mb-2">
//                                     Company Name <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter your company name"
//                                     value={companyName}
//                                     onChange={(e) => setCompanyName(e.target.value)}
//                                     className="w-full border border-gray-300 p-2 rounded-md bg-white font-thin text-black"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-light-grey p-4 shadow-lg flex flex-col lg:flex-row justify-between items-center lg:mt-16 rounded-lg">
//                         {isLoading ? (
//                             <div className="text-2xl font-medium text-primary mb-4 lg:mb-0 lg:mr-4 p-4 rounded-lg">
//                                 Loading...
//                             </div>
//                         ) : (
//                             <div className="text-2xl font-medium text-gray-500 mb-4 lg:mb-0 lg:mr-4 p-4 rounded-lg">
//                                 Price: <span className='font-normal italic text-primary'>${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
//                             </div>
//                         )}
//                         <Button
//                             label="GET THIS QUOTE"
//                             size="xl"
//                             bgColor="#7783D2"
//                             hoverBgColor="white"
//                             onClick={handleQuoteButtonClick}
//                             className="extra-class-for-medium-button"
//                             type="button"
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default QuoteDetails;
