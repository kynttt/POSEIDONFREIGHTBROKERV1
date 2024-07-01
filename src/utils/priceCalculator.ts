// src/utils/priceCalculator.ts
interface TrailerTypePrices {
    [key: string]: number;
  }
  
  interface TrailerSizePrices {
    [key: string]: number;
  }
  
  interface DistanceData {
    [key: string]: { [key: string]: number };
  }
  
  export const trailerTypePrices: TrailerTypePrices = {
    'Flat Bed': 2.0,
    'Dry Van': 1.5,
    'Refrigerated': 3.0,
  };
  
  export const trailerSizePrices: TrailerSizePrices = {
    '48 ft': 1.0,
    '53 ft': 1.2,
  };
  
  export const getDistance = (startLocation: string, endLocation: string, distanceData: DistanceData): number => {
    return distanceData[startLocation]?.[endLocation] || 0;
  };
  
  export const calculatePrice = (
    pickUpLocation: string,
    deliveryLocation: string,
    trailerType: string,
    trailerSize: string,
    maxWeight: string,
    distanceData: DistanceData,
  ): number => {
    const distance = getDistance(pickUpLocation, deliveryLocation, distanceData);
    const trailerTypePrice = trailerTypePrices[trailerType] || 0;
    const trailerSizePrice = trailerSizePrices[trailerSize] || 0;
    const weight = parseFloat(maxWeight) || 0;
  
    return distance * (trailerTypePrice + trailerSizePrice) * weight;
  };
  