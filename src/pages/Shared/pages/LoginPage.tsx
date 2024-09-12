import React, { useState, useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";
// import signupImage from "../../../assets/img/DeliveredPackage.gif";
import appleIcon from "../../../assets/img/apple.png";
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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gradientRef = useRef<NeatGradient | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <div className="relative h-screen flex justify-center items-center">
      {/* Canvas for NeatGradient */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ isolation: "isolate" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-1"></div>
      <div className="relative z-10 flex h-full w-full md:px-36 justify-center items-center p-4 ">
        <div className="flex justify-center w-full max-w-full lg:max-w-4xl  overflow-hidden">
          {/* <div className="w-full md:w-1/2 bg-secondary flex flex-col justify-center items-center p-8">
            <h1 className="text-white text-2xl md:text-4xl mb-4 text-center">
              Poseidon Freight
            </h1>
            <img
              src={signupImage}
              alt="Freight Booker"
              className="w-3/4 md:w-full mx-auto"
            />
            <p className="text-white text-xl md:text-2xl mt-4 text-center">
              Transport Logistics
            </p>
          </div> */}

          <div className="w-full md:w-1/2 bg-white/20 backdrop-blur-sm border border-white/20 flex flex-col justify-center p-8 rounded-lg">
            <div className="w-full max-w-sm mx-auto">
              <div className="flex flex-col items-center">
                {/* <img
                  src="/pos-logo.png" // Image path assuming it's in the public directory
                  alt="Poseidon Logo"
                  className="mb-4 w-32 h-auto" // Adjust width and height as needed
                /> */}
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">
                  Sign In
                </h2>
                {/* Other content */}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none border border-white rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent h-10  placeholder-white  placeholder-opacity-60 font-light"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <label
                      className="block text-white text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a
                      onClick={onForgotPasswordHandler}
                      className="inline-block underline align-baseline font-normal text-xs text-white hover:text-blue-800 md:pl-10 cursor-pointer"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none border border-white rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline bg-transparent h-10  placeholder-white placeholder-opacity-60 font-light"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[20px] transform -translate-y-1/2 text-white"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
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
              <div className="mt-6 flex items-center">
                <div className="border-t flex-grow border-white"></div>
                <span className="px-3 text-white font-normal">or</span>
                <div className="border-t flex-grow border-white"></div>
              </div>
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
              <div className="mt-6 text-center">
                <p className="text-white font-normal">
                  Don’t have an account?{" "}
                  <a
                    href="#"
                    onClick={handleSignUpClick}
                    className="text-white hover:text-blue-800 underline"
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
