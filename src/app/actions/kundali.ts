"use server";

export async function generateKundali(data: {
  name: string;
  gender: string;
  dob: string;
  tob: string;
  lat: number;
  lon: number;
  timezone: string;
}) {
  const workerUrl = process.env.KUNDALI_WORKER_URL;
  const apiKey = process.env.KUNDALI_WORKER_API_KEY;

  if (!workerUrl) {
    throw new Error("KUNDALI_WORKER_URL is not configured.");
  }

  try {
    const response = await fetch(`${workerUrl}/kundali`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey && { "Authorization": `Bearer ${apiKey}` }),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Worker Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to generate kundali:", error);
    // Throw standard error for UI to catch
    throw new Error(error instanceof Error ? error.message : "Failed to generate Kundali");
  }
}
