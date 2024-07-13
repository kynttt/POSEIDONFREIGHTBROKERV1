import React, { useState } from "react";
import profileImage from "../assets/img/profile.png";
import SideBar from "../components/SideBar";
import { useAuthStore } from '../state/useAuthStore';
import transactionsData from "../pages/profileTransactionFile.json";
import ProfileTransactionCard from "../components/ProfileTransactionCard";
import Button from "../components/Button";

const ProfileCard: React.FC = () => {
  const { isAuthenticated} = useAuthStore();
  const [showAllLarge, setShowAllLarge] = useState(false);
  const [showAllSmall, setShowAllSmall] = useState(false);

  const handleSeeMoreSmall = () => {
    setShowAllSmall(true);
  };

  const handleSeeMoreLarge = () => {
    setShowAllLarge(true);
  };

  const handleShowLessSmall = () => {
    setShowAllSmall(false);
  };

  const handleShowLessLarge = () => {
    setShowAllLarge(false);
  };

  // Determine number of transactions to show based on screen size
  const transactionsToShowSmall = showAllSmall ? transactionsData.length : 5;
  const transactionsToShowLarge = showAllLarge ? transactionsData.length : 10;

  return (
    <>
        <div className="flex flex-col md:flex-row">
          <SideBar isAuthenticated={isAuthenticated} />
          <div className="flex-1 p-4 md:p-8 bg-white h-auto md:h-screen overflow-y-auto">
            <div className="max-w-4xl mx-auto bg-white overflow-hidden">
              <div className="flex justify-between items-center p-4 md:p-8">
                <h2 className="text-xl font-medium text-secondary">
                  Account Details
                </h2>
              </div>
                    <div className="flex justify-start items-center mt-4 md:mt-8 md:ml-4 lg:ml-8">
                      <img
                        className="w-32 h-32 md:w-52 md:h-52 object-cover rounded-full border-4 border-white"
                        src={profileImage}
                        alt="Profile"
                      />
                      <div className="text-center mt-2 md:ml-4 lg:ml-8">
                        <h2 className="text-xl md:text-2xl font-medium text-secondary text-left">
                          John Doe
                        </h2>
                        <p className="text-gray-500 text-left">Logistics</p>
                        <p className="text-gray-500 text-left">NSW, Australia</p>
                      </div>
                    </div>

                  <div className="p-4 md:p-8">
                        <div className="text-left mb-4">
                          <h3 className="text-lg font-medium text-secondary">
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div className="flex">
                              <p className="font-medium text-gray-500">Full name</p>
                              <p className="ml-4 md:ml-16 font-medium text-primary">
                                John Doe
                              </p>
                            </div>
                            <div className="flex">
                              <p className="text-gray-500">Phone number</p>
                              <p className="ml-4 md:ml-8 font-medium text-primary">
                                123-456-7890
                              </p>
                            </div>
                            <div className="flex">
                              <p className="text-gray-500 font-medium">Business email</p>
                              <p className="ml-4 md:ml-6 font-medium text-primary">
                                jdoe@email.com
                              </p>
                            </div>
                            <div className="flex">
                              <p className="text-gray-500">Company Name</p>
                              <p className="ml-4 md:ml-6 font-medium text-primary">
                                ABC Company
                              </p>
                            </div>
                          </div>
                        </div>
                    <div>
                          <h3 className="text-lg font-medium text-secondary mt-6 md:mt-10">
                            Recent Transactions
                          </h3>

                          <div className="overflow-x-auto">
                            {/* Table for larger screens */}
                            <table className="min-w-full bg-white hidden sm:table">
                              <thead>
                                <tr className="text-left">
                                  <th className="py-2 text-primary">
                                    <div className="flex items-center">Load number</div>
                                  </th>
                                  <th className="py-2 text-primary">
                                    <div className="flex items-center">
                                      Truck Type & Size
                                    </div>
                                  </th>
                                  <th className="py-2 text-primary">
                                    <div className="flex items-center">Amount Paid</div>
                                  </th>
                                  <th className="py-2 text-primary">
                                    <div className="flex items-center">
                                      Payment Method
                                    </div>
                                  </th>
                                  <th className="py-2 text-primary">
                                    <div className="flex items-center">Date & Time</div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-500 font-medium text-sm">
                                {transactionsData
                                  .slice(0, transactionsToShowLarge)
                                  .map((transaction, index) => (
                                    <tr key={index}>
                                      <td className="py-2">{transaction.loadNumber}</td>
                                      <td className="py-2">{transaction.truckType}</td>
                                      <td className="py-2">{transaction.amountPaid}</td>
                                      <td className="py-2">
                                        {transaction.paymentMethod}
                                      </td>
                                      <td className="py-2">{transaction.dateTime}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>

                            {/* Cards for smaller screens */}
                            <div className="sm:hidden text-sm text-gray-500">
                              {transactionsData
                                .slice(0, transactionsToShowSmall)
                                .map((transaction, index) => (
                                  <ProfileTransactionCard
                                    key={index}
                                    transaction={transaction}
                                  />
                                ))}
                            </div>
                          </div>

                      {/* Button for both screens */}
                        <div className="text-right mt-6 md:mt-10 mr-4">
                          <Button
                    label={showAllLarge || showAllSmall ? "Show Less" : "See More"}
                    size="small"
                    bgColor="#252F70"
                    hoverBgColor="white"
                    onClick={() => {
                      if (showAllLarge || showAllSmall) {
                        handleShowLessLarge();
                        handleShowLessSmall();
                      } else {
                        handleSeeMoreLarge();
                        handleSeeMoreSmall();
                      }
                    } } type={""}                          />
                        </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ProfileCard;
