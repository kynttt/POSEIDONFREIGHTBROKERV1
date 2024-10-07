import { PriceError, Size } from "./types";

export const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function validatePricing({ sizes }: { sizes: Size[] }): PriceError {
  const errors: string[] = [];
  const invalidIndices: Record<number, number[]> = {};

  sizes.forEach((size, sizeIndex) => {
    size.pricing.forEach((pricing, pricingIndex) => {
      const invalidPricing = [];

      if (pricing.minDistance === undefined || isNaN(pricing.minDistance)) {
        errors.push(
          `Min Distance is invalid for Size ${size.size}, Pricing #${
            pricingIndex + 1
          }`
        );
        invalidPricing.push(pricingIndex);
      }
      if (pricing.maxDistance !== undefined && isNaN(pricing.maxDistance)) {
        errors.push(
          `Max Distance is invalid for Size ${size.size}, Pricing #${
            pricingIndex + 1
          }`
        );
        invalidPricing.push(pricingIndex);
      }
      if (
        pricing.pricePerMile === undefined ||
        pricing.pricePerMile <= 0 ||
        isNaN(pricing.pricePerMile)
      ) {
        errors.push(
          `Price per Mile is invalid for Size ${size.size}, Pricing #${
            pricingIndex + 1
          }`
        );
        invalidPricing.push(pricingIndex);
      }
      if (
        pricing.maxDistance !== undefined &&
        pricing.minDistance !== undefined &&
        pricing.minDistance > pricing.maxDistance
      ) {
        errors.push(
          `Min Distance cannot be greater than Max Distance for Size ${
            size.size
          }, Pricing #${pricingIndex + 1}`
        );
        invalidPricing.push(pricingIndex);
      }

      if (invalidPricing.length > 0) {
        invalidIndices[sizeIndex] = invalidIndices[sizeIndex] || [];
        invalidIndices[sizeIndex].push(pricingIndex);
      }
    });
  });

  return { errors, invalidIndices };
}

export async function getAddressFromLatLng(
  latLng: google.maps.LatLngLiteral
): Promise<string> {
  const geocoder = new google.maps.Geocoder();
  const response = await geocoder.geocode({ location: latLng });

  if (response.results[0]) {
    return response.results[0].formatted_address;
  } else {
    return "Address not found";
  }
}
