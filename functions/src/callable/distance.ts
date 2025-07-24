import {onCall, HttpsError} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";
import { COMPANY_ADDRESS, TRAVEL_DISTANCE_CHARGE, TRAVEL_DISTANCE_THRESHOLD, TRAVEL_DURATION_CHARGE, TRAVEL_DURATION_THRESHOLD } from "../constants";
import { Client } from "@googlemaps/google-maps-services-js";

const googleMapsClient = new Client({});
const apiKey = process.env.MAPS_API_KEY || ""; 

export const getDrivingDistance = onCall({ region: 'us-east1', secrets: ["MAPS_API_KEY"] }, async (request) => {
  const address1 = COMPANY_ADDRESS;
  const address2 = request.data.address;
  logger.info("Calculating distance for:", {
    companyAddress: address1,
    customerAddress: address2,
  });
  if (!address1 || !address2) {
    throw new HttpsError(
      "invalid-argument",
      "The function must be called with two arguments 'address1' and 'address2'."
    );
  }

  try {
    const response = await googleMapsClient.directions({
      params: {
        origin: address1,
        destination: address2,
        key: apiKey,
      },
      timeout: 1000, 
    });
    const route = response.data.routes[0];
    if (!route) {
      throw new Error('No route found between the specified addresses.');
    }
    const leg = route.legs[0];
    const distanceInMeters = leg.distance.value * 2;
    const durationInSeconds = leg.duration.value * 2;
    const distanceInMiles = distanceInMeters * 0.000621371;
    const durationInMinutes = Math.ceil(durationInSeconds / 60);
    let distanceSurcharge = 0;
    let durationSurcharge = 0;
    let surchargeType = '';
    let travelSurcharge = 0;
    let travelSurchargeMessage = '';

    if (+distanceInMiles - (TRAVEL_DISTANCE_THRESHOLD * 2) > 0) {
      distanceSurcharge = (+distanceInMiles - (TRAVEL_DISTANCE_THRESHOLD * 2)) * TRAVEL_DISTANCE_CHARGE;
    } else {
      distanceSurcharge = 0;
    }

    if (+durationInMinutes - (TRAVEL_DURATION_THRESHOLD * 2) > 0) {
      durationSurcharge = (+durationInMinutes - (TRAVEL_DURATION_THRESHOLD * 2)) * TRAVEL_DURATION_CHARGE;
    } else {
      durationSurcharge = 0;
    }

      if (distanceSurcharge > durationSurcharge) {
        travelSurcharge = distanceSurcharge;
        surchargeType = 'distance';
      } else {
        travelSurcharge = durationSurcharge;
        surchargeType = 'duration';
      }
    if (travelSurcharge > 0 && surchargeType === 'distance'){
      travelSurchargeMessage = `It looks like you are ${((+distanceInMiles/2) - TRAVEL_DISTANCE_THRESHOLD).toFixed(1)} miles outside of our service area. Don't worry, we can still help! Services rendered at the requested address will incur an additional $${distanceSurcharge.toFixed(2)} round-trip travel surcharge per visit.`;
    } else if (travelSurcharge > 0 && surchargeType === 'duration') {
      travelSurchargeMessage = `It looks like you are ${((+durationInMinutes/2) - TRAVEL_DURATION_THRESHOLD).toFixed(1)} minutes outside of our service area. Don't worry, we can still help! Services rendered at the requested address will incur an additional $${durationSurcharge.toFixed(2)} round-trip travel surcharge per visit.`;
    }

    return {travelSurchargeMessage, travelSurcharge };

  } catch (error: any) {
    logger.error("Full Directions API Error:", error.response?.data?.error_message || error.message);;
  throw new HttpsError( 
    "internal",
    error.response?.data?.error_message || "Could not calculate distance."
  );
  }
});