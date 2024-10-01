import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useAuthStore } from "../../../state/useAuthStore";
import {
  AccountCompletionData,
  AccountCompletionResponse,
  LogoutResponse,
} from "../../../utils/types";
import { accountCompletion, logoutUser } from "../../../lib/apiCalls";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
export default function AccountCompletion() {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const { logoutUpdate } = useAuthStore();
  const logoutMutation = useMutation<LogoutResponse, Error, void>({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/login", {
        replace: true,
      });
      notifications.show({
        title: "Logout successful",
        message: "You have been logged out",
        color: "green",
      });
      logoutUpdate();
    },
    onMutate: () => {
      notifications.show({
        title: "Logging out",
        message: "Please wait...",
        color: "blue",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Logout failed",
        message: error.message,
        color: "red",
      });
    },
  });
  const accountMutation = useMutation<
    AccountCompletionResponse,
    Error,
    AccountCompletionData
  >({
    mutationFn: accountCompletion,
    onSuccess: () => {
      navigate("/verify", {
        replace: true,
      });
    },
    onMutate: () => {
      notifications.show({
        title: "Completing account",
        message: "Please wait...",
        color: "blue",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Account completion failed",
        message: error.message,
        color: "red",
      });
    },
  });

  const handlePhoneChange = (value?: string) => {
    setPhone(value || "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "address") {
      setAddress(value);
    }
    if (name === "postalCode") {
      setPostalCode(value);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    if (!phone) {
      errors.phone = "Phone number is required";
    }
    if (!address) {
      errors.address = "Address is required";
    }

    if (!postalCode) {
      errors.postalCode = "Postal code is required";
    }

    if (!companyName) {
      errors.companyName = "Company name is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);

      return;
    }

    // mutation.mutate(formData, {
    //   onSuccess: () => {
    //     setIsSubmitting(false); // Stop loading state
    //   },
    //   onError: () => {
    //     setIsSubmitting(false); // Stop loading state
    //   },
    // });

    accountMutation.mutate({
      phone,
      address,
      postalCode,
      companyName,
    });
  };

  return (
    <div className="h-[100vh] flex items-center">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden ">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Complete Your Account
          </h2>
          <p className="text-gray-600 mb-6">
            Please provide the following information to complete your account
            setup.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-rblue">
                Phone number *
              </label>
              <div className="flex mt-1">
                <PhoneInput
                  defaultCountry="US" // Can be changed or omitted
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full border border-primary !bg-transparent text-black placeholder-white rounded-md  text-gray-700 h-10 p-4"
                  style={{ backgroundColor: "transparent" }}
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
              <label className="block text-sm font-medium text-rblue">
                Address *
              </label>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-1 md:space-x-4">
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={handleChange}
                  className={`mt-1  block w-full md:w-3/5 border border-primary  rounded-md bg-transparent placeholder-gray-700 text-primary placeholder-opacity-60 font-light h-10 p-4 ${
                    validationErrors.address ? "border-red-500" : ""
                  }`}
                  placeholder="City, State, Country"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  value={postalCode}
                  onChange={handleChange}
                  className={`mt-1  block w-full md:w-2/5 border border-primary bg-transparent placeholder-gray-700 text-primary placeholder-opacity-60 font-light rounded-md   h-10 p-4 ${
                    validationErrors.postalCode ? "border-red-500" : ""
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
              <label className="block text-sm font-medium text-rblue">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={`mt-1  block w-full border border-primary bg-transparent placeholder-gray-700 text-primary placeholder-opacity-60 font-light rounded-md h-10 p-4 ${
                  validationErrors.companyName ? "border-red-500" : ""
                }`}
                placeholder="Company Name"
                required
              />
              {validationErrors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.companyName}
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending || accountMutation.isPending}
                className={`w-[50%] border border-red-500 text-red-500 bg-transparent py-2 px-4 rounded-md hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                  logoutMutation.isPending || accountMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Logout
              </button>
              <div className="w-4"></div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={logoutMutation.isPending || accountMutation.isPending}
                className={`w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  logoutMutation.isPending || accountMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Complete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
