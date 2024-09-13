import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import axios from 'axios';
import { fetchBookingById, getUser, uploadPdf } from "../lib/apiCalls";
import { useParams } from "react-router-dom";
// import html2canvas from 'html2canvas';
import SignatureCanvas from "react-signature-canvas";
import { Quote } from "../utils/types";
import { useAuthStore } from "../state/useAuthStore";



interface BookingData {
  notes: string;
  origin: string;
  bolNumber: string;
  carrier: string;
  pickupDate: string;
  departureDate: string;
  trailerNumber: string;
  consignee: string;
  companyName: string;
  shipper: string;
  destination: string;
  phone: string;
  packaging: string;
  maxWeight: number;
  price: number;
  emergencyPhoneNumber: string;
  id: string;
  loadNumber: string;
  postId: string;
}

const BillOfLading: React.FC = () => {
  const { id: bookingId } = useParams<{ id: string }>();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SignatureCanvas>(null);
  const [isSignatureSaved, setIsSignatureSaved] = useState(false);
  const [isSignaturePresent, setIsSignaturePresent] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    const fetchBooking = async (id: string) => {
      const data = await fetchBookingById(id);
      const quote = data.quote as Quote;
      // Fetch user data if createdBy exists
      let userPhone = "123-456-7891"; // Default phone number
      if (data.createdBy) {
        const userData = await getUser();
        userPhone = userData.phone || "123-456-7890";
      }
      setBookingData({
        notes: quote.notes || "",
        origin: quote.origin,
        bolNumber: data.bolNumber,
        carrier: data.carrier ?? "No Assigned Carrier",
        pickupDate: quote.pickupDate.toLocaleString(),
        departureDate: quote.pickupDate.toLocaleString(),
        trailerNumber: data.trailerNumber ?? null,
        consignee: quote.destination,
        companyName: quote.companyName,
        shipper: quote.companyName,
        destination: quote.destination,
        phone: userPhone,
        packaging: `${quote.packaging}`,
        maxWeight: quote.maxWeight,
        price: quote.price,
        emergencyPhoneNumber: "123-456-7890",
        id: data._id!,
        loadNumber: data.loadNumber ?? null,
        postId: data.loadNumber ?? null,
      });
    };

    if (bookingId) {
      fetchBooking(bookingId);
    }
  }, [bookingId]);

  const handleDownload = async () => {
    const element = printRef.current;
    if (!element) return;
  
    // Capture the content of the document
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL("image/png");
  
    // Create the PDF with document content
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [8.5, 11],
    });
  
    pdf.addImage(data, "PNG", 0, 0, 8.5, 11);
  
    // Add signature if available
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      const signatureCanvas = signatureRef.current.getCanvas();
      const signatureData = signatureCanvas.toDataURL("image/png");
      pdf.addPage(); // Add a new page for the signature
      pdf.addImage(signatureData, "PNG", 10, 20, 190, 60); // Adjust position and size
    }
  
    // Save the PDF locally (optional) or upload it
    pdf.save("Bill_of_Lading.pdf");
  };
  

  const saveSignature = async () => {
    if (!printRef.current) {
      alert("No document content to save.");
      return;
    }
  
    if (signatureRef.current && signatureRef.current.isEmpty()) {
      alert("Please add a signature before saving.");
      return;
    }
  
    try {
      // Capture the document content
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const data = canvas.toDataURL("image/png");
  
      // Create the PDF with the document content
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [8.5, 11],
      });
  
      pdf.addImage(data, "PNG", 0, 0, 8.5, 11);
  
      // Add the signature if available
      if (signatureRef.current && !signatureRef.current.isEmpty()) {
        const signatureCanvas = signatureRef.current.getCanvas();
        const signatureData = signatureCanvas.toDataURL("image/png");
  
        // Add a new page for the signature if necessary
        pdf.addPage();
        pdf.addImage(signatureData, "PNG", 10, 20, 190, 60); // Adjust position and size as needed
      }
  
      // Generate the PDF as a Blob
      const pdfBlob = pdf.output("blob");

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result instanceof ArrayBuffer) {
          console.log("Blob content (first few bytes):", new Uint8Array(reader.result).slice(0, 10));
        } else {
          console.error("Failed to read blob content. Result is not an ArrayBuffer.");
        }
      };
      reader.readAsArrayBuffer(pdfBlob);
  
      const { userId } = useAuthStore.getState();
      if (!userId) {
        alert("User ID is not available. Please log in again.");
        return;
      }
  
      if (!bookingId) {
        alert("Booking ID is not available. Please select a booking.");
        return;
      }
  
      // Upload the PDF
      const response = await uploadPdf(pdfBlob, userId, bookingId);
      console.log('Upload response:', response);
  
      if (response.status === 201) {
        setIsSignatureSaved(true);
        localStorage.setItem('isSignatureSaved', 'true');
        alert("Document saved successfully!");
      } else {
        alert(`Failed to save document. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error caught in saveSignature:", error);
  
      let errorMessage = "An error occurred while saving the document.";
      if (error instanceof Error) {
        // Handle known Error objects
        errorMessage += ` Error message: ${error.message}`;
      } else {
        // Handle unknown errors
        errorMessage += " An unknown error occurred.";
      }
  
      alert(errorMessage);
    }
  };
  

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setIsSignatureSaved(false);
      setIsSignaturePresent(false); // Reset signature presence
    }
  };

  const handleSignatureEnd = () => {
    if (signatureRef.current) {
      setIsSignaturePresent(!signatureRef.current.isEmpty());
      setIsSigned(true);
    }
  };

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full bg-light-grey flex justify-center">
      <div
        className="md:w-[8.5in]  p-8 bg-white shadow-md  text-sm mx-8"
        ref={printRef}
      >
        {/* Your Bill of Lading content here */}
        {/* Header */}
        <div className="flex text-center mb-4">
          <img
            src="/pos-logo.png"
            alt="Poseidon Logo"
            className="mx-auto w-36 h-32"
          />
          <div className="text-right">
            <h1 className="text-xl font-bold my-4">BILL OF LADING</h1>
            <p className=" font-normal text-xs w-full md:pl-8">
              Shipment subject to the Freight Logistics Terms and Conditions in
              effect on the date of shipment and available at poseidonopc.com
            </p>
          </div>
        </div>

        {/* Bill of Lading Information */}
        <div className="border border-black">
          <div className="flex items-center col-span-1">
            <label className="block font-bold py-2 px-4">
              Bill of Lading #
            </label>
            <p className="font-normal">{bookingData.bolNumber}</p>
          </div>
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-black ">
            <div className="col-span-1 ">
              <label className="block font-bold  ">Name of Carrier:</label>
              <p className="font-normal">{bookingData.carrier}</p>
            </div>
            <div className="col-span-1">
              <label className="block font-bold">Print Date:</label>
              <p className="font-normal">
                {new Date(bookingData.pickupDate).toLocaleDateString()}
              </p>
            </div>
            <div className="col-span-1">
              <label className="block font-bold">Schedule Departure</label>
              <p className="font-normal">
                {new Date(bookingData.pickupDate).toLocaleDateString()}
              </p>
            </div>
            <div className="col-span-1">
              <label className="block font-bold">Trailer #:</label>
              <p className="font-normal">{bookingData.trailerNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 p-4 border-b border-black pb-6">
            <div className="col-span-1 row-span-2 border-r">
              <label className="block font-bold">To Consignee:</label>
              <p className="font-normal">{bookingData.destination}</p>
            </div>
            <div className="col-span-1">
              <label className="block font-bold">From Shipper:</label>
              <p className="font-normal">{bookingData.companyName}</p>
            </div>
            <div className="col-span-2">
              <label className="block font-bold">Address Line:</label>
              <p className="font-normal">{bookingData.origin}</p>
            </div>
            <div className="col-span-2">
              <label className="block font-bold">Phone #:</label>
              <p className="font-normal">{bookingData.phone}</p>
            </div>
            <div className="col-span-1">
              <label className="block font-bold">Emergency Phone #:</label>
              <p className="font-normal">{bookingData.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-1">
              <label className="block font-bold">Post ID:</label>
              <p className="font-normal">{bookingData.postId}</p>
            </div>
            <div className="col-span-3">
              <label className="block font-bold">Load #:</label>
              <p className="font-normal">{bookingData.loadNumber}</p>
            </div>
          </div>
        </div>

        {/* Shipment Details Table */}
        <table className="w-full  border border-black text-left">
          <thead>
            <tr className="bg-gray-100 border-b border-black">
              {/* <th className="p-2 border-r border-black">Qty. of Shipping Pallets and Gaylords</th> */}
              {/* <th className="p-2 border-r border-black">No. Shipping Cartons</th> */}
              <th className="p-2 border-r border-black">
                Package Type, Description of Contents
              </th>
              <th className="p-2 border-r border-black">Weight (lbs)</th>
              <th className="p-2 border-r border-black">Rate ($)</th>
              <th className="p-2">Charges ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td className="p-2 border-b border-black"></td> */}
              {/* <td className="p-2 border-b border-black"></td> */}
              <td className="p-2 border-b border-r border-black">
                <p className="font-normal">
                  {bookingData.packaging}, {bookingData.notes}
                </p>
              </td>
              <td className="p-2 border-b border-r border-black">
                <p className="font-normal">{bookingData.maxWeight}</p>
              </td>
              <td className="p-2 border-b border-r border-black">
                <p className="font-normal">{bookingData.price}</p>
              </td>
              <td className="p-2 border-b border-r border-black">
                <p className="font-normal"></p>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="grid grid-cols-4 gap-4 p-4 border border-black">
          <div className="col-span-2">
            <label className="block font-bold">Shipper</label>
            <p className="font-normal">{bookingData.companyName}</p>
          </div>
          <div className="col-span-2">
            <label className="block font-bold">Carrier</label>
            <p className="font-normal">{bookingData.carrier}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="my-4 text-gray-500 font-normal text-xs">
          <p>
            <strong>NOTE:</strong> Carrier liability for this shipment is not
            limited, except as specified in the Transportation Agreement between
            the parties.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 p-2 border border-black">
          <div className="col-span-2 border-r border-black pr-2">
            <label className="block font-normal text-xs text-justify">
              Received, subject to individually determined rates or contracts
              that have been agreed upon in writing between the carrier and
              shipper, if applicable, otherwise to the rates, classifications,
              and rules that have been established by the carrier and are
              available to the shipper, on request, and to all applicable state
              and federal regulations.
            </label>
          </div>
          <div className="col-span-2">
            <label className="block font-normal text-xs text-justify">
              The carrier shall not make delivery of this shipment without
              payment of charges and all other lawful fees. If a motor carrier,
              freight forwarder, broker or other transportation service provider
              accepts this shipment from anyone other than the shipper listed
              hereon, it agrees to seek payment of its charges exclusively from
              the entity from which it accepted the shipment (e.g. the broker)
              and expressly waives any other collection rights or remedies
              otherwise available to it, including any right to seek payment of
              the transportation charges from the consignor or consignee.
            </label>
          </div>
        </div>

        <div className="grid grid-cols-4   border-black pt-4">
          <div className="border border-black">
            <label className="block font-bold p-2">
              Shipper Signature/Date
            </label>
            {/* Signature Canvas */}
            <div className="mt-4">
              <div className="relative">
                {/* Signature Canvas */}
                <SignatureCanvas
                  ref={signatureRef}
                  penColor="black"
                  maxWidth={1.3}
                  onEnd={handleSignatureEnd}
                  canvasProps={{
                    className:
                      "signatureCanvas border border-gray-500 w-full h-16",
                    style: { cursor: "crosshair" },
                  }}
                />

                {/* "Sign Here" Text */}
                {!isSigned && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="mb-24 text-gray-500 font-bold bg-yellow-200 p-1 text-xs rounded">
                      Please Sign Below. . .
                    </span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-500 font-normal text-xs text-justify p-2">
              This is to certify that the above named materials are properly
              classified, packaged, marked, and labeled, and are in proper
              condition for transportation according to the applicable
              regulations of the DOT.{" "}
            </p>
          </div>
          <div className="border border-black p-2">
            <label className="block font-bold">Trailer Loaded:</label>
            <div className="flex flex-col">
              <label className=" items-center">
                <input type="checkbox" className="form-checkbox" /> By Shipper
              </label>
              <label className=" items-center">
                <input type="checkbox" className="form-checkbox" /> By Loader
              </label>
            </div>
          </div>
          <div className="border border-black p-2">
            <label className="block font-bold">Freight Counted:</label>
            <div className="flex flex-col">
              <label className=" items-center">
                <input type="checkbox" className="form-checkbox" /> By Shipper
              </label>
              <label className="items-center">
                <input type="checkbox" className="form-checkbox" /> By
                Driver/Pallets said to contain
              </label>
              <label className="items-center">
                <input type="checkbox" className="form-checkbox" /> By
                Driver/Pieces
              </label>
            </div>
          </div>
          <div className="border border-black p-2">
            <label className="block font-bold">
              Carrier Signature/Pickup Date
            </label>
            <hr className="mt-4 mx-2 border-b border-black"></hr>
            <p className="text-gray-500 font-normal text-xs text-justify p-2">
              Carrier acknowledges receipt of packages and required placards.
              Carrier certifies emergency response information was made
              available and/ or carrier has the DOT emergency response guidebook
              or equivalent documentation in the vehicle. Property described
              above is received in good order, except as noted.{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col my-auto">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className={`mt-4 p-2 text-white rounded ${
            isSignatureSaved ? "bg-gray-500" : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!isSignatureSaved}
        >
          Download PDF
        </button>
        {!isSignatureSaved && (
          <>
            <button
              onClick={saveSignature}
              className={`mt-4 p-2 text-white rounded ${
                isSignaturePresent
                  ? "bg-blue-500"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
              disabled={!isSignaturePresent}
            >
              Save Signature
            </button>
            <button
              onClick={clearSignature}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold  p-2 rounded"
            >
              Clear Signature
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BillOfLading;
function fetchUserById(createdBy: string | import("../utils/types").User) {
  throw new Error("Function not implemented.");
}

