"use server";
import { computeVedicKundali } from "@/lib/vedic-ephemeris";

function parseVedicDate(dob: string, tob: string, tzString: string): Date {
  try {
    if (tzString) {
      const formatted = new Date(`${dob}T${tob}:00`).toLocaleString("en-US", { timeZone: tzString });
      const d = new Date(formatted);
      const diff = new Date(`${dob}T${tob}:00Z`).getTime() - d.getTime();
      return new Date(new Date(`${dob}T${tob}:00Z`).getTime() + diff);
    }
    return new Date(`${dob}T${tob}:00`);
  } catch (_e) {
    return new Date(`${dob}T${tob}:00Z`); // Fallback to UTC
  }
}

export async function checkCompatibility(data: {
  boy: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
  girl: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
}) {
  const boyUtc = parseVedicDate(data.boy.dob, data.boy.tob, data.boy.timezone);
  const boyChart = computeVedicKundali(boyUtc, data.boy.lat, data.boy.lon);

  const girlUtc = parseVedicDate(data.girl.dob, data.girl.tob, data.girl.timezone);
  const girlChart = computeVedicKundali(girlUtc, data.girl.lat, data.girl.lon);

  // Find Moon for both
  const boyMoon = boyChart.planets.find(p => p.name === "Moon (Chandra)")!;
  const girlMoon = girlChart.planets.find(p => p.name === "Moon (Chandra)")!;

  const boyNak = boyMoon.nakshatraIndex;
  const girlNak = girlMoon.nakshatraIndex;

  const boyRashi = boyMoon.rashiIndex;
  const girlRashi = girlMoon.rashiIndex;

  // 1. Varna (1 point)
  // Brahmin=0, Kshatriya=1, Vaishya=2, Shudra=3
  const varnaMapping = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0];
  const bVarna = varnaMapping[boyRashi];
  const gVarna = varnaMapping[girlRashi];
  let varnaScore = 0;
  if (bVarna <= gVarna) varnaScore = 1;

  // 2. Vashya (2 points)
  // Chatushpada=0, Dwipada=1, Jalchar=2, Vanchar=3, Keeta=4, Kumbha=5
  const vashyaMapping = [0, 0, 1, 2, 3, 1, 1, 4, 0, 2, 1, 2];
  const bVashya = vashyaMapping[boyRashi];
  const gVashya = vashyaMapping[girlRashi];
  let vashyaScore = 0;
  if (bVashya === gVashya) vashyaScore = 2;
  else if ((bVashya === 2 && gVashya === 4) || (bVashya === 4 && gVashya === 2)) vashyaScore = 1; // Water/Keeta
  else if ((bVashya === 0 && gVashya === 3) || (bVashya === 3 && gVashya === 0)) vashyaScore = 0; // Vanchar eats Chatushpada
  else if (bVashya === 1 || gVashya === 1) vashyaScore = 1; // Dwipada with others is often 1
  else vashyaScore = 1; // Simplified default

  // 3. Tara (3 points)
  const taraScore = (((girlNak - boyNak + 27) % 27) % 9) % 2 === 0 ? 3 : 1.5;

  // 4. Yoni (4 points)
  const yoniMapping = [0, 1, 2, 3, 4, 5, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1];
  const bYoni = yoniMapping[boyNak];
  const gYoni = yoniMapping[girlNak];
  const yoniTable = [
    /*0 As*/ [4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 3, 3, 2, 1],
    /*1 Ga*/ [2, 4, 3, 3, 2, 2, 2, 2, 3, 1, 2, 3, 2, 0],
    /*2 Me*/ [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1],
    /*3 Sa*/ [3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 0, 2],
    /*4 Sh*/ [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 1, 1],
    /*5 Ma*/ [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 3, 3, 2, 1],
    /*6 Mu*/ [2, 2, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2],
    /*7 Ga*/ [1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1],
    /*8 Mh*/ [0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 1],
    /*9 Vy*/ [1, 1, 1, 2, 1, 1, 2, 0, 1, 4, 1, 1, 2, 1],
    /*10 Mr*/ [3, 2, 2, 2, 0, 3, 2, 3, 2, 1, 4, 2, 2, 1],
    /*11 Va*/ [3, 3, 0, 2, 2, 3, 2, 2, 2, 1, 2, 4, 3, 2],
    /*12 Na*/ [2, 2, 3, 0, 1, 2, 1, 2, 2, 2, 2, 3, 4, 2],
    /*13 Si*/ [1, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 4]
  ];
  const yoniScore = yoniTable[bYoni][gYoni];

  // 5. Graha Maitri (5 points)
  const rashiLords = [0, 1, 2, 3, 4, 2, 1, 0, 5, 6, 6, 5]; // Mars=0, Venus=1, Mercury=2, Moon=3, Sun=4, Jupiter=5, Saturn=6
  const planetaryFriendship = [
    /* Mars */ [0, 1, 2, 0, 0, 0, 1],
    /* Venus */ [1, 0, 0, 2, 2, 1, 0],
    /* Merc */ [1, 0, 0, 2, 0, 1, 1],
    /* Moon */ [1, 1, 0, 0, 0, 1, 1],
    /* Sun */ [0, 2, 1, 0, 0, 0, 2],
    /* Jup */ [0, 2, 2, 0, 0, 0, 1],
    /* Sat */ [2, 0, 0, 2, 2, 1, 0]
  ];
  const bLord = rashiLords[boyRashi];
  const gLord = rashiLords[girlRashi];
  const f1 = planetaryFriendship[bLord][gLord];
  const f2 = planetaryFriendship[gLord][bLord];
  let maitriScore = 0;
  if (bLord === gLord) maitriScore = 5;
  else if (f1 === 0 && f2 === 0) maitriScore = 5;
  else if ((f1 === 0 && f2 === 1) || (f1 === 1 && f2 === 0)) maitriScore = 4;
  else if (f1 === 1 && f2 === 1) maitriScore = 3;
  else if ((f1 === 0 && f2 === 2) || (f1 === 2 && f2 === 0)) maitriScore = 1;
  else if ((f1 === 1 && f2 === 2) || (f1 === 2 && f2 === 1)) maitriScore = 0.5;
  else maitriScore = 0;

  // 6. Gana (6 points)
  // Deva=0, Manushya=1, Rakshasa=2
  const ganaMapping = [0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0];
  const bGana = ganaMapping[boyNak];
  const gGana = ganaMapping[girlNak];
  let ganaScore = 0;
  if (bGana === gGana) ganaScore = 6;
  else if (bGana === 0 && gGana === 1) ganaScore = 6;
  else if (bGana === 1 && gGana === 0) ganaScore = 5;
  else if (bGana === 2 && gGana === 0) ganaScore = 1;
  else if (bGana === 0 && gGana === 2) ganaScore = 0;
  else if (bGana === 1 && gGana === 2) ganaScore = 0;
  else if (bGana === 2 && gGana === 1) ganaScore = 0;

  // 7. Bhakoot (7 points)
  const dist1 = ((girlRashi - boyRashi + 12) % 12) + 1;
  let bhakootScore = 0;
  if ([1, 3, 4, 5, 7, 9, 10, 11].includes(dist1)) {
    bhakootScore = 7;
  } else if (bLord === gLord) {
    bhakootScore = 7;
  } else if ((f1 === 0 && f2 === 0) || (f1 === 0 && f2 === 1) || (f1 === 1 && f2 === 0)) {
    bhakootScore = 7;
  } else {
    bhakootScore = 0;
  }

  // 8. Nadi (8 points)
  const nadiMapping = [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2];
  const bNadi = nadiMapping[boyNak];
  const gNadi = nadiMapping[girlNak];
  const nadiScore = bNadi === gNadi ? 0 : 8;

  const totalScore = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;

  let status = "Poor";
  let recommendation = "Not recommended for marriage. Major doshas present.";
  if (totalScore >= 28) {
    status = "Excellent";
    recommendation = "Highly recommended for marriage. Strong mental and emotional bond indicated.";
  } else if (totalScore >= 21) {
    status = "Good";
    recommendation = "Recommended for marriage. Above average compatibility.";
  } else if (totalScore >= 18) {
    status = "Average";
    recommendation = "Acceptable for marriage, but some adjustments will be required.";
  }

  // Manglik Check
  const bManglik = boyChart.manglik.isManglik;
  const gManglik = girlChart.manglik.isManglik;

  if (bManglik && !gManglik) {
    recommendation += " Note: Boy is Manglik, girl is not. Manglik dosha cancellation rules should be checked.";
  } else if (!bManglik && gManglik) {
    recommendation += " Note: Girl is Manglik, boy is not. Manglik dosha cancellation rules should be checked.";
  } else if (bManglik && gManglik) {
    recommendation += " Note: Both are Manglik, which balances the dosha.";
  } else {
    recommendation += " Note: Both are free from Manglik dosha.";
  }

  return {
    score: totalScore,
    maxScore: 36,
    breakdown: [
      { name: "Varna", score: varnaScore, max: 1, description: "Spiritual ego compatibility" },
      { name: "Vashya", score: vashyaScore, max: 2, description: "Mutual attraction" },
      { name: "Tara", score: taraScore, max: 3, description: "Birth star harmony" },
      { name: "Yoni", score: yoniScore, max: 4, description: "Biological compatibility" },
      { name: "Graha Maitri", score: maitriScore, max: 5, description: "Planetary friendship" },
      { name: "Gana", score: ganaScore, max: 6, description: "Temperament match" },
      { name: "Bhakoot", score: bhakootScore, max: 7, description: "Mutual Moon sign distance" },
      { name: "Nadi", score: nadiScore, max: 8, description: "Genetic & pranic vitality" },
    ],
    status,
    recommendation
  };
}
