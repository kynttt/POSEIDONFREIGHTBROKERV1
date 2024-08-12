import React, { useEffect, useState } from 'react';
import { fetchBookingById } from '../../../lib/apiCalls'; // Adjust the import path as needed

const BillOfLading: React.FC = () => {
  const [bookingData, setBookingData] = useState<any>(null);
  const bookingId = 'your-booking-id-here'; // Replace with the actual booking ID

  useEffect(() => {
    const getBookingData = async () => {
      try {
        const data = await fetchBookingById(bookingId);
        setBookingData(data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    getBookingData();
  }, [bookingId]);

  if (!bookingData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 border border-gray-300 shadow-md mt-8" style={{ maxWidth: '800px' }}>
      {/* Header */}
      <div className="text-center mb-4">
        <img src="/pos-logo.png" alt="Poseidon Logo" className="mx-auto w-32 mb-2" />
        <h2 className="font-bold text-xl">BILL OF LADING</h2>
        <p className="text-sm text-gray-500">
          Shipment subject to the Freight Logistics Terms and Conditions <br />
          in effect on the date of shipment and available at freightlogistics.com
        </p>
      </div>

      {/* Bill of Lading Information */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-2">
          <p className="font-bold text-sm">Bill of Lading #:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.billOfLadingNumber}</div>
        </div>
        <div>
          <p className="font-bold text-sm">Print Date:</p>
          <div className="border border-gray-300 p-2 text-sm">{new Date().toLocaleDateString()}</div>
        </div>
        <div>
          <p className="font-bold text-sm">Schedule Departure Date:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.departureDate}</div>
        </div>
        <div className="col-span-2">
          <p className="font-bold text-sm">Name of Carrier:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.carrier.name}</div>
        </div>
        <div>
          <p className="font-bold text-sm">Trailer #:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.trailerNumber}</div>
        </div>
      </div>

      {/* Consignee and Shipper Information */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-bold text-sm">To Consignee:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.consignee.name}</div>
        </div>
        <div>
          <p className="font-bold text-sm">From Shipper:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.shipper.name}</div>
        </div>
        <div>
          <p className="font-bold text-sm">Address Line:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.consignee.address}</div>
        </div>
        <div>
          <p className="font-bold text-sm">Phone #:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.consignee.phone}</div>
        </div>
        <div>
          <p className="font-bold text-sm">Emergency Phone #:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.emergencyPhone}</div>
        </div>
        <div>
          <p className="font-bold text-sm">Post ID:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.postId}</div>
        </div>
        <div>
          <p className="font-bold text-sm">Load #:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.loadNumber}</div>
        </div>
      </div>

      {/* Shipment Details */}
      <div className="border border-gray-300 mb-4">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="border-r p-2 text-left">Qty. of Shipping Pallets and Gaylords</th>
              <th className="border-r p-2 text-left">No. Shipping Cartons</th>
              <th className="border-r p-2 text-left">Package Type, Description of Contents, Special Marks, and Exceptions</th>
              <th className="border-r p-2 text-left">Weight (lbs)</th>
              <th className="border-r p-2 text-left">Rate</th>
              <th className="p-2 text-left">Charges</th>
            </tr>
          </thead>
          <tbody>
            {/* Row for Dynamic Data */}
            {bookingData.shipmentDetails.map((detail: any, index: number) => (
              <tr className="border-b" key={index}>
                <td className="border-r p-2">{detail.qtyPallets}</td>
                <td className="border-r p-2">{detail.qtyCartons}</td>
                <td className="border-r p-2">{detail.packageDescription}</td>
                <td className="border-r p-2">{detail.weight}</td>
                <td className="border-r p-2">{detail.rate}</td>
                <td className="p-2">{detail.charges}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="border-t p-2 font-bold text-right">TOTAL:</td>
              <td className="border-t p-2">{bookingData.totalWeight}</td>
              <td className="border-t p-2">{bookingData.totalRate}</td>
              <td className="border-t p-2">{bookingData.totalCharges}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Shipper and Carrier Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-bold text-sm">SHIPPER:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.shipper.name}</div>
        </div>
        <div>
          <p className="font-bold text-sm">CARRIER:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.carrier.name}</div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="border-t border-b border-gray-300 py-4 text-sm">
        <p className="mb-2 text-gray-500">
          <strong>NOTE:</strong> Carrier liability for this shipment is not limited, except as specified in the Transportation Agreement between the parties.
        </p>
        <p className="mb-2 text-gray-500">
          Shipment received under Carrier's standard terms and conditions as well as applicable tariffs.
        </p>
        <p className='text-gray-500'>
          The Carrier requires payment of all charges and fees before delivering this shipment. If another transport provider accepts the shipment from a party other than the listed shipper, it agrees to seek payment only from that third party and waives any rights to seek payment from the consignor or consignee.
        </p>
      </div>

      {/* Footer Section */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col">
          <p className="font-bold text-sm">Shipper Signature:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.shipper.signature}</div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-sm">Carrier Signature/Pickup Date:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.carrier.signature}</div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-sm">Consignee Signature/Delivery Date:</p>
          <div className="border border-gray-300 p-2 text-sm">{bookingData.consignee.signature}</div>
        </div>
      </div>
    </div>
  );
};

export default BillOfLading;
