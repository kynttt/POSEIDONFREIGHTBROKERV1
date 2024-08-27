// import trailerSizes from './truckSizes.json';

// type TrailerType = "Dry Van" | "Refrigerated" | "Flatbed" | "Stepdeck";

export const trailerTypes = ["Dry Van", "Refrigerated", "Flatbed", "Stepdeck"];
export const calculatePrice = (
  distance: string,
  pricePerMile: number,
  maxWeight: string
): number | null => {
  if (distance && maxWeight) {
    const distanceNum = parseFloat(distance.replace(/[^\d.]/g, ""));

    const maxWeightNum = parseFloat(maxWeight);

    const calculatedPrice = pricePerMile * distanceNum + maxWeightNum * 0.1;

    return calculatedPrice;
  }
  return null;
};
// export const calculatePrice = (
//   distance: string,
//   selectedTrailerType: string,
//   selectedTrailerSize: number,
//   maxWeight: string
// ): number | null => {
//   if (distance && selectedTrailerType && selectedTrailerSize && maxWeight) {
//     const trailerType = selectedTrailerType as TrailerType;
//     const distanceNum = parseFloat(distance.replace(/[^\d.]/g, ''));
//     // const sizeMultiplier = trailerSizes.includes(selectedTrailerSize) ? 1.1 : 1;
//     const maxWeightNum = parseFloat(maxWeight);

//     // Validate trailer size against allowed sizes for the trailer type
//     const validSizesForType: Record<TrailerType, number[]> = {
//       'Dry Van': [53],
//       'Refrigerated': [53],
//       'Flatbed': [48, 53],
//       'Stepdeck': [48, 53],
//     };

//     if (!validSizesForType[trailerType].includes(selectedTrailerSize)) {
//       if (trailerType === 'Dry Van' || trailerType === 'Refrigerated') {
//         if (selectedTrailerSize === 48) {
//           alert(`The size 48 is currently not available for ${trailerType}. Please select other available size.`);
//           return null;
//         }
//       }
//       return null; // Invalid size for the selected trailer type
//     }

//     const pricePerMile = getPricePerMile(distanceNum, trailerType, selectedTrailerSize);

//     if (pricePerMile === 0) return null; // If trailer type or size is invalid

// //     const calculatedPrice = (pricePerMile * distanceNum * sizeMultiplier) +
// //                              (selectedTrailerSize * 1) +
// //                              (maxWeightNum * 0.1);

// //     return calculatedPrice;
// //   }

//   const calculatedPrice = (pricePerMile * distanceNum) +
//                               +
//                              (maxWeightNum * 0.1);

//     return calculatedPrice;
//   }
//   return null;
// };
