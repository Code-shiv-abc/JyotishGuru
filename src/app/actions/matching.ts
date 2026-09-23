"use server";

export async function checkCompatibility(data: {
  boy: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
  girl: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
}) {
  const workerUrl = process.env.KUNDALI_WORKER_URL;
  const apiKey = process.env.KUNDALI_WORKER_API_KEY;

  if (!workerUrl) {
      console.warn("KUNDALI_WORKER_URL is missing. Returning mock data for compatibility check.");
  }

  // TODO: Call actual Guna Milan endpoint on KUNDALI_WORKER_URL once confirmed
  // Example structure:
  // const response = await fetch(`${workerUrl}/guna-milan`, { ... });
  // if (!response.ok) throw new Error(...)
  // return await response.json();

  // MOCK DATA RESPONSE
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay

  return {
    score: 28.5,
    maxScore: 36,
    breakdown: [
      { name: "Varna", score: 1, max: 1, description: "Work compatibility" },
      { name: "Vashya", score: 2, max: 2, description: "Dominance compatibility" },
      { name: "Tara", score: 1.5, max: 3, description: "Destiny compatibility" },
      { name: "Yoni", score: 3, max: 4, description: "Intimacy compatibility" },
      { name: "Graha Maitri", score: 5, max: 5, description: "Mental compatibility" },
      { name: "Gana", score: 6, max: 6, description: "Temperament compatibility" },
      { name: "Bhakoot", score: 7, max: 7, description: "Love & Family compatibility" },
      { name: "Nadi", score: 3, max: 8, description: "Health & Gene compatibility" },
    ],
    status: "Excellent", // e.g. Poor, Average, Good, Excellent
    recommendation: "Highly recommended for marriage. Strong mental and emotional bond indicated."
  };
}
