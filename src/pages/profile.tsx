import React, { useEffect, useState } from "react";
import profileImage from "../assets/img/profilepic.jpg";
import profileBgImage from "../assets/img/profilebg.jpg";
import SideBar from "../components/SideBar";
import { useAuthStore } from '../state/useAuthStore';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faEnvelope, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";

const ProfileCard: React.FC = () => {
  const { isAuthenticated, userId, token } = useAuthStore();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated && userId && token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated, userId, token]);

  return (
    <div className="flex flex-col md:flex-row">
      <SideBar isAuthenticated={isAuthenticated} />
      <div className="flex-1 p-4 md:p-8 bg-white h-auto md:h-screen overflow-y-auto">
        <div 
          className="rounded-lg bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(${profileBgImage})` }}
        >
          <div className="flex justify-between items-center p-4 md:p-8">
            {/* <h2 className="text-xl font-medium text-secondary">Account Details</h2> */}
          </div>
          <div className="flex justify-start items-center mt-4 md:mt-8 md:ml-4 lg:ml-8">
            <img
              className="w-32 h-32 md:w-52 md:h-52 object-cover rounded-full border-4 border-white"
              src={profileImage}
              alt="Profile"
            />
            {/* <div className="text-center mt-2 md:ml-4 lg:ml-8">
              {userData ? (
                <>
                  <h2 className="text-xl md:text-5xl font-medium text-secondary text-left">
                    {userData.name || 'John Doe'}
                  </h2>
                  <p className="text-gray-500 text-left">{userData.jobTitle || 'Logistics'}</p>
                  <p className="text-gray-500 text-left">{userData.address || 'NSW, Australia'}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div> */}
          </div>
          <div className="p-4 md:p-8 bg-light-grey mt-4">
            <div className="text-left mb-4">
              {/* <h3 className="text-lg font-medium text-white">Personal Information</h3> */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                <div className="flex">
                  {/* <p className="font-medium text-white">Full name</p> */}
                  <p className="md:text-5xl ml-4  font-medium text-primary ">
                    {userData?.name || 'John Doe'}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
  <div className="flex items-center">
    {/* <p className="text-white font-medium">Business email</p> */}
    <p className="ml-4 md:ml-6 font-medium text-secondary bg-grey p-2 rounded"><span className="mr-2 text-gray-500"><FontAwesomeIcon icon={faEnvelope} /></span>
      {userData?.email || 'jdoe@email.com'}
    </p>
  </div>
  <div className="flex items-center">
    {/* <p className="text-white">Phone number</p> */}
    <p className="ml-4 md:ml-8 font-medium text-secondary bg-grey p-2 rounded"><span className="mr-2 text-gray-500"><FontAwesomeIcon icon={faMobileScreenButton} /></span>
      {userData?.phone || '123-456-7890'}
    </p>
  </div>
  <div className="flex items-center">
    {/* <p className="text-white">Company Name</p> */}
    <p className="ml-4 md:ml-6 font-medium text-secondary bg-grey p-2 rounded"><span className="mr-2 text-gray-500"><FontAwesomeIcon icon={faBuilding} /></span>
      {userData?.companyName || 'ABC Company'}
    </p>
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

export default ProfileCard;
