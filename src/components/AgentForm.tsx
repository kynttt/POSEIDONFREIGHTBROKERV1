import  { useState } from "react";

const AgentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bpoExperience: "Yes",
    yearsExperience: "1 year",
    referralSource: "",
    agreement: false,
    fileUploaded: false,

    
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFormData({
        ...formData,
        fileUploaded: true,
        agreement: true,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl p-8 relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl">
          &times;
        </button>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-darkBlue mb-6 text-left">
          BECOME AN AGENT
        </h1>
        <p className="text-left text-xl sm:text-2xl text-darkBlue mb-6">
          Agent Eligibility Verification
        </p>
        <p className="text-left text-darkBlue mb-8 font-normal">
          Want to be an independent agent for Poseidon Freight? Provide your
          details below, with a focus on your sales and transportation
          background.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-darkBlue">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 font-normal text-darkBlue block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-darkBlue">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 font-normal text-darkBlue block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-darkBlue">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 font-normal text-darkBlue block w-full border font-normal text-darkBlue border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-darkBlue">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block font-normal text-darkBlue w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* BPO Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-darkBlue">
                Do you have experience working in a BPO company?
              </label>
              <select
                name="bpoExperience"
                value={formData.bpoExperience}
                onChange={handleChange}
                className="mt-1 font-normal text-darkBlue block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-sm font-medium text-darkBlue">
                Number of Experience
              </label>
              <select
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
                className="mt-1 font-normal text-darkBlue block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-darkBlue focus:border-blue-500 sm:text-sm"
              >
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
              </select>
            </div>
          </div>

          {/* Referral Source */}
          <div>
            <label className="block text-sm font-medium text-darkBlue">
              How did you hear about Poseidon?
            </label>
            <input
              type="text"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleChange}
              className="mt-1 font-normal text-darkBlue block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Facebook, Google, etc."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-darkBlue">
              Upload Signed Contract
            </label>
            <input
              type="file"
              name="contractFile"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="mt-1 block w-full text-darkBlue font-normal border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              disabled={!formData.fileUploaded}
            />
            <label className="text-sm text-darkBlue font-normal">
              Kindly sign the{" "}
              <a
                href="/path/to/your/file.pdf"
                download
                className="text-darkBlue underline font-semibold"
              >
                contract
              </a>{" "}
              to confirm your acceptance of the terms and conditions.
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-lyellow hover:bg-darkBlue hover:text-white text-darkBlue font-bold py-4 px-16 rounded-md text-sm md:text-base md:px-16 md:py-4"
            >
              SUBMIT
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AgentForm;
