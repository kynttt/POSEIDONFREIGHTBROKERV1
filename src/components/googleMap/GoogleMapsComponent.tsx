import { Libraries } from '@react-google-maps/api';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import { OriginInput, DestinationInput } from './Inputs';
import { MapComponent } from './MapComponent';
import { calculateRoute } from './utils';
import SideBar from '../../components/SideBar';
// import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/Button';
import { useAuthStore } from '../../state/useAuthStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faTruck, faBox, faWeight, faBuilding, faMapLocationDot, faMoneyBillWave, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { createQuote } from '../../lib/apiCalls';
import { calculatePrice } from './priceCalculator';

// Import truck types and sizes data
import truckTypes from './truckTypes.json';
import truckSizes from './truckSizes.json';
import Calendar from '../Calendar';

const libraries: Libraries = ['places'];
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API || ''; // Provide an empty string as a fallback




const QuoteDetails: React.FC = () => {
    // const handleDateSelect = (date: Date) => {

    // };
    const navigate = useNavigate();
    // const { isAuthenticated, login } = useAuth();
    const { isAuthenticated, userId } = useAuthStore(state => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId, // Make sure userId is part of your store
    }));

    useEffect(() => {

    }, [isAuthenticated]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsApiKey,
        libraries: libraries,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [autocompleteA, setAutocompleteA] = useState<google.maps.places.Autocomplete | null>(null);
    const [autocompleteB, setAutocompleteB] = useState<google.maps.places.Autocomplete | null>(null);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [originLocation, setOriginLocation] = useState<google.maps.LatLng | null>(null);
    const [destinationLocation, setDestinationLocation] = useState<google.maps.LatLng | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [distance, setDistance] = useState('');
    const [price, setPrice] = useState<number | null>(null); // State to hold calculated price

    const [pickupDate, setPickupDate] = useState('');
    const [selectedTrailerType, setSelectedTrailerType] = useState<string>('');
    const [selectedTrailerSize, setSelectedTrailerSize] = useState<number>(0);
    const [commodity, setCommodity] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [packagingNumber, setPackagingNumber] = useState('');
    const [selectedPackagingType, setSelectedPackagingType] = useState('');
    const [notes, setNotes] = useState('');

    const [warnings, setWarnings] = useState({
        origin: '',
        destination: '',
        pickupDate: '',
        selectedTrailerType: '',
        selectedTrailerSize: '',
        commodity: '',
        maxWeight: '',
        companyName: '',
        packaging: '',
    });

    const onLoadA = useCallback((autocomplete: google.maps.places.Autocomplete) => {
        setAutocompleteA(autocomplete);
    }, []);

    const onLoadB = useCallback((autocomplete: google.maps.places.Autocomplete) => {
        setAutocompleteB(autocomplete);
    }, []);

    const onPlaceChangedA = () => {
        if (autocompleteA) {
            const place = autocompleteA.getPlace();
            if (place.formatted_address) {
                setOrigin(place.formatted_address);
            }
            if (place.geometry && place.geometry.location) {
                setOriginLocation(place.geometry.location);
            }
        }
    };

    const onPlaceChangedB = () => {
        if (autocompleteB) {
            const place = autocompleteB.getPlace();
            if (place.formatted_address) {
                setDestination(place.formatted_address);
            }
            if (place.geometry && place.geometry.location) {
                setDestinationLocation(place.geometry.location);
            }
        }
    };

    useEffect(() => {
        if (originLocation && destinationLocation) {
            calculateRoute({
                origin,
                destination,
                setDirections,
                setDistance,
                map,
                originLocation,
                destinationLocation,
            });
        }
    }, [originLocation, destinationLocation]);

    useEffect(() => {
        if (map && originLocation && destinationLocation) {
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(originLocation);
            bounds.extend(destinationLocation);
            map.fitBounds(bounds);
        }
    }, [map, originLocation, destinationLocation]);

    useEffect(() => {
        if (distance && selectedTrailerType && selectedTrailerSize && maxWeight) {
            const calculatedPrice = calculatePrice(distance, selectedTrailerType, selectedTrailerSize, maxWeight);
            setPrice(calculatedPrice);
        }
    }, [distance, selectedTrailerType, selectedTrailerSize, maxWeight]);

    const handleQuoteButtonClick = async () => {
        const newWarnings = {
            origin: !origin ? 'Please select a pickup location.' : '',
            destination: !destination ? 'Please select a drop-off location.' : '',
            pickupDate: !pickupDate ? 'Please select a pickup date.' : '',
            selectedTrailerType: !selectedTrailerType ? 'Please select a trailer type.' : '',
            selectedTrailerSize: selectedTrailerSize === 0 ? 'Please select a trailer size.' : '',
            commodity: !commodity ? 'Please enter the commodity.' : '',
            maxWeight: !maxWeight ? 'Please enter the maximum weight.' : '',
            companyName: !companyName ? 'Please enter the company name.' : '',
            packaging: (!packagingNumber || !selectedPackagingType) ? 'Please fill both packaging number and type.' : '',
        };

        setWarnings(newWarnings);

        if (Object.values(newWarnings).some(warning => warning !== '')) {
            return;
        }

        if (!isAuthenticated) {
            navigate('/login');
        } else {
            const quoteDetails = {
                origin,
                destination,
                pickupDate,
                trailerType: selectedTrailerType,
                trailerSize: selectedTrailerSize,
                commodity,
                maxWeight,
                companyName,
                distance,
                packaging: `${packagingNumber} ${selectedPackagingType}`,
                price,
                notes,
            };

            const token = localStorage.getItem('authToken');
            if (!token) {
                return;
            }

            try {
                const data = await createQuote(quoteDetails, token);
                navigate('/shipment-report', { state: { price, quoteId: data._id, userId } });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Error creating quote:', error.message);
                } else {
                    console.error('Unknown error occurred while creating quote');
                }
            }
        }
    };




    if (!isLoaded) {
        return <div>Loading...</div>; // Show a loading message until the script is loaded
    }


    return (
        <div className='flex h-screen '>
            <SideBar isAuthenticated={isAuthenticated} />
            <div className="flex-1 bg-white min-h-screen overflow-y-auto">
                <div className="lg:mx-20 py-16   px-4  rounded-lg ">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold lg:mb-12 text-primary">Request A Quote</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-14 mt-4">

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                            <div className="lg:col-span-1 lg:mx-4">

                                <div className="mb-8 md:mb-0">

                                    <h3 className="text-lg font-medium text-secondary mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />Pickup Location <span className="text-red-500">*</span></h3>
                                    <OriginInput onLoad={onLoadA} onPlaceChanged={onPlaceChangedA} />
                                    {warnings.origin && <p className="text-red-500 text-sm">{warnings.origin}</p>}
                                </div>

                                <div className="mb-8 md:mb-0 lg:border-secondary">
                                    <h3 className="text-lg font-medium text-secondary mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />Drop-off Location <span className="text-red-500">*</span></h3>
                                    <DestinationInput onLoad={onLoadB} onPlaceChanged={onPlaceChangedB} />
                                    {warnings.destination && <p className="text-red-500 text-sm">{warnings.destination}</p>}
                                </div>
                                <div className="mb-8 md:mb-0">
                                    <h3 className="text-lg font-medium text-secondary mb-2"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />Pickup Date <span className="text-red-500">*</span></h3>
                                    {/* <input
                                        type="date"
                                        className="p-2 border border-secondary rounded w-full bg-white text-gray-400 font-normal "
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                    /> */}
                                </div>
                                <Calendar
                                    value={pickupDate}
                                    onChange={(date) => setPickupDate(date)}
                                    className="border border-secondary rounded"
                                />
                                {warnings.pickupDate && <p className="text-red-500 text-sm">{warnings.pickupDate}</p>}
                                {pickupDate && origin && destination && (
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-4">
                                            <div className="mb-2 lg:mt-4">
                                                <h3 className="text-lg font-medium text-secondary my-2">
                                                    <FontAwesomeIcon icon={faTruck} className="mr-2 text-gray-400" />
                                                    Trailer Type <span className="text-red-500">*</span>
                                                </h3>
                                                <select
                                                    className="p-2 border border-secondary rounded w-full bg-white text-gray-400 font-normal"
                                                    value={selectedTrailerType}
                                                    onChange={(e) => setSelectedTrailerType(e.target.value)}
                                                >
                                                    <option value="">Select trailer type</option>
                                                    {truckTypes.map((type) => (
                                                        <option key={type.type} value={type.type}>
                                                            {type.type}
                                                        </option>
                                                    ))}
                                                </select>
                                                {warnings.selectedTrailerType && <p className="text-red-500 text-sm">{warnings.selectedTrailerType}</p>}
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/3">
                                            <div className="mb-4 lg:mt-4">
                                                <h3 className="text-lg font-medium text-secondary my-2">
                                                    Size (ft) <span className="text-red-500">*</span>
                                                </h3>
                                                <select
                                                    className="p-2 border border-secondary rounded w-full bg-white text-gray-400 font-normal"
                                                    value={selectedTrailerSize}
                                                    onChange={(e) => setSelectedTrailerSize(parseInt(e.target.value))}
                                                >
                                                    <option value={0}>Select size</option>
                                                    {truckSizes.map((size) => (
                                                        <option key={size} value={size}>
                                                            {size} ft
                                                        </option>
                                                    ))}
                                                </select>
                                                {warnings.selectedTrailerSize && <p className="text-red-500 text-sm">{warnings.selectedTrailerSize}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {pickupDate && origin && destination && (
                                    <>
                                        <div className="mb-8 md:mb-0">
                                            <h3 className="text-lg font-medium text-secondary mb-2">
                                                <FontAwesomeIcon icon={faBox} className="mr-2 text-gray-400" />
                                                Commodity <span className="text-red-500">*</span>
                                            </h3>
                                            <input
                                                type="text"
                                                className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                                                placeholder="e.g. Electronics"
                                                value={commodity}
                                                onChange={(e) => setCommodity(e.target.value)}
                                            />
                                            {warnings.commodity && <p className="text-red-500 text-sm">{warnings.commodity}</p>}
                                        </div>
                                        <div className="mb-8 md:mb-0 mt-2">
                                            <h3 className="text-lg font-medium text-secondary mb-2">
                                                <FontAwesomeIcon icon={faWeight} className="mr-2 text-gray-400" />
                                                Maximum Weight <span className="text-red-500">*</span>
                                            </h3>
                                            <input
                                                type="text"
                                                className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                                                placeholder="e.g. 1000lbs"
                                                value={maxWeight}
                                                onChange={(e) => setMaxWeight(e.target.value)}
                                            />
                                            {warnings.maxWeight && <p className="text-red-500 text-sm">{warnings.maxWeight}</p>}
                                        </div>
                                        <div className="mb-8 md:mb-0">
                                            <h3 className="text-lg font-medium text-secondary my-2">
                                                <FontAwesomeIcon icon={faBuilding} className="mr-2 text-gray-400" />
                                                Company Name <span className="text-red-500">*</span>
                                            </h3>
                                            <input
                                                type="text"
                                                className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                                                placeholder="Enter your company name"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                            />
                                            {warnings.companyName && <p className="text-red-500 text-sm">{warnings.companyName}</p>}
                                        </div>
                                        <div className="flex flex-wrap md:mt-4">
                                            <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-4">
                                                <h3 className="text-lg font-medium text-secondary mb-2">
                                                    <FontAwesomeIcon icon={faBox} className="mr-2 text-gray-400" />Packaging <span className="text-red-500">*</span>
                                                </h3>
                                                <input
                                                    type="number"
                                                    className="p-2 border border-secondary rounded w-full bg-white text-gray-400 font-normal"
                                                    value={packagingNumber}
                                                    onChange={(e) => setPackagingNumber(e.target.value)}
                                                    placeholder="Enter number of packages"
                                                />
                                                {warnings.packaging && <p className="text-red-500 text-sm">{warnings.packaging}</p>}
                                            </div>
                                            <div className="w-full md:w-2/3 ">
                                                <h3 className="text-lg font-medium text-secondary mb-2">
                                                    Packaging Type <span className="text-red-500">*</span>
                                                </h3>
                                                <select
                                                    className="p-2 border border-secondary rounded w-full bg-white text-gray-400 font-normal"
                                                    value={selectedPackagingType}
                                                    onChange={(e) => setSelectedPackagingType(e.target.value)}
                                                >
                                                    <option value="">Select packaging type</option>
                                                    <option value="Box">Carton</option>
                                                    <option value="Pallet">Floor</option>
                                                    <option value="Loose">Loose</option>
                                                    <option value="Pallet">Pallet</option>
                                                    <option value="Roll">Roll</option>
                                                    <option value="Skids">Skids</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                                {warnings.packaging && <p className="text-red-500 text-sm">{warnings.packaging}</p>}
                                            </div>
                                            <div className="mb-8 md:mb-0 w-full">
                                                <h3 className="text-lg font-medium text-secondary my-2">
                                                    <FontAwesomeIcon icon={faNoteSticky} className="mr-2 text-gray-400" />
                                                    Additional Notes 
                                                </h3>
                                                <textarea
                                                    className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal"
                                                    placeholder="Enter your additional notes"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    rows={3} // Ensure rows is a number
                                                />
                                                
                                            </div>

                                        </div>
                                        <Button
                                            label="GET THIS QUOTE"
                                            size="xl"
                                            bgColor="#7783D2"
                                            hoverBgColor="white"
                                            onClick={handleQuoteButtonClick}
                                            className="extra-class-for-medium-button mt-8"
                                            type="button"
                                        />
                                    </>
                                )}

                            </div>
                            <div className="mt-4  lg:col-span-2">
                                <MapComponent
                                    map={map}
                                    setMap={setMap}
                                    directions={directions}
                                    originLocation={originLocation}
                                    destinationLocation={destinationLocation}
                                />
                                <div className="p-4 lg:py-8 shadow-lg flex flex-col lg:flex-row justify-evenly text-center items-center lg:mt-8 rounded-lg">
                                    <div className="flex flex-col items-center mb-4 lg:mb-0">
                                        <div className="text-secondary text-2xl font-medium pt-4 rounded-lg">
                                            <FontAwesomeIcon icon={faMapLocationDot} className="text-gray-500" /> Distance
                                        </div>
                                        <div className="text-primary text-4xl font-medium text-gray-500 p-4 rounded-lg" style={{ height: '60px' }}>
                                            {distance ? distance : <span>&nbsp;</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-secondary text-2xl font-medium pt-4 rounded-lg">
                                            <FontAwesomeIcon icon={faMoneyBillWave} className="text-gray-500" /> Estimated Price
                                        </div>
                                        <div className="text-primary text-4xl font-large text-gray-500 p-4 rounded-lg" style={{ height: '60px' }}>
                                            {price !== null ? `$ ${price.toFixed(2)}` : <span>&nbsp;</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteDetails;