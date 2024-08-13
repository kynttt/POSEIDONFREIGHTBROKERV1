import axios from "axios"; // Import axios or your HTTP client
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import QuoteRequestModal from "../../../components/QuoteRequestModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { bookQuote, createInvoice } from "../../../lib/apiCalls";

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const PaymentComponent: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState("Installment");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { price = 0, quoteId = null, userId = null } = location.state || {};

  const openModal = async () => {
    if (!quoteId || !userId) {
      console.error("Missing required information:");
      if (!quoteId) console.error("quoteId is missing");
      if (!userId) console.error("userId is missing");
      return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // Handle booking if necessary
      await bookQuote(quoteId, token);

      // Prepare data for creating an invoice
      const invoiceData = {
        quote: quoteId, // Reference to the quote
        createdBy: userId, // User creating the invoice
        amountDue: price, // Assuming `price` is the amount due
        dueDate: new Date().toISOString(), // Set due date (for example, current date)
        invoiceNumber: `INV-${generateRandomNumber(1000, 9999)}`, // Generate an invoice number
      };

      // POST request to create an invoice
      await createInvoice(invoiceData, token);

      setIsModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API Error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  const handleCancel = () => {
    window.history.back(); // Go back to the previous page
  };

  const handlePaymentTermClick = (term: string) => {
    navigate(`/invoice?term=${term}`); // Pass the term to the invoice page
  };

  return (
    <>
      <div className="bg-white h-screen flex flex-col md:flex-row">
        {/* Main Content */}
        <div className="bg-white w-full md:pt-16 overflow-y-auto lg:pt-15 min-h-screen pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-secondary">
              Payment Method
            </h2>

            <div className="p-4 sm:p-6 lg:p-10">
              {/* Payment Method Select */}
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faMoneyCheckDollar}
                  className="text-gray-500 mr-1"
                />
                <label
                  className="block text-primary text-lg font-normal"
                  htmlFor="account"
                >
                  Choose a Payment Method{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <select
                id="account"
                name="account"
                defaultValue=""
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="block appearance-none w-full md:w-1/2 lg:w-56 bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled hidden>
                  Select Account
                </option>
                <option value="Stripe">Debit/Credit</option>
                <option value="Stripe">Cash</option>
                <option value="Stripe">Credit Wallet</option>
                <option value="Stripe">Paypal</option>
                <option value="Payment Terms">Payment Terms</option>
              </select>

              {/* Payment Terms Buttons */}
              {selectedAccount === "Payment Terms" && (
                <div className="mt-4">
                  <label className="block text-primary text-lg mb-2 font-normal">
                    Select Payment Terms <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                    <Button
                      label="3 months"
                      size="medium"
                      bgColor="#252F70"
                      hoverBgColor="white"
                      onClick={() => handlePaymentTermClick("3 months")}
                      type={""}
                    />
                    <Button
                      label="6 months"
                      size="medium"
                      bgColor="#252F70"
                      hoverBgColor="white"
                      onClick={() => handlePaymentTermClick("6 months")}
                      type={""}
                    />
                    <Button
                      label="9 months"
                      size="medium"
                      bgColor="#252F70"
                      hoverBgColor="white"
                      onClick={() => handlePaymentTermClick("9 months")}
                      type={""}
                    />
                  </div>
                </div>
              )}

              {/* Review Payment Table */}
              <div className="overflow-x-auto bg-white rounded-lg border-2 shadow p-4 sm:p-6 lg:p-10 mt-4">
                <h1 className="text-secondary text-lg mb-2 font-normal">
                  Review Payment
                </h1>
                <table className="min-w-full">
                  <thead>
                    <tr className="text-secondary">
                      <th className="px-4 py-2 text-left font-medium">
                        Customer PO
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Freight Broker PO
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Balance
                      </th>
                      <th className="px-4 py-2 text-left font-medium">
                        Pay Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(1)].map((_, index) => (
                      <tr key={index} className="text-primary">
                        <td className="px-4 py-2">
                          {generateRandomNumber(1000, 9999)}
                        </td>
                        <td className="px-4 py-2">
                          {generateRandomNumber(1000, 9999)}
                        </td>
                        <td className="px-4 py-2">${price.toFixed(2)}</td>
                        <td className="lg:px-2 py-2">
                          <input
                            type="text"
                            value={`$${price.toFixed(2)}`}
                            readOnly
                            className="block w-36 bg-white border border-gray-200 text-blue-500 py-2 px-2 lg:px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center py-5 sm:mt-4 md:mt-6 lg:mt-8">
                <input
                  type="checkbox"
                  id="agreement"
                  className="mr-2 w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 mb-2"
                />
                <label
                  htmlFor="agreement"
                  className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 text-primary font-medium"
                >
                  Affix your signature to the{" "}
                  <a href="#" className="underline text-primary">
                    agreement contract
                  </a>
                  .
                </label>
              </div>

              {/* Note Section */}
              <div className="mt-4">
                <p className="text-primary text-lg font-normal pt-2 flex flex-col sm:flex-row">
                  <span className="text-black text-lg mb-2 font-normal">
                    Note:
                  </span>
                  <span className="sm:text-left sm:text-lg text-justify sm:flex-1 sm:ml-2">
                    Carrier liability for this shipment is not limited, except
                    as specified in the Transportation Agreement between the
                    parties.
                  </span>
                </p>

                <div className="text-gray-500 text-xs grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4 mt-2">
                  <p className="lg:col-span-3 text-primary text-sm font-normal text-justify">
                    The carrier shall not make delivery of this shipment without
                    payment of charges and all other lawful fees. If a motor
                    carrier, freight forwarder, broker or other transportation
                    service provider accepts this shipment from anyone other
                    than the shipper listed hereon, it agrees to seek payment of
                    all charges exclusively from this entity from which it
                    accepted the shipment (i.e., the broker) and expressly
                    waives any other collection rights or remedies otherwise
                    available to it, including any right to seek payment of the
                    transportation charges from the consignee or consignor.
                  </p>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex justify-start space-x-4 mt-8">
                <Button
                  label="Make Payment"
                  size="medium"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  onClick={openModal}
                  type={""}
                />
                <Button
                  label="Cancel"
                  size="medium"
                  bgColor="#252F70"
                  hoverBgColor="white"
                  onClick={handleCancel}
                  type={""}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quote Request Modal */}
        {isModalOpen && <QuoteRequestModal isOpen={isModalOpen} />}
      </div>
    </>
  );
};

export default PaymentComponent;
