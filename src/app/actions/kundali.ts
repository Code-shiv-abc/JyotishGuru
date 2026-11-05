"use server";

import { computeVedicKundali, FullKundaliData } from "@/lib/vedic-ephemeris";
import { DateTime } from "luxon";

export async function generateKundali(data: {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  lat: number;
  lon: number;
  timezone: string;
}): Promise<FullKundaliData> {
  try {
    // Parse local date & time using the provided timezone, then convert to UTC
    const localDateTimeString = `${data.dob}T${data.tob}`;
    const localDateTime = DateTime.fromISO(localDateTimeString, { zone: data.timezone });

    if (!localDateTime.isValid) {
      throw new Error("Invalid date, time, or timezone provided.");
    }

    const utcDate = localDateTime.toJSDate();

    // Call our internal zero-cost ephemeris engine
    const kundaliData = computeVedicKundali(utcDate, data.lat, data.lon);

    return kundaliData;
  } catch (error) {
    console.error("Failed to generate kundali:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to generate Kundali");
  }
}
