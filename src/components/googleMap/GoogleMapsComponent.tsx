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
import { faMapMarkerAlt, faCalendarAlt, faTruck, faRuler, faBox, faWeight, faBuilding } from '@fortawesome/free-solid-svg-icons';


// Import truck types and sizes data
import truckTypes from './truckTypes.json';
import truckSizes from './truckSizes.json';

const libraries: Libraries = ['places'];
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API || ''; // Provide an empty string as a fallback




const QuoteDetails: React.FC = () => {
    const navigate = useNavigate();
    // const { isAuthenticated, login } = useAuth();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    useEffect(() => {
        console.log('User is authenticated:', isAuthenticated);
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
        // Calculate price whenever distance, trailer type, trailer size, or max weight changes
        if (distance && selectedTrailerType && selectedTrailerSize && maxWeight) {
            // Fetch the selected trailer type object from truckTypes array
            const selectedType = truckTypes.find(type => type.type === selectedTrailerType);

            if (selectedType) {
                // Example additional costs based on trailer size and max weight
                const trailerSizeNum = selectedTrailerSize; // Use selected trailer size
                const maxWeightNum = parseFloat(maxWeight); // Convert max weight string to number

                // Calculate price based on distance and selected trailer type price per mile
                const basePricePerMile = selectedType.pricePerMile;
                const distanceNum = parseFloat(distance.replace(/[^\d.]/g, '')); // Convert distance string to number

                // Example calculation based on distance, trailer size, max weight, etc.
                const calculatedPrice = basePricePerMile * distanceNum +
                    (trailerSizeNum * 10) +  // Example additional cost based on trailer size
                    (maxWeightNum * 0.1);   // Example additional cost based on weight

                setPrice(calculatedPrice);
            }
        }
    }, [distance, selectedTrailerType, selectedTrailerSize, maxWeight]);

    const handleQuoteButtonClick = async () => {


        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login page if not authenticated
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
                price,
            };

            // Retrieve the token from localStorage
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('Access token not found in localStorage');
                return; // Handle this case appropriately
            }

            try {
                const response = await fetch('http://localhost:5000/api/quotes/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(quoteDetails),
                });

                // Check if request was successful
                if (!response.ok) {
                    throw new Error('Failed to create quote');
                }

                const data = await response.json();
                console.log('Quote created:', data);

                // Redirect to payment option page
                // Inside handleQuoteButtonClick in QuoteDetails.tsx
                navigate('/payment-option', { state: { price, quoteId: data._id } });


            } catch (error: any) { // Explicitly specify 'any' or 'Error' as the type
                console.error('Error creating quote:', error.message);
                // Handle error (e.g., show error message to user)
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
                <div className="lg:mx-20 py-16   px-4 shadow rounded-lg lg:mt-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold lg:mb-12 text-primary">Request A Quote</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-14 mt-4">

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                            <div className="lg:col-span-1 lg:mx-4">

                                <div className="mb-8 md:mb-0">

                                    <h3 className="text-lg font-medium text-secondary mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />Pickup Location <span className="text-red-500">*</span></h3>
                                    <OriginInput onLoad={onLoadA} onPlaceChanged={onPlaceChangedA} />
                                </div>

                                <div className="mb-8 md:mb-0 lg:border-secondary">
                                    <h3 className="text-lg font-medium text-secondary mb-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-400" />Drop-off Location <span className="text-red-500">*</span></h3>
                                    <DestinationInput onLoad={onLoadB} onPlaceChanged={onPlaceChangedB} />
                                </div>
                                <div className="mb-8 md:mb-0">
                                    <h3 className="text-lg font-medium text-secondary mb-2"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-400" />Pickup Date <span className="text-red-500">*</span></h3>
                                    <input
                                        type="date"
                                        className="p-2 border border-secondary rounded w-full bg-white text-gray-400 font-normal "
                                        value={pickupDate}
                                        onChange={(e) => setPickupDate(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-wrap"> {/* Use flex and flex-wrap to display divs side by side */}
                                    <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-4"> {/* Adjust width for different screen sizes */}
                                        <div className="mb-2 lg:mt-4">
                                            <h3 className="text-lg font-medium text-secondary my-2"><FontAwesomeIcon icon={faTruck} className="mr-2 text-gray-400" />Trailer Type <span className="text-red-500">*</span></h3>
                                            <select
                                                className="p-2  border border-secondary rounded w-full bg-white text-gray-400 font-normal"
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
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3"> {/* Adjust width for different screen sizes */}
                                        <div className="mb-4 lg:mt-4">
                                            <h3 className="text-lg font-medium text-secondary my-2">Size (ft)<span className="text-red-500"> *</span></h3>
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
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-8 md:mb-0">
                                    <h3 className="text-lg font-medium text-secondary mb-2"><FontAwesomeIcon icon={faBox} className="mr-2 text-gray-400" />Commodity <span className="text-red-500">*</span></h3>
                                    <input
                                        type="text"
                                        className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal "
                                        placeholder="e.g. Electronics"
                                        value={commodity}
                                        onChange={(e) => setCommodity(e.target.value)}
                                    />
                                </div>
                                <div className="mb-8 md:mb-0 mt-2">
                                    <h3 className="text-lg font-medium text-secondary mb-2"><FontAwesomeIcon icon={faWeight} className="mr-2 text-gray-400" />Maximum Weight <span className="text-red-500">*</span></h3>
                                    <input
                                        type="text"
                                        className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal "
                                        placeholder="e.g. 1000lbs"
                                        value={maxWeight}
                                        onChange={(e) => setMaxWeight(e.target.value)}
                                    />
                                </div>
                                <div className="mb-8 md:mb-0">
                                    <h3 className="text-lg font-medium text-secondary my-2"><FontAwesomeIcon icon={faBuilding} className="mr-2 text-gray-400" />Company Name <span className="text-red-500">*</span></h3>
                                    <input
                                        type="text"
                                        className="p-2 px-6 border border-secondary rounded w-full bg-white text-primary font-normal "
                                        placeholder="Enter your company name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className="mt-4  lg:col-span-2">
                                <MapComponent
                                    map={map}
                                    setMap={setMap}
                                    directions={directions}
                                    originLocation={originLocation}
                                    destinationLocation={destinationLocation}
                                />
                                <div className="p-4 lg:py-8 shadow-lg flex flex-col lg:flex-row justify-between items-center lg:mt-8 rounded-lg">
                                    <Button
                                        label="GET THIS QUOTE"
                                        size="xl"
                                        bgColor="#7783D2"
                                        hoverBgColor="white"
                                        onClick={handleQuoteButtonClick}
                                        className="extra-class-for-medium-button"
                                        type="button"
                                    />
                                    {distance && (
                                        <div className="text-2xl font-medium text-gray-500 mb-4 lg:mb-0 lg:mr-4 p-4 rounded-lg">
                                            Distance: <span className='font-normal italic text-primary'>{distance}</span>
                                        </div>
                                    )}
                                    {price !== null && (
                                        <div className="text-2xl font-medium text-gray-500 mb-4 lg:mb-0 lg:mr-4 p-4 rounded-lg">
                                            Estimated Price: <span className='font-normal italic text-primary'>${price.toFixed(2)}</span>
                                        </div>
                                    )}
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