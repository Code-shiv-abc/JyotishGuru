"use server";

import { calculateEnterpriseCompatibility } from "@/lib/astrology";

export async function checkCompatibility(data: {
  boy: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
  girl: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
}) {
  return calculateEnterpriseCompatibility(data);
}
