"use server";

import { AyanamshaSystem, calculateEnterpriseKundali } from "@/lib/astrology";

export async function generateKundali(data: {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  lat: number;
  lon: number;
  timezone: string;
  ayanamshaSystem?: AyanamshaSystem;
}) {
  return calculateEnterpriseKundali(data);
        }
