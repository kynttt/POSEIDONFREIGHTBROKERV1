import React, { useState, useEffect, useRef } from "react";
import { AxiosError } from "axios";
// import signupImage from "../assets/img/DeliveredPackage.gif";
// import Button from "../components/Button";
import googleIcon from "../assets/img/googleicon.png";
// import appleIcon from "../assets/img/apple.png";
import OTPModal from "../components/OTPModal";
import { registerUser } from "../lib/apiCalls";
import { LoginResponse, RegisterFormData } from "../utils/types";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { NeatGradient } from "@firecms/neat";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../state/useAuthStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignupPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    postalCode: "",
    companyName: "",
    role: "user",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const login = useAuthStore((state) => state.login);
  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo");
  // const [phone, setPhone] = useState("");
  // const [value, setValue] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gradientRef = useRef<NeatGradient | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const mutation = useMutation<LoginResponse, AxiosError, RegisterFormData>({
    mutationFn: registerUser,
    onSuccess: (data: LoginResponse) => {
      notifications.show({
        title: "Registration Successful",
        message: "You will redirected to the verification page.",
        color: "blue",
      });

      // openModal();
      login({
        user: data.data,
      });
      // navigate("/verify");
      if (redirectTo) {
        navigate(`/verify?redirectTo=${redirectTo}`);
      } else {
        navigate("/verify");
      }
    },
    onError: (error) => {
      console.log(error.response);
      notifications.show({
        title: "Registration Failed",
        message:
          (
            error.response?.data as {
              msg: string;
            }
          ).msg || "An error occurred during registration.",
        color: "red",
      });
    },
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    gradientRef.current = new NeatGradient({
      ref: canvasRef.current,
      colors: [
        { color: "#02FFE2", enabled: true },
        { color: "#C108FE", enabled: true },
        { color: "#0459FE", enabled: true },
        { color: "#6084F0", enabled: true },
        { color: "#a2d2ff", enabled: false },
      ],
      speed: 4,
      horizontalPressure: 3,
      verticalPressure: 3,
      waveFrequencyX: 2,
      waveFrequencyY: 4,
      waveAmplitude: 5,
      shadows: 0,
      highlights: 2,
      colorBrightness: 1,
      colorSaturation: 3,
      wireframe: false,
      colorBlending: 5,
      backgroundColor: "#003FFF",
      backgroundAlpha: 1,
      resolution: 1,
    });

    return gradientRef.current.destroy;
  }, []);

  useEffect(() => {
    // Retrieve data from session storage when the component mounts
    const savedFormData = sessionStorage.getItem("signupFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    // Save form data to session storage whenever it changes
    sessionStorage.setItem("signupFormData", JSON.stringify(formData));
  }, [formData]);

  const onLoginHandler = () => {
    if (redirectTo) {
      navigate("/login?redirectTo=" + redirectTo);
    } else {
      navigate("/login");
    }
  };

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
    sessionStorage.setItem("signupFormData", JSON.stringify(updatedFormData));
  };
  const handlePhoneChange = (value?: string) => {
    const updatedFormData = { ...formData, phone: value || "" };
    setFormData(updatedFormData);
    sessionStorage.setItem("signupFormData", JSON.stringify(updatedFormData));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true); // Start loading state

    const errors: { [key: string]: string } = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.address) errors.address = "Address is required.";
    if (!formData.postalCode) errors.postalCode = "Postal Code is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.email) errors.email = "Email is required.";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false); // Stop loading state
      return;
    }

    mutation.mutate(formData, {
      onSuccess: () => {
        setIsSubmitting(false); // Stop loading state
      },
      onError: () => {
        setIsSubmitting(false); // Stop loading state
      },
    });
  };


  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ isolation: "isolate" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-1"></div>
      <div className="container mx-auto p-4 md:p-8 z-10">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center w-full space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-2/3 lg:w-5/12 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 p-8 px-4 lg:px-8 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Create an Account
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-white">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full border  rounded-md border-white bg-transparent text-white placeholder-white font-light placeholder-opacity-60  h-10 p-4 ${validationErrors.name ? "border-red-500" : ""
                    }`}
                  placeholder="Enter your First Name and Last Name"
                  required
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Address *
                </label>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-1 md:space-x-4">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1  block w-full md:w-3/5 border border-white  rounded-md bg-transparent placeholder-white text-white placeholder-opacity-60 font-light h-10 p-4 ${validationErrors.address ? "border-red-500" : ""
                      }`}
                    placeholder="City, State, Country"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`mt-1  block w-full md:w-2/5 border border-white bg-transparent placeholder-white text-white placeholder-opacity-60 font-light rounded-md   h-10 p-4 ${validationErrors.postalCode ? "border-red-500" : ""
                      }`}
                    placeholder="Postal Code"
                    required
                  />
                </div>
                {validationErrors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.address}
                  </p>
                )}
                {validationErrors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.postalCode}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-white bg-transparent placeholder-white text-white placeholder-opacity-60 font-light rounded-md  h-10 p-4"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Phone number *
                </label>
                <div className="flex mt-1">
                  <PhoneInput
                    defaultCountry="US" // Can be changed or omitted
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="w-full border border-white bg-transparent text-black placeholder-white rounded-md bg-white text-gray-700 h-10 p-4"
                    international
                    countryCallingCodeEditable={false}
                  />
                </div>
                {validationErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full border border-white bg-transparent placeholder-white text-white placeholder-opacity-60 font-light rounded-md h-10 p-4 ${validationErrors.password ? "border-red-500" : ""
                      }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    <FontAwesomeIcon
                      icon={isPasswordVisible ? faEyeSlash : faEye}
                      className="text-white"
                    />
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.password}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full border border-white bg-transparent placeholder-white text-white placeholder-opacity-60 font-light rounded-md  h-10 p-4 ${validationErrors.email ? "border-red-500" : ""
                    }`}
                  placeholder="Enter your email"
                  required
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center mt-4">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="form-checkbox h-4 w-4 text-blue-600"
                  checked={isTermsChecked}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-light-grey font-normal ml-2"
                >
                  I agree to the{" "}
                  <a
                    href="/terms-and-agreement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    Terms of Service
                  </a>
                </label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className={`text-white w-full py-3 rounded-md btn medium extra-class-for-medium-button ${!isTermsChecked
                    ? "text-white w-full py-3 rounded-md opacity-20 cursor-not-allowed"
                    : ""
                    }`}
                  style={{ backgroundColor: "#252F70" }}
                  disabled={!isTermsChecked || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                        ></path>
                      </svg>
                      <span className="ml-2">Processing...</span>
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <OTPModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
              {/* {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm mt-4">
                  Registration successful! Please check your email for
                  verification.
                </p>
              )} */}
              <p className="text-sm text-light-grey font-normal mt-4 text-center">
                Already have an account?{" "}
                <a className="text-white" onClick={onLoginHandler}>
                  Login
                </a>
              </p>
            </form>
            <div className="mt-6 flex flex-col space-y-4">
              <button
                className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="button"
              >
                <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
                Login with Google
              </button>
              {/* <button
                className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                type="button"
              >
                <img src={appleIcon} alt="Apple" className="w-6 h-6 mr-2" />
                Login with Apple
              </button> */}
            </div>
          </div>
          {/* <div className="w-full md:w-2/3 lg:w-1/3 bg-secondary flex items-center justify-center lg:p-8 p-4 md:p-16 rounded-lg shadow-md h-100">
            <div className="text-center">
              <h1 className="text-lg font-normal text-left lg:pl-8 text-white">
                Welcome to
              </h1>
              <h1 className="text-4xl font-bold text-left text-white lg:pl-8">
                Poseidon Freight
              </h1>
              <img
                src={signupImage}
                alt="Freight Booker"
                className="my-6 mx-auto transform scale-x-[-1]"
              />
              <h2 className="text-3xl font-bold text-white">TRANSPORT</h2>
              <h2 className="text-3xl font-medium text-tertiary">LOGISTICS</h2>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
