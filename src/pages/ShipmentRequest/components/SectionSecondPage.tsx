import {
  faArrowLeft,
  faBox,
  faBoxOpen,
  faBuilding,
  faCalendarDay,
  faLocationDot,
  faMoneyBill1Wave,
  faRuler,
  faTruckFront,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useDistanceCalculator, {
  DistanceCalculatorData,
} from "../../../hooks/useDistanceCalculator";
import { ReactNode, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { createQuote } from "../../../lib/apiCalls";
import { Quote } from "../../../utils/types";
import { useDistancePage } from "../context/DistancePageProvider";

export default function SectionSecondPage() {
  const navigate = useNavigate();

  const { goToFormPage } = useDistancePage();
  const { data, init } = useDistanceCalculator();
  const [initialize, setInitialize] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(true); // Set initial state to true

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTermsChecked(e.target.checked);
  };

  const quoteMutation = useMutation<Quote, Error, Quote>({
    mutationFn: createQuote,
    onMutate: () => {
      notifications.show({
        title: "Creating Quote",
        message: "Please wait...",
        color: "blue",
        icon: true,
        autoClose: 5000,
      });
    },
    onSuccess: (data) => {
      sessionStorage.removeItem("savedQuote");
      notifications.show({
        title: "Quote Created",
        message:
          "Your quote has been successfully created. You will be redirected to the confirmation page shortly.",
        color: "green",
        icon: true,
        autoClose: 5000,
      });
      // navigate("/requests/confirmation?quoteId=" + data._id);
      navigate("/requests/payment?quoteId=" + data._id!);
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "An error occurred while creating the quote",
        color: "red",
        icon: true,
        autoClose: 5000,
      });
    },
  });

  useEffect(() => {
    const savedQuote = sessionStorage.getItem("savedQuote");

    if (savedQuote && !data) {
      const quoteDetails: DistanceCalculatorData = JSON.parse(savedQuote);
      init(quoteDetails);
    } else if (!savedQuote && !data) {
      // If no saved quote is found, redirect back to the form page
      notifications.show({
        title: "Error",
        message: "No quote data found. Redirecting back to the form page.",
        color: "red",
        icon: true,
        autoClose: 5000,
      });
      goToFormPage();
    }
    setInitialize(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, data, quoteMutation, navigate]);

  const nextHandler = () => {
    if (!data) return;
    const {
      trailerType,
      origin,
      destination,
      pickupDate,
      trailerSize,
      commodity,
      maxWeight,
      companyName,
      distance,
      packagingNumber,
      packagingType,
      price,
      notes,
    } = data!;

    // console.log(!distance);
    if (
      !trailerType ||
      !origin ||
      !destination ||
      !pickupDate ||
      !trailerSize ||
      !commodity ||
      !maxWeight ||
      !companyName ||
      !distance ||
      !packagingNumber ||
      !packagingType ||
      !price
    ) {
      return;
    }

    const quoteDetails: Quote = {
      origin,
      destination,
      pickupDate: new Date(pickupDate).toISOString(),
      trailerType: trailerType.truckType,
      trailerSize: trailerSize,
      commodity,
      maxWeight: parseInt(maxWeight),
      companyName,
      distance,
      packaging: `${packagingNumber} ${packagingType}`,
      price: parseFloat(price!.toFixed(2)),
      notes,
      routeCoordinates: {
        type: "LineString",
        coordinates: data.routeCoordinates.coordinates,
      },
      unit: "",
    };

    quoteMutation.mutate(quoteDetails);
  };

  if (!initialize) return <></>;

  return (
    <>
      <div className="w-full h-full overflow-auto px-4 ">
        <div className="w-full flex items-center justify-center h-[10%] text-primary text-lg font-bold relative">
          <div className="absolute left-6 text-primary">
            <ActionIcon variant="subtle" onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </ActionIcon>
          </div>
          <div className="text-center">
            SHIPMENT DETAILS
            <br />
            CONFIRMATION
          </div>
        </div>
        <div className="h-[90%] p-5">
          <div>
            <div className="text-primary text-[0.8rem] font-normal">
              Please double check the details for your shipment before proceed
              to the next process.
            </div>
            <div className="border-t border-primary mb-10 mt-2" />{" "}
          </div>
          <div className="flex flex-col">
            <TitleIcon
              icon={<FontAwesomeIcon icon={faLocationDot} />}
              title="Pickup Location"
            />
            <p className="text-primary py-4 ml-8">{data!.origin}</p>
          </div>
          <div className="flex flex-col">
            <TitleIcon
              icon={<FontAwesomeIcon icon={faLocationDot} />}
              title="Drop-off location"
            />
            <p className="text-primary py-4 ml-8">{data!.destination}</p>
          </div>{" "}
          <table className="w-full table-fixed border-collapse mt-4 mb-5">
            <tbody>
              <TableRow
                icon={<FontAwesomeIcon icon={faTruckFront} />}
                title="Trailer Type"
                value={data!.trailerType?.truckType}
              />
              <TableRow
                icon={<FontAwesomeIcon icon={faCalendarDay} />}
                title="Pickup Date"
                value={
                  data!.pickupDate
                    ? new Date(data!.pickupDate).toLocaleDateString()
                    : "TBA"
                }
              />
              <TableRow
                icon={<FontAwesomeIcon icon={faRuler} />}
                title="Size (ft.)"
                value={data!.trailerSize}
              />
              <TableRow
                icon={<FontAwesomeIcon icon={faBuilding} />}
                title="Company Name"
                value={data!.companyName}
              />
              <TableRow
                icon={<FontAwesomeIcon icon={faBoxOpen} />}
                title="Commodity"
                value={data!.commodity}
              />
              <TableRow
                icon={<FontAwesomeIcon icon={faBox} />}
                title="Packaging"
                value={`${data!.packagingNumber} ${data!.packagingType}`}
              />
            </tbody>
          </table>
          <div className="flex flex-col w-full  text-primary text-bold">
            <TitleIcon
              icon={<FontAwesomeIcon icon={faMoneyBill1Wave} />}
              title="Total Shipment Price"
            />
            <div className="flex justify-end text-[2rem]">
              $ {data?.price ? data!.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
            </div>
          </div>
          <div className="flex flex-col text-primary text-bold mt-2">
            <TitleIcon
              icon={<FontAwesomeIcon icon={faMoneyBill1Wave} />}
              title="Taxes and other fees"
            />
            <div className="flex justify-end text-[1.5rem]">$0.00</div>
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
                className="text-sm text-primary font-normal ml-2"
              >
                I agree to the{" "}
                <a
                href="/terms-and-agreement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rblue underline cursor-pointer hover:text-blue-700"
                >
                Terms of Service
                </a>
              </label>
              </div>

            <div className="flex gap-2 py-8 justify-between">
            <Button variant="outline" w={"30%"} onClick={goToFormPage}>
              Back
            </Button>
            <Button onClick={nextHandler} fullWidth disabled={!isTermsChecked}>
              Proceed to Payment
            </Button>
            </div>
        </div>
      </div>
    </>
  );
}

function TitleIcon({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400 mr-3">{icon} </span>
      <h3 className="text-sm font-medium text-primary">{title}</h3>
    </div>
  );
}
function TableRow({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string | number | undefined;
}) {
  return (
    <tr>
      <td className=" text-left text-gray-400 w-1/2">
        <TitleIcon icon={icon} title={title} />
      </td>
      <td className="text-primary py-2 ml-8">{value}</td>
    </tr>
  );
}
