import React from 'react';
import profileImage from '../assets/img/profile.png'; // Adjust the path as necessary
import SideBar from '../components/SideBar';
import { useAuth } from '../components/useAuth';



const ProfileCard: React.FC = () => {
  const { isAuthenticated, role } = useAuth(); // Destructure role from useAuth hook

  return (
    <>
    <div className='flex'>
    <SideBar isAuthenticated={isAuthenticated} />
    <div className="flex-1 p-8 bg-white h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-white overflow-hidden">
        <div className="flex justify-between items-center p-8">
          <h2 className="text-xl font-medium text-secondary">Account Details</h2>
        </div>
        <div className='flex justify-left items-center'>
        <div className="flex justify-center items-center mt-12">
          <img
            className="w-48 h-48 object-cover rounded-full border-4 border-white"
            src={profileImage} // Use the imported image
            alt="Profile"
          />
        </div>
        <div className="text-center mt-2 ml-8">
          <h2 className="text-2xl font-medium text-secondary text-left">John Doe</h2>
          <p className="text-gray-500 text-left">Logistics</p>
          <p className="text-gray-500 text-left">NSW, Australia</p>
        </div>
        </div>
        <div className="p-8">
          <div className="text-left mb-4">
            <h3 className="text-lg font-medium text-secondary">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className='flex'>
                <p className="font-medium text-gray-500">Full name</p>
                <p className="ml-16 font-medium text-primary">John Doe</p>
              </div>
              <div className='flex'>
                <p className="text-gray-500">Phone number</p>
                <p className="ml-8 font-medium text-primary">123-456-7890</p>
              </div>
              <div className='flex'>
                <p className="text-gray-500 font-medium">Business email</p>
                <p className="ml-6 font-medium text-primary">jdoe@email.com</p>
              </div>
              <div className='flex'>
                <p className="text-gray-500">Company Name</p>
                <p className="ml-6 font-medium text-primary">ABC Company</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-secondary mt-10">Recent Transactions</h3>
            <table className="min-w-full bg-white">
              <thead >
                <tr >
                  <th className="py-2 text-primary text-left">Load number</th>
                  <th className="py-2 text-primary text-left">Truck Type & Size</th>
                  <th className="py-2 text-primary text-left">Amount Paid</th>
                  <th className="py-2 text-primary text-left">Payment Method</th>
                  <th className="py-2 text-primary text-left">Date & Time</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 font-medium text-sm" >
                {[
                  {
                    loadNumber: 'ABC-1234-5678',
                    truckType: 'Flatbed 48 ft',
                    amountPaid: '$400.23',
                    paymentMethod: 'CREDIT CARD',
                    dateTime: '06 July, 2024 12:00 PM'
                  },
                  {
                    loadNumber: 'ABC-1234-5679',
                    truckType: 'Flatbed 48 ft',
                    amountPaid: '$410.00',
                    paymentMethod: 'INSTALLMENT',
                    dateTime: '06 July, 2024 1:00 PM'
                  },
                  {
                    loadNumber: 'ABC-1234-5680',
                    truckType: 'Flatbed 53 ft',
                    amountPaid: '$420.00',
                    paymentMethod: 'CASH',
                    dateTime: '06 July, 2024 2:00 PM'
                  },
                  {
                    loadNumber: 'ABC-1234-5681',
                    truckType: 'Flatbed 48 ft',
                    amountPaid: '$430.23',
                    paymentMethod: 'CREDIT CARD',
                    dateTime: '06 July, 2024 3:00 PM'
                  },{
                    loadNumber: 'ABC-1234-5678',
                    truckType: 'Flatbed 48 ft',
                    amountPaid: '$400.23',
                    paymentMethod: 'CREDIT CARD',
                    dateTime: '06 July, 2024 12:00 PM'
                  },
                  {
                    loadNumber: 'ABC-1234-5679',
                    truckType: 'Flatbed 48 ft',
                    amountPaid: '$410.00',
                    paymentMethod: 'INSTALLMENT',
                    dateTime: '06 July, 2024 1:00 PM'
                  },
                  {
                    loadNumber: 'ABC-1234-5680',
                    truckType: 'Flatbed 53 ft',
                    amountPaid: '$420.00',
                    paymentMethod: 'CASH',
                    dateTime: '06 July, 2024 2:00 PM'
                  },
                  {
                    loadNumber: 'ABC-1234-5681',
                    truckType: 'Flatbed 48 ft',
                    amountPaid: '$430.23',
                    paymentMethod: 'CREDIT CARD',
                    dateTime: '06 July, 2024 3:00 PM'
                  }
                ].map((transaction, index) => (
                  <tr key={index} className="">
                    <td className="py-2 text-left">{transaction.loadNumber}</td>
                    <td className="py-2 text-left">{transaction.truckType}</td>
                    <td className="py-2 text-left">{transaction.amountPaid}</td>
                    <td className="py-2 text-left">{transaction.paymentMethod}</td>
                    <td className="py-2 text-left">{transaction.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default ProfileCard;
