// import React, { useState, useCallback, useEffect } from 'react';
// import {
//   GoogleMap,
//   LoadScript,
//   Autocomplete,
//   DirectionsRenderer,
//   Marker,
//   Libraries,
// } from '@react-google-maps/api';

// const libraries: Libraries = ['places'];
// const googleMapsApiKey = 'AIzaSyDp5QMSHGXXam62GT8ykvvZfWhQ_-rH1Xo'; // Replace with your Google Maps API Key

// const containerStyle = {
//   width: '100%',
//   height: '500px',
// };

// const defaultCenter = {
//   lat: -3.745,
//   lng: -38.523,
// };

// const GoogleMapsComponent: React.FC = () => {
//   const [map, setMap] = useState<google.maps.Map | null>(null);
//   const [autocompleteA, setAutocompleteA] = useState<google.maps.places.Autocomplete | null>(null);
//   const [autocompleteB, setAutocompleteB] = useState<google.maps.places.Autocomplete | null>(null);
//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [originLocation, setOriginLocation] = useState<google.maps.LatLng | null>(null);
//   const [destinationLocation, setDestinationLocation] = useState<google.maps.LatLng | null>(null);
//   const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
//   const [distance, setDistance] = useState('');

//   const onLoadA = useCallback((autocomplete: google.maps.places.Autocomplete) => {
//     setAutocompleteA(autocomplete);
//   }, []);

//   const onLoadB = useCallback((autocomplete: google.maps.places.Autocomplete) => {
//     setAutocompleteB(autocomplete);
//   }, []);

//   const onPlaceChangedA = () => {
//     if (autocompleteA) {
//       const place = autocompleteA.getPlace();
//       console.log('Origin place:', place);
//       if (place.formatted_address) {
//         setOrigin(place.formatted_address);
//       }
//       if (place.geometry && place.geometry.location) {
//         setOriginLocation(place.geometry.location);
//       }
//     }
//   };

//   const onPlaceChangedB = () => {
//     if (autocompleteB) {
//       const place = autocompleteB.getPlace();
//       console.log('Destination place:', place);
//       if (place.formatted_address) {
//         setDestination(place.formatted_address);
//       }
//       if (place.geometry && place.geometry.location) {
//         setDestinationLocation(place.geometry.location);
//       }
//     }
//   };

//   const calculateRoute = () => {
//     if (origin === '' || destination === '') {
//       return;
//     }

//     const directionsService = new google.maps.DirectionsService();

//     directionsService.route(
//       {
//         origin,
//         destination,
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === google.maps.DirectionsStatus.OK && result) {
//           setDirections(result);
//           // Center the map on the route
//           if (map && result.routes[0].overview_path.length > 0) {
//             const bounds = new google.maps.LatLngBounds();
//             result.routes[0].overview_path.forEach((point) => {
//               bounds.extend(point);
//             });
//             map.fitBounds(bounds);
//           }
//         } else {
//           console.error(`Error fetching directions ${result}`);
//         }
//       }
//     );

//     const distanceMatrixService = new google.maps.DistanceMatrixService();
//     distanceMatrixService.getDistanceMatrix(
//       {
//         origins: [origin],
//         destinations: [destination],
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       (response, status) => {
//         if (status === 'OK' && response && response.rows[0].elements[0].status === 'OK') {
//           const distance = response.rows[0].elements[0].distance.text;
//           setDistance(distance);
//         } else {
//           console.error('Error calculating distance:', status);
//         }
//       }
//     );
//   };

//   useEffect(() => {
//     if (map && originLocation && destinationLocation) {
//       const bounds = new google.maps.LatLngBounds();
//       bounds.extend(originLocation);
//       bounds.extend(destinationLocation);
//       map.fitBounds(bounds);
//     }
//   }, [map, originLocation, destinationLocation]);

//   return (
//     <LoadScript
//       googleMapsApiKey={googleMapsApiKey}
//       libraries={libraries}
//       loadingElement={<div className="loading-element" />}
//     >
//       <div className="p-4">
//         <div className="mb-4">
//           <Autocomplete onLoad={onLoadA} onPlaceChanged={onPlaceChangedA}>
//             <input
//               type="text"
//               placeholder="Origin"
//               className="p-2 border rounded w-full"
//             />
//           </Autocomplete>
//         </div>
//         <div className="mb-4">
//           <Autocomplete onLoad={onLoadB} onPlaceChanged={onPlaceChangedB}>
//             <input
//               type="text"
//               placeholder="Destination"
//               className="p-2 border rounded w-full"
//             />
//           </Autocomplete>
//         </div>
//         <button
//           onClick={calculateRoute}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Calculate Route
//         </button>
//         {distance && (
//           <div className="mt-4">
//             <h2 className="text-lg font-bold">Distance: {distance}</h2>
//           </div>
//         )}
//         <div className="mt-4">
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={defaultCenter}
//             zoom={10}
//             onLoad={(map) => setMap(map)}
//           >
//             {originLocation && <Marker position={originLocation} label="A" />}
//             {destinationLocation && <Marker position={destinationLocation} label="B" />}
//             {directions && <DirectionsRenderer directions={directions} />}
//           </GoogleMap>
//         </div>
//       </div>
//     </LoadScript>
//   );
// };

// export default GoogleMapsComponent;
