import {
  Button,
  Card,
  Center,
  Group,
  LoadingOverlay,
  PinInput,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OTPImage from "../assets/img/OTP.png";
import { useAuthStore } from "../state/useAuthStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, phoneOtpRequest, phoneOtpVerify } from "../lib/apiCalls";
import {
  PhoneOtpRequestData,
  PhoneOtpRequestResponse,
  PhoneOtpVerifyData,
  PhoneOtpVerifyResponse,
} from "../utils/types";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

export default function PhoneVerifyPage() {
  const { role, userId } = useAuthStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo");
  const [seconds, setSeconds] = useState(50);
  const [otp, setOtp] = useState("");
  // const [secret, setSecret] = useState("");
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["authUser", userId],
    queryFn: getUser,

    refetchOnWindowFocus: false, // Prevent refetch on window focus
  });

  const otpRequestMutation = useMutation<
    PhoneOtpRequestResponse,
    AxiosError,
    PhoneOtpRequestData
  >({
    mutationFn: phoneOtpRequest,
    // onSuccess: (response) => {
    //   setSecret(response.data.secret);
    // },
    onError: (error) => {
      notifications.show({
        color: "red",
        title: "Send OTP Error",
        message:
          (
            error.response?.data as {
              message: string;
            }
          ).message || "An error occurred",
      });
    },
  });

  const otpVerifyMutation = useMutation<
    PhoneOtpVerifyResponse,
    AxiosError,
    PhoneOtpVerifyData
  >({
    mutationFn: phoneOtpVerify,
    onSuccess: () => {
      notifications.show({
        title: "OTP Verified",
        message: "You have successfully verified your phone number",
      });

      let redirect: string;
      if (redirectTo) {
        redirect = redirectTo;
      } else {
        if (role === "admin") {
          redirect = "/a";
        } else {
          redirect = "/s";
        }
      }

      navigate(redirect, { replace: true });
    },
    onError: (error) => {
      notifications.show({
        color: "red",
        title: "OTP Verification Error",
        message:
          (
            error.response?.data as {
              message: string;
            }
          ).message || "An error occurred",
      });
    },
  });
  const resendOtp = () => {
    otpRequestMutation.mutate({
      userId: userId!,
      phoneNumber: data!.phone,
    });
    setSeconds(50); // Reset timer when OTP is resent
  };

  const onCompleteHandler = (otp: string) => {
    setIsComplete(true);
    otpVerifyMutation.mutate({
      // userId: userId!,
      userId: data!.phone,
      otp: otp,
      // secret: secret,
    });
  };
  useEffect(() => {
    if (data) {
      otpRequestMutation.mutate({
        userId: userId!,
        phoneNumber: data.phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  // Countdown timer logic
  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup the interval
    }
  }, [seconds]);

  return (
    <div className="w-full h-screen">
      <Center h={"100%"} pos="relative">
        <LoadingOverlay
          visible={isLoading || otpRequestMutation.isPending}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Card
          shadow="sm"
          w={{
            base: "100%",
            md: "50%",
            lg: "40%",
          }}
          h={{
            base: "100%",
            md: "50%",
            lg: "70%",
          }}
          p={"xl"}
        >
          <Stack align="center">
            <div className="text-center">
              <img
                src={OTPImage}
                alt="Verification"
                className="mx-auto mb-4 w-32 sm:w-48"
              />
              <h2 className="mb-2 text-xl font-semibold text-secondary">
                Enter your Verification Code
              </h2>
              <p className="mb-6 font-thin text-sm text-primary">
                We will send you an{" "}
                <span className="font-bold">One Time Passcode</span>
                <br />
                via this number{" "}
                <span className="font-bold">
                  {data?.phone.replace(/.(?=.{4})/g, "*")}
                </span>
              </p>
            </div>

            <PinInput
              length={6}
              placeholder="."
              size="md"
              onChange={(value) => setOtp(value)}
              onComplete={onCompleteHandler}
            />
            <Button
              fullWidth
              mt={"xl"}
              disabled={!isComplete}
              onClick={() => onCompleteHandler(otp)}
              loading={otpVerifyMutation.isPending}
            >
              Verify
            </Button>
            <Group>
              {seconds === 0 ? (
                <Button color="blue" onClick={resendOtp} variant="transparent">
                  Resend code
                </Button>
              ) : (
                <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
              )}
            </Group>
          </Stack>
        </Card>
      </Center>
    </div>
  );
}
