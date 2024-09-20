import React, { useState } from "react";
// import signupImage from "../../../assets/img/DeliveredPackage.gif";
// import appleIcon from "../../../assets/img/apple.png";
import googleIcon from "../../../assets/img/googleicon.png";
import Button from "../../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../state/useAuthStore";
import { loginUser } from "../../../lib/apiCalls";
import { useMutation } from "@tanstack/react-query";
import { LoginResponse } from "../../../utils/types";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import loginBg from "../../../assets/img/loginBg.png";
import shippersImage from "../../../assets/img/PosFreightLogo.png";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo");
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onForgotPasswordHandler = () => {
    navigate("/forgot-password");
  };

  const handleSignUpClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (redirectTo) {
      navigate(`/signup?redirectTo=${redirectTo}`);
    } else {
      navigate("/signup");
    }
  };

  const mutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      const response = await loginUser(data.email, data.password);
      return response;
    },
    onSuccess: (data: LoginResponse) => {
      login({
        user: data.data,
      });
      let redirect: string;
      if (redirectTo) {
        redirect = redirectTo;
      } else {
        if (data.data.role === "admin") {
          redirect = "/a";
        } else {
          redirect = "/s";
        }
      }

      navigate(redirect, { replace: true });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          notifications.show({
            position: "top-right",
            title: "Something went wrong",
            message: "Invalid email or password",
            color: "red",
          });
        } else if (error.response.status === 409) {
          const userRole = error.response.data.data.role;

          notifications.show({
            position: "top-right",
            title: "User already logged in",
            message: "It means you are already logged in this device",
            color: "orange",
          });

          if (userRole === "admin") {
            navigate("/a");
          } else {
            navigate("/s");
          }
        } else if (error.response.status === 403) {
          notifications.show({
            position: "top-right",
            title: "Forbidden",
            message: error.response.data.message,
            color: "red",
          });
        } else {
          notifications.show({
            position: "top-right",
            title: "Something went wrong",
            message: "Please try again later",
            color: "red",
          });
        }
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    

    <div
      className="relative h-screen flex justify-center items-center "
      style={{ backgroundImage: `url(${loginBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-1"></div>
      <div className="relative z-10 flex h-full w-full md:px-36 justify-end items-center p-4">
        <div className="flex flex-col justify-center w-full max-w-full lg:max-w-4xl overflow-hidden">
        <div>
            <img src={shippersImage} alt="Shippers" className="w-24 h-auto mb-2 mx-auto" />
            </div>
          <div className="font-bold text-3xl mb-6 text-rblue mx-auto">
            Poseidon Freight
          </div>
            
            <div className="shadow-lg w-full mx-auto md:w-1/2 bg-white/30 backdrop-blur-xl border border-white/20 flex flex-col justify-center py-8 px-10 rounded-lg ">
            
            <div className="w-full max-w-sm mx-auto">
              <div className="flex flex-col items-center">
                {/* <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary text-center">
                  Sign In
                </h2> */}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-primary text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none border border-primary rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline bg-transparent h-10 placeholder-gray-700 placeholder-opacity-60 font-light"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <label
                      className="block text-primary text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none border border-primary rounded w-full py-2 px-3 text-primary  leading-tight focus:outline-none focus:shadow-outline bg-transparent h-10 placeholder-gray-700 placeholder-opacity-60 font-light"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[20px] transform -translate-y-1/2 text-gray-500"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                    <div className="">
                    <div className="flex justify-end">
                      <a
                      onClick={onForgotPasswordHandler}
                      className="inline-block underline align-baseline font-normal text-sm text-gray-700 hover:text-blue-800 cursor-pointer mt-2"
                      >
                      Forgot Password?
                      </a>
                    </div>
                    </div>
                  </div>
                  
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    label={mutation.isPending ? "Logging In..." : "Login"}
                    size="medium"
                    bgColor="#252F70"
                    hoverBgColor="white"
                    className="extra-class-for-medium-button w-full"
                    type="submit"
                  />
                </div>
              </form>
              <div className="mt-6 flex justify-center items-center">
                {/* <div className="border-t flex-grow border-primary"></div> */}
                <span className="px-3 text-gray-700 font-normal">or</span>
                {/* <div className="border-t flex-grow border-primary"></div> */}
              </div>
              <div className="mt-6 flex flex-col space-y-4">
                <button
                  className="bg-white  text-gray-700 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                  type="button"
                >
                  <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
                  Login with Google
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-700 font-normal">
                  Don’t have an account?{" "}
                  <a
                    href="#"
                    onClick={handleSignUpClick}
                    className="text-rblue hover:text-blue-800 underline"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
