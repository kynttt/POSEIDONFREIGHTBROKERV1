import { Quote } from "./types";

export const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function isQuote(obj: any): obj is Quote {
  return (
    obj &&
    typeof obj.pickupDate === "string" &&
    typeof obj.deliveryDate === "string"
    // Add other checks as needed
  );
}
