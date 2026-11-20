import * as Astronomy from "astronomy-engine";

export interface PanchangCity {
  id: string;
  nameEn: string;
  nameHi: string;
  lat: number;
  lon: number;
  elevation: number;
  utcOffsetMin: number;
  tzLabel: string;
}

export const PANCHANG_CITIES: PanchangCity[] = [
  // Uttar Pradesh & Sacred Teerthas
  { id: "ayodhya", nameEn: "Ayodhya Dham, UP", nameHi: "अयोध्या धाम, उ.प्र.", lat: 26.7922, lon: 82.1998, elevation: 93, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "varanasi", nameEn: "Varanasi (Kashi), UP", nameHi: "वाराणसी (काशी), उ.प्र.", lat: 25.3176, lon: 82.9739, elevation: 81, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "prayagraj", nameEn: "Prayagraj, UP", nameHi: "प्रयागराज, उ.प्र.", lat: 25.4358, lon: 81.8463, elevation: 98, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "lucknow", nameEn: "Lucknow, UP", nameHi: "लखनऊ, उ.प्र.", lat: 26.8467, lon: 80.9462, elevation: 123, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "kanpur", nameEn: "Kanpur, UP", nameHi: "कानपुर, उ.प्र.", lat: 26.4499, lon: 80.3319, elevation: 126, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "mathura", nameEn: "Mathura / Vrindavan, UP", nameHi: "मथुरा / वृन्दावन, उ.प्र.", lat: 27.4924, lon: 77.6737, elevation: 174, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "gorakhpur", nameEn: "Gorakhpur, UP", nameHi: "गोरखपुर, उ.प्र.", lat: 26.7606, lon: 83.3732, elevation: 84, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "agra", nameEn: "Agra, UP", nameHi: "आगरा, उ.प्र.", lat: 27.1767, lon: 78.0081, elevation: 171, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "noida", nameEn: "Noida / Ghaziabad, UP", nameHi: "नोएडा / गाजियाबाद, उ.प्र.", lat: 28.5355, lon: 77.391, elevation: 200, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "meerut", nameEn: "Meerut, UP", nameHi: "मेरठ, उ.प्र.", lat: 28.9845, lon: 77.7064, elevation: 225, utcOffsetMin: 330, tzLabel: "IST" },
  // North India & Uttarakhand
  { id: "delhi", nameEn: "New Delhi", nameHi: "नई दिल्ली", lat: 28.6139, lon: 77.209, elevation: 216, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "gurugram", nameEn: "Gurugram, Haryana", nameHi: "गुरुग्राम, हरियाणा", lat: 28.4595, lon: 77.0266, elevation: 217, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "haridwar", nameEn: "Haridwar, Uttarakhand", nameHi: "हरिद्वार, उत्तराखंड", lat: 29.9457, lon: 78.1642, elevation: 314, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "rishikesh", nameEn: "Rishikesh, Uttarakhand", nameHi: "ऋषिकेश, उत्तराखंड", lat: 30.0869, lon: 78.2676, elevation: 372, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "dehradun", nameEn: "Dehradun, Uttarakhand", nameHi: "देहरादून, उत्तराखंड", lat: 30.3165, lon: 78.0322, elevation: 640, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "chandigarh", nameEn: "Chandigarh", nameHi: "चंडीगढ़", lat: 30.7333, lon: 76.7794, elevation: 321, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "amritsar", nameEn: "Amritsar, Punjab", nameHi: "अमृतसर, पंजाब", lat: 31.634, lon: 74.8723, elevation: 234, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "jammu", nameEn: "Jammu, J&K", nameHi: "जम्मू, जम्मू-कश्मीर", lat: 32.7266, lon: 74.857, elevation: 327, utcOffsetMin: 330, tzLabel: "IST" },
  // Central & West India
  { id: "ujjain", nameEn: "Ujjain (Mahakal), MP", nameHi: "उज्जैन (महाकाल), म.प्र.", lat: 23.1765, lon: 75.7885, elevation: 494, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "indore", nameEn: "Indore, MP", nameHi: "इंदौर, म.प्र.", lat: 22.7196, lon: 75.8577, elevation: 553, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "bhopal", nameEn: "Bhopal, MP", nameHi: "भोपाल, म.प्र.", lat: 23.2599, lon: 77.4126, elevation: 527, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "jabalpur", nameEn: "Jabalpur, MP", nameHi: "जबलपुर, म.प्र.", lat: 23.1815, lon: 79.9864, elevation: 412, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "jaipur", nameEn: "Jaipur, Rajasthan", nameHi: "जयपुर, राजस्थान", lat: 26.9124, lon: 75.7873, elevation: 431, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "jodhpur", nameEn: "Jodhpur, Rajasthan", nameHi: "जोधपुर, राजस्थान", lat: 26.2389, lon: 73.0243, elevation: 231, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "udaipur", nameEn: "Udaipur, Rajasthan", nameHi: "उदयपुर, राजस्थान", lat: 24.5854, lon: 73.7125, elevation: 598, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "mumbai", nameEn: "Mumbai, Maharashtra", nameHi: "मुंबई, महाराष्ट्र", lat: 19.076, lon: 72.8777, elevation: 14, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "pune", nameEn: "Pune, Maharashtra", nameHi: "पुणे, महाराष्ट्र", lat: 18.5204, lon: 73.8567, elevation: 560, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "nagpur", nameEn: "Nagpur, Maharashtra", nameHi: "नागपुर, महाराष्ट्र", lat: 21.1458, lon: 79.0882, elevation: 310, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "nashik", nameEn: "Nashik, Maharashtra", nameHi: "नासिक, महाराष्ट्र", lat: 19.9975, lon: 73.7898, elevation: 584, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "ahmedabad", nameEn: "Ahmedabad, Gujarat", nameHi: "अहमदाबाद, गुजरात", lat: 23.0225, lon: 72.5714, elevation: 53, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "surat", nameEn: "Surat, Gujarat", nameHi: "सूरत, गुजरात", lat: 21.1702, lon: 72.8311, elevation: 13, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "vadodara", nameEn: "Vadodara, Gujarat", nameHi: "वडोदरा, गुजरात", lat: 22.3072, lon: 73.1812, elevation: 39, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "dwarka", nameEn: "Dwarka, Gujarat", nameHi: "द्वारका, गुजरात", lat: 22.2442, lon: 68.9685, elevation: 5, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "somnath", nameEn: "Somnath, Gujarat", nameHi: "सोमनाथ, गुजरात", lat: 20.888, lon: 70.4012, elevation: 10, utcOffsetMin: 330, tzLabel: "IST" },
  // East & Northeast India
  { id: "patna", nameEn: "Patna, Bihar", nameHi: "पटना, बिहार", lat: 25.5941, lon: 85.1376, elevation: 53, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "gaya", nameEn: "Gaya, Bihar", nameHi: "गया, बिहार", lat: 24.7914, lon: 85.0002, elevation: 111, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "ranchi", nameEn: "Ranchi, Jharkhand", nameHi: "रांची, झारखंड", lat: 23.3441, lon: 85.3096, elevation: 651, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "raipur", nameEn: "Raipur, Chhattisgarh", nameHi: "रायपुर, छत्तीसगढ़", lat: 21.2514, lon: 81.6296, elevation: 298, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "kolkata", nameEn: "Kolkata, West Bengal", nameHi: "कोलकाता, पश्चिम बंगाल", lat: 22.5726, lon: 88.3639, elevation: 9, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "puri", nameEn: "Jagannath Puri, Odisha", nameHi: "जगन्नाथ पुरी, ओडिशा", lat: 19.8135, lon: 85.8312, elevation: 10, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "bhubaneswar", nameEn: "Bhubaneswar, Odisha", nameHi: "भुवनेश्वर, ओडिशा", lat: 20.2961, lon: 85.8245, elevation: 45, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "guwahati", nameEn: "Guwahati (Kamakhya), Assam", nameHi: "गुवाहाटी (कामाख्या), असम", lat: 26.1445, lon: 91.7362, elevation: 55, utcOffsetMin: 330, tzLabel: "IST" },
  // South India
  { id: "bengaluru", nameEn: "Bengaluru, Karnataka", nameHi: "बेंगलुरु, कर्नाटक", lat: 12.9716, lon: 77.5946, elevation: 920, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "mysuru", nameEn: "Mysuru, Karnataka", nameHi: "मैसूरु, कर्नाटक", lat: 12.2958, lon: 76.6394, elevation: 763, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "hyderabad", nameEn: "Hyderabad, Telangana", nameHi: "हैदराबाद, तेलंगाना", lat: 17.385, lon: 78.4867, elevation: 542, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "tirupati", nameEn: "Tirupati, Andhra Pradesh", nameHi: "तिरुपति, आंध्र प्रदेश", lat: 13.6288, lon: 79.4192, elevation: 162, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "chennai", nameEn: "Chennai, Tamil Nadu", nameHi: "चेन्नई, तमिलनाडु", lat: 13.0827, lon: 80.2707, elevation: 6, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "madurai", nameEn: "Madurai, Tamil Nadu", nameHi: "मदुरै, तमिलनाडु", lat: 9.9252, lon: 78.1198, elevation: 134, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "rameshwaram", nameEn: "Rameswaram, Tamil Nadu", nameHi: "रामेश्वरम, तमिलनाडु", lat: 9.2876, lon: 79.3129, elevation: 10, utcOffsetMin: 330, tzLabel: "IST" },
  { id: "kochi", nameEn: "Kochi, Kerala", nameHi: "कोच्चि, केरल", lat: 9.9312, lon: 76.2673, elevation: 5, utcOffsetMin: 330, tzLabel: "IST" },
  // Global NRI Hubs
  { id: "dubai", nameEn: "Dubai, UAE", nameHi: "दुबई, यूएई", lat: 25.2048, lon: 55.2708, elevation: 5, utcOffsetMin: 240, tzLabel: "GST" },
  { id: "singapore", nameEn: "Singapore", nameHi: "सिंगापुर", lat: 1.3521, lon: 103.8198, elevation: 15, utcOffsetMin: 480, tzLabel: "SGT" },
  { id: "london", nameEn: "London, UK", nameHi: "लंदन, यूके", lat: 51.5072, lon: -0.1276, elevation: 11, utcOffsetMin: 0, tzLabel: "UTC" },
  { id: "newyork", nameEn: "New York, USA", nameHi: "न्यूयॉर्क, यूएसए", lat: 40.7128, lon: -74.006, elevation: 10, utcOffsetMin: -300, tzLabel: "EST" },
  { id: "toronto", nameEn: "Toronto, Canada", nameHi: "टोरंटो, कनाडा", lat: 43.6532, lon: -79.3832, elevation: 76, utcOffsetMin: -300, tzLabel: "EST" },
  { id: "sydney", nameEn: "Sydney, Australia", nameHi: "सिडनी, ऑस्ट्रेलिया", lat: -33.8688, lon: 151.2093, elevation: 19, utcOffsetMin: 600, tzLabel: "AEST" },
];

const norm360 = (deg: number) => ((deg % 360) + 360) % 360;

export function getLahiriAyanamsha(date: Date): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  const omega = norm360(125.04452 - 1934.136261 * T);
  const nutation = -17.2 * Math.sin((omega * Math.PI) / 180);
  return 23.8570922 + (5028.796195 * T + 1.1054348 * T * T + nutation) / 3600.0;
}

export function getSiderealSunMoon(date: Date) {
  const ayanamsha = getLahiriAyanamsha(date);
  const sunTrop = Astronomy.SunPosition(date).elon;
  const moonTrop = Astronomy.EclipticGeoMoon(date).lon;
  return {
    ayanamsha,
    sunSid: norm360(sunTrop - ayanamsha),
    moonSid: norm360(moonTrop - ayanamsha),
  };
}

const MASAS = [
  { en: "Chaitra", hi: "चैत्र" },
  { en: "Vaishakha", hi: "वैशाख" },
  { en: "Jyeshtha", hi: "ज्येष्ठ" },
  { en: "Ashadha", hi: "आषाढ़" },
  { en: "Shravana", hi: "श्रावण" },
  { en: "Bhadrapada", hi: "भाद्रपद" },
  { en: "Ashwin", hi: "आश्विन" },
  { en: "Kartika", hi: "कार्तिक" },
  { en: "Margashirsha", hi: "मार्गशीर्ष" },
  { en: "Pausha", hi: "पौष" },
  { en: "Magha", hi: "माघ" },
  { en: "Phalguna", hi: "फाल्गुन" },
];

const VARA = [
  { en: "Sunday", hi: "रविवार" }, { en: "Monday", hi: "सोमवार" },
  { en: "Tuesday", hi: "मंगलवार" }, { en: "Wednesday", hi: "बुधवार" },
  { en: "Thursday", hi: "गुरुवार" }, { en: "Friday", hi: "शुक्रवार" },
  { en: "Saturday", hi: "शनिवार" },
];

const TITHIS = [
  { en: "Pratipada", hi: "प्रतिपदा" }, { en: "Dwitiya", hi: "द्वितीया" },
  { en: "Tritiya", hi: "तृतीया" }, { en: "Chaturthi", hi: "चतुर्थी" },
  { en: "Panchami", hi: "पञ्चमी" }, { en: "Shashthi", hi: "षष्ठी" },
  { en: "Saptami", hi: "सप्तमी" }, { en: "Ashtami", hi: "अष्टमी" },
  { en: "Navami", hi: "नवमी" }, { en: "Dashami", hi: "दशमी" },
  { en: "Ekadashi", hi: "एकादशी" }, { en: "Dwadashi", hi: "द्वादशी" },
  { en: "Trayodashi", hi: "त्रयोदशी" }, { en: "Chaturdashi", hi: "चतुर्दशी" },
  { en: "Purnima", hi: "पूर्णिमा" }, { en: "Amavasya", hi: "अमावस्या" },
];

const NAKSHATRAS = [
  { en: "Ashwini", hi: "अश्विनी" }, { en: "Bharani", hi: "भरणी" },
  { en: "Krittika", hi: "कृत्तिका" }, { en: "Rohini", hi: "रोहिणी" },
  { en: "Mrigashira", hi: "मृगशिरा" }, { en: "Ardra", hi: "आर्द्रा" },
  { en: "Punarvasu", hi: "पुनर्वसु" }, { en: "Pushya", hi: "पुष्य" },
  { en: "Ashlesha", hi: "आश्लेषा" }, { en: "Magha", hi: "मघा" },
  { en: "Purva Phalguni", hi: "पूर्व फाल्गुनी" }, { en: "Uttara Phalguni", hi: "उत्तर फाल्गुनी" },
  { en: "Hasta", hi: "हस्त" }, { en: "Chitra", hi: "चित्रा" },
  { en: "Swati", hi: "स्वाती" }, { en: "Vishakha", hi: "विशाखा" },
  { en: "Anuradha", hi: "अनुराधा" }, { en: "Jyeshtha", hi: "ज्येष्ठा" },
  { en: "Mula", hi: "मूल" }, { en: "Purva Ashadha", hi: "पूर्वाषाढ़ा" },
  { en: "Uttara Ashadha", hi: "उत्तराषाढ़ा" }, { en: "Shravana", hi: "श्रवण" },
  { en: "Dhanishta", hi: "धनिष्ठा" }, { en: "Shatabhisha", hi: "शतभिषा" },
  { en: "Purva Bhadrapada", hi: "पूर्व भाद्रपद" }, { en: "Uttara Bhadrapada", hi: "उत्तर भाद्रपद" },
  { en: "Revati", hi: "रेवती" },
];

const YOGAS = [
  { en: "Vishkambha", hi: "विष्कम्भ" }, { en: "Priti", hi: "प्रीति" },
  { en: "Ayushman", hi: "आयुष्मान्" }, { en: "Saubhagya", hi: "सौभाग्य" },
  { en: "Shobhana", hi: "शोभन" }, { en: "Atiganda", hi: "अतिगण्ड" },
  { en: "Sukarma", hi: "सुकर्मा" }, { en: "Dhriti", hi: "धृति" },
  { en: "Shula", hi: "शूल" }, { en: "Ganda", hi: "गण्ड" },
  { en: "Vriddhi", hi: "वृद्धि" }, { en: "Dhruva", hi: "ध्रुव" },
  { en: "Vyaghata", hi: "व्याघात" }, { en: "Harshana", hi: "हर्षण" },
  { en: "Vajra", hi: "वज्र" }, { en: "Siddhi", hi: "सिद्धि" },
  { en: "Vyatipata", hi: "व्यतीपात" }, { en: "Variyan", hi: "वरीयान्" },
  { en: "Parigha", hi: "परिघ" }, { en: "Shiva", hi: "शिव" },
  { en: "Siddha", hi: "सिद्ध" }, { en: "Sadhya", hi: "साध्य" },
  { en: "Shubha", hi: "शुभ" }, { en: "Shukla", hi: "शुक्ल" },
  { en: "Brahma", hi: "ब्रह्म" }, { en: "Indra", hi: "इन्द्र" },
  { en: "Vaidhriti", hi: "वैधृति" },
];

const KARANAS_MOVABLE = [
  { en: "Bava", hi: "बव" }, { en: "Balava", hi: "बालव" },
  { en: "Kaulava", hi: "कौलव" }, { en: "Taitila", hi: "तैतिल" },
  { en: "Garaja", hi: "गरज" }, { en: "Vanija", hi: "वणिज" },
  { en: "Vishti (Bhadra)", hi: "विष्टि (भद्रा)" },
];

export const RASHIS = [
  { id: "aries", en: "Aries (Mesh)", hi: "मेष", symbol: "♈", lordEn: "Mars", lordHi: "मंगल" },
  { id: "taurus", en: "Taurus (Vrishabha)", hi: "वृषभ", symbol: "♉", lordEn: "Venus", lordHi: "शुक्र" },
  { id: "gemini", en: "Gemini (Mithuna)", hi: "मिथुन", symbol: "♊", lordEn: "Mercury", lordHi: "बुध" },
  { id: "cancer", en: "Cancer (Karka)", hi: "कर्क", symbol: "♋", lordEn: "Moon", lordHi: "चन्द्र" },
  { id: "leo", en: "Leo (Simha)", hi: "सिंह", symbol: "♌", lordEn: "Sun", lordHi: "सूर्य" },
  { id: "virgo", en: "Virgo (Kanya)", hi: "कन्या", symbol: "♍", lordEn: "Mercury", lordHi: "बुध" },
  { id: "libra", en: "Libra (Tula)", hi: "तुला", symbol: "♎", lordEn: "Venus", lordHi: "शुक्र" },
  { id: "scorpio", en: "Scorpio (Vrishchika)", hi: "वृश्चिक", symbol: "♏", lordEn: "Mars", lordHi: "मंगल" },
  { id: "sagittarius", en: "Sagittarius (Dhanu)", hi: "धनु", symbol: "♐", lordEn: "Jupiter", lordHi: "गुरु" },
  { id: "capricorn", en: "Capricorn (Makara)", hi: "मकर", symbol: "♑", lordEn: "Saturn", lordHi: "शनि" },
  { id: "aquarius", en: "Aquarius (Kumbha)", hi: "कुम्भ", symbol: "♒", lordEn: "Saturn", lordHi: "शनि" },
  { id: "pisces", en: "Pisces (Meena)", hi: "मीन", symbol: "♓", lordEn: "Jupiter", lordHi: "गुरु" },
];

function getKaranaName(idx60: number) {
  if (idx60 === 0) return { en: "Kimstughna", hi: "किंस्तुघ्न" };
  if (idx60 === 57) return { en: "Shakuni", hi: "शकुनि" };
  if (idx60 === 58) return { en: "Chatushpada", hi: "चतुष्पद" };
  if (idx60 === 59) return { en: "Naga", hi: "नाग" };
  return KARANAS_MOVABLE[(idx60 - 1) % 7];
}

function getIndexAt(ms: number, kind: "tithi" | "nakshatra" | "yoga" | "karana"): number {
  const { sunSid, moonSid } = getSiderealSunMoon(new Date(ms));
  if (kind === "tithi") return Math.floor(norm360(moonSid - sunSid) / 12);
  if (kind === "nakshatra") return Math.floor(moonSid / (360 / 27));
  if (kind === "yoga") return Math.floor(norm360(sunSid + moonSid) / (360 / 27));
  return Math.floor(norm360(moonSid - sunSid) / 6);
}

function findEndTime(startMs: number, currentIdx: number, kind: "tithi" | "nakshatra" | "yoga" | "karana"): number {
  const stepMs = 60 * 60 * 1000;
  let lo = startMs;
  let hi = startMs + stepMs;
  for (let i = 0; i < 36; i++) {
    if (getIndexAt(hi, kind) !== currentIdx) break;
    lo = hi;
    hi += stepMs;
  }
  for (let i = 0; i < 10; i++) {
    const mid = Math.floor((lo + hi) / 2);
    if (getIndexAt(mid, kind) === currentIdx) lo = mid;
    else hi = mid;
  }
  return hi;
}

// Compute exact Drik Siddhanta Purnimanta & Amanta Masa + Vikram & Shaka Samvat
function computeSamvatAndMasa(sunriseMs: number, year: number, month: number, tithiIdx30: number) {
  const isShukla = tithiIdx30 < 15;
  // Find previous & next New Moon (Moon phase 0 deg) using Astronomy.SearchMoonPhase
  const approxStart = new Date(sunriseMs - 30 * 86400000);
  let prevNm = Astronomy.SearchMoonPhase(0, approxStart, 35);
  let nextNm = prevNm ? Astronomy.SearchMoonPhase(0, new Date(prevNm.date.getTime() + 1000000), 35) : null;

  // Ensure prevNm <= sunriseMs < nextNm
  if (nextNm && nextNm.date.getTime() <= sunriseMs) {
    prevNm = nextNm;
    nextNm = Astronomy.SearchMoonPhase(0, new Date(prevNm.date.getTime() + 1000000), 35);
  }

  const prevSunRashi = prevNm ? Math.floor(getSiderealSunMoon(prevNm.date).sunSid / 30) : Math.floor(getSiderealSunMoon(new Date(sunriseMs)).sunSid / 30);
  const nextSunRashi = nextNm ? Math.floor(getSiderealSunMoon(nextNm.date).sunSid / 30) : prevSunRashi;

  const isAdhika = prevSunRashi === nextSunRashi;
  const amantaIdx = isAdhika ? (nextSunRashi + 1) % 12 : nextSunRashi;
  // In North Indian Purnimanta system, Krishna Paksha belongs to the next lunar month name
  const purnimantaIdx = isAdhika || isShukla ? amantaIdx : (amantaIdx + 1) % 12;

  const amantaBase = MASAS[amantaIdx];
  const purnimantaBase = MASAS[purnimantaIdx];

  // Chaitradi Vikram Samvat & Shaka Samvat rollover occurs at Chaitra Shukla Pratipada (Mar–Apr)
  const beforeHinduNewYear = month <= 4 && (amantaIdx >= 9 || (amantaIdx === 0 && !isShukla));
  const vikramSamvat = beforeHinduNewYear ? year + 56 : year + 57;
  const shakaSamvat = beforeHinduNewYear ? year - 79 : year - 78;

  return {
    vikramSamvat,
    shakaSamvat,
    isAdhika,
    purnimantaEn: isAdhika ? `Adhika ${purnimantaBase.en}` : purnimantaBase.en,
    purnimantaHi: isAdhika ? `अधिक ${purnimantaBase.hi}` : purnimantaBase.hi,
    amantaEn: isAdhika ? `Adhika ${amantaBase.en}` : amantaBase.en,
    amantaHi: isAdhika ? `अधिक ${amantaBase.hi}` : amantaBase.hi,
  };
}

export function formatLocalTime(ms: number | null, utcOffsetMin: number, baseDayMs: number): string {
  if (!ms) return "--:--";
  const local = new Date(ms + utcOffsetMin * 60000);
  const hours24 = local.getUTCHours();
  const mins = local.getUTCMinutes();
  const ampm = hours24 >= 12 ? "PM" : "AM";
  const h12 = hours24 % 12 || 12;
  const hh = String(h12).padStart(2, "0");
  const mm = String(mins).padStart(2, "0");
  const nextDay = ms + utcOffsetMin * 60000 >= baseDayMs + 86400000;
  return `${hh}:${mm} ${ampm}${nextDay ? " (+1d)" : ""}`;
}

export interface ChoghadiyaSlot {
  nameEn: string;
  nameHi: string;
  quality: "best" | "good" | "neutral" | "avoid";
  start: string;
  end: string;
}

export interface DailyVratEvent {
  titleEn: string;
  titleHi: string;
  type: "vrat" | "festival" | "yoga";
}

export interface RashiTransitPrediction {
  rashiIndex: number;
  rashi: (typeof RASHIS)[number];
  transitHouse: number;
  score: number;
  isChandrashtama: boolean;
  summaryEn: string;
  summaryHi: string;
  careerEn: string;
  careerHi: string;
  loveEn: string;
  loveHi: string;
  healthEn: string;
  healthHi: string;
  remedyEn: string;
  remedyHi: string;
  luckyColorEn: string;
  luckyColorHi: string;
  luckyNumber: number;
}

export interface DailyPanchangReport {
  dateStr: string;
  city: PanchangCity;
  samvat: {
    vikramSamvat: number;
    shakaSamvat: number;
    isAdhika: boolean;
    purnimantaEn: string;
    purnimantaHi: string;
    amantaEn: string;
    amantaHi: string;
  };
  vara: { en: string; hi: string };
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  paksha: { en: string; hi: string };
  tithi: { en: string; hi: string; endTime: string; index: number };
  nakshatra: { en: string; hi: string; pada: number; endTime: string; index: number };
  yoga: { en: string; hi: string; endTime: string };
  karana: { en: string; hi: string; endTime: string };
  sunRashi: (typeof RASHIS)[number];
  moonRashi: (typeof RASHIS)[number];
  ayanamshaDeg: string;
  auspicious: {
    brahmaMuhurat: string;
    abhijitMuhurat: string;
    abhijitAvoided: boolean;
    vijayMuhurat: string;
    godhuliMuhurat: string;
  };
  inauspicious: {
    rahuKaal: string;
    yamaganda: string;
    gulika: string;
  };
  dayChoghadiya: ChoghadiyaSlot[];
  nightChoghadiya: ChoghadiyaSlot[];
  events: DailyVratEvent[];
  horoscopes: RashiTransitPrediction[];
}

const CHOGHADIYA_META: Record<string, { hi: string; quality: ChoghadiyaSlot["quality"] }> = {
  Amrit: { hi: "अमृत (सर्वोत्तम)", quality: "best" },
  Shubh: { hi: "शुभ (उत्तम)", quality: "good" },
  Labh: { hi: "लाभ (उत्तम)", quality: "good" },
  Char: { hi: "चर (सामान्य)", quality: "neutral" },
  Udveg: { hi: "उद्वेग (अशुभ)", quality: "avoid" },
  Rog: { hi: "रोग (अशुभ)", quality: "avoid" },
  Kaal: { hi: "काल (अशुभ)", quality: "avoid" },
};

const DAY_CHOGHADIYA_ORDER = [
  ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg"],
  ["Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit"],
  ["Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog"],
  ["Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh"],
  ["Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubh"],
  ["Char", "Labh", "Amrit", "Kaal", "Shubh", "Rog", "Udveg", "Char"],
  ["Kaal", "Shubh", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal"],
];

const NIGHT_CHOGHADIYA_ORDER = [
  ["Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh"],
  ["Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char"],
  ["Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal"],
  ["Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg"],
  ["Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit"],
  ["Rog", "Kaal", "Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog"],
  ["Labh", "Udveg", "Shubh", "Amrit", "Char", "Rog", "Kaal", "Labh"],
];

const RAHU_SLOT = [7, 1, 6, 4, 5, 3, 2];
const YAMA_SLOT = [4, 3, 2, 1, 0, 6, 5];
const GULIKA_SLOT = [6, 5, 4, 3, 2, 1, 0];

const GOCHARA_TEMPLATES: Record<number, {
  score: number;
  summaryEn: string; summaryHi: string;
  careerEn: string; careerHi: string;
  loveEn: string; loveHi: string;
  healthEn: string; healthHi: string;
  remedyEn: string; remedyHi: string;
  colorEn: string; colorHi: string;
}> = {
  1: { score: 5, summaryEn: "Moon transits your own sign today—high clarity, grace, and personal magnetism.", summaryHi: "आज चन्द्रमा आपकी ही राशि में गोचर कर रहे हैं—मानसिक स्पष्टता, आत्मविश्वास और सौभाग्य में वृद्धि होगी।", careerEn: "Ideal day to lead meetings, launch initiatives, and finalize agreements.", careerHi: "नए कार्य प्रारंभ करने, नेतृत्व और महत्वपूर्ण निर्णयों के लिए अत्यंत शुभ दिन है।", loveEn: "Warmth and emotional harmony strengthen family and partner bonds.", loveHi: "परिवार और जीवनसाथी के साथ मधुरता और स्नेह बढ़ेगा।", healthEn: "Vitality is strong; stay hydrated and maintain balanced rest.", healthHi: "स्वास्थ्य उत्तम रहेगा; पर्याप्त जल और संतुलित दिनचर्या बनाए रखें।", remedyEn: "Offer water to the rising Sun and chant Om Somaya Namah.", remedyHi: "प्रातः सूर्य को अर्घ्य दें और 'ॐ सोमाय नमः' का जाप करें।", colorEn: "Pearl White", colorHi: "मोती श्वेत" },
  2: { score: 4, summaryEn: "Moon in your 2nd house highlights finances, speech, and family comfort.", summaryHi: "द्वितीय भाव का चन्द्रमा धन, वाणी और पारिवारिक सुख पर केंद्रित रहेगा।", careerEn: "Good for financial reviews, negotiations, and steady savings.", careerHi: "वित्तीय समीक्षा, बचत और व्यापारिक संवाद के लिए अनुकूल समय है।", loveEn: "Choose gentle words during family discussions to keep peace.", loveHi: "पारिवारिक बातचीत में मधुर वाणी का प्रयोग करें।", healthEn: "Avoid overly spicy or late-night meals for digestive comfort.", healthHi: "पाचन हेतु रात्रि में हल्का व सात्विक भोजन करें।", remedyEn: "Donate white sweets or milk to the needy.", remedyHi: "दूध या सफेद मिठाई का दान करें।", colorEn: "Cream Gold", colorHi: "क्रीम स्वर्ण" },
  3: { score: 5, summaryEn: "Moon in the 3rd house brings courage, auspicious news, and swift progress.", summaryHi: "तृतीय भाव का चन्द्रमा पराक्रम, शुभ समाचार और कार्यों में तीव्र सफलता देगा।", careerEn: "Short trips, sales, writing, and networking bring tangible wins.", careerHi: "छोटी यात्राएं, संपर्क और रचनात्मक प्रयासों से प्रत्यक्ष लाभ होगा।", loveEn: "Support from siblings and close friends lifts your spirits.", loveHi: "भाई-बहनों और मित्रों का पूर्ण सहयोग प्राप्त होगा।", healthEn: "High physical energy—great day for brisk walking or yoga.", healthHi: "ऊर्जा स्तर उच्च रहेगा; योग और प्राणायाम से विशेष लाभ मिलेगा।", remedyEn: "Recite Hanuman Chalisa or offer sindoor to Hanuman Ji.", remedyHi: "हनुमान चालीसा का पाठ करें।", colorEn: "Saffron", colorHi: "केसरिया" },
  4: { score: 3, summaryEn: "Moon in the 4th house calls for emotional calm, domestic care, and patience.", summaryHi: "चतुर्थ भाव का चन्द्रमा मन को संवेदनशील बना सकता है—धैर्य और गृह-शांति पर ध्यान दें।", careerEn: "Avoid rushing property or vehicle commitments without double-checking.", careerHi: "भूमि, भवन या वाहन से जुड़े निर्णय सोच-समझकर लें।", loveEn: "Spend quiet quality time with mother or elders at home.", loveHi: "माता और वरिष्ठजनों के साथ समय बिताएं और आशीर्वाद लें।", healthEn: "Prioritize restful sleep and avoid emotional overexertion.", healthHi: "पर्याप्त नींद लें और अनावश्यक तनाव से बचें।", remedyEn: "Offer raw milk mixed with water to Shivling.", remedyHi: "शिवलिंग पर कच्चा दूध मिश्रित जल अर्पित करें।", colorEn: "Silver Blue", colorHi: "रजत नीला" },
  5: { score: 4, summaryEn: "Moon in the 5th house awakens intellect, devotion, and creative insight.", summaryHi: "पञ्चम भाव का चन्द्रमा बुद्धि, भक्ति, शिक्षा और रचनात्मकता को जागृत करेगा।", careerEn: "Students, analysts, and planners gain sharp problem-solving focus.", careerHi: "विद्यार्थियों, सलाहकारों और योजनाकारों को विशेष सफलता मिलेगी।", loveEn: "Joyful moments with children and romantic understanding deepen.", loveHi: "संतान से सुखद समाचार और प्रेम संबंधों में प्रगाढ़ता आएगी।", healthEn: "Keep meals light; meditation clears mental clutter quickly.", healthHi: "ध्यान और प्राणायाम से मानसिक शांति प्राप्त होगी।", remedyEn: "Chant Om Namo Bhagavate Vasudevaya 11 times.", remedyHi: "'ॐ नमो भगवते वासुदेवाय' का 11 बार जाप करें।", colorEn: "Saffron Yellow", colorHi: "पीताम्बर पीला" },
  6: { score: 5, summaryEn: "Moon in the 6th house grants victory over obstacles, debts, and rivals.", summaryHi: "षष्ठ भाव का चन्द्रमा शत्रुओं, बाधाओं और लंबित कार्यों पर विजय दिलाएगा।", careerEn: "Clear backlogs, pass interviews, and resolve workplace bottlenecks.", careerHi: "लंबित कार्य पूर्ण होंगे तथा प्रतिस्पर्धा में श्रेष्ठ परिणाम मिलेंगे।", loveEn: "Practical acts of service speak louder than promises today.", loveHi: "सहयोग और सेवा भाव से रिश्तों में विश्वास बढ़ेगा।", healthEn: "Strong recovery energy; ideal day to start a disciplined routine.", healthHi: "रोग प्रतिरोधक क्षमता मजबूत रहेगी; नियमित व्यायाम लाभकारी होगा।", remedyEn: "Feed green fodder or soaked moong to birds.", remedyHi: "पक्षियों को भीगी हरी मूंग या दाना डालें।", colorEn: "Emerald Green", colorHi: "पन्ना हरा" },
  7: { score: 5, summaryEn: "Moon in the 7th house blesses partnerships, public goodwill, and travel.", summaryHi: "सप्तम भाव का चन्द्रमा दांपत्य सुख, साझेदारी और जन-सम्मान प्रदान करेगा।", careerEn: "Excellent for client meetings, partnerships, and commercial deals.", careerHi: "व्यापारिक साझेदारी, ग्राहक संवाद और अनुबंधों के लिए शुभ दिन है।", loveEn: "Harmonious, affectionate time with spouse or partner.", loveHi: "जीवनसाथी के साथ अत्यंत मधुर और सुखद समय व्यतीत होगा।", healthEn: "Balanced vitality; enjoy fresh air in the evening.", healthHi: "स्वास्थ्य संतुलित रहेगा; संध्याकालीन भ्रमण लाभदायक रहेगा।", remedyEn: "Light a pure ghee lamp at home during Godhuli Muhurat.", remedyHi: "गोधूलि वेला में घर के मंदिर में शुद्ध घी का दीपक जलाएं।", colorEn: "Rose Pink", colorHi: "गुलाबी" },
  8: { score: 2, summaryEn: "Chandrashtama Alert: Moon transits your 8th house—keep today low-key and mindful.", summaryHi: "चन्द्राष्टम सावधानी: आज चन्द्रमा आपके अष्टम भाव में हैं—बड़े जोखिम और विवाद से बचें।", careerEn: "Postpone major investments or heated discussions; focus on routine review.", careerHi: "बड़े निवेश या महत्वपूर्ण अनुबंध आज टालें; नियमित कार्यों पर ध्यान दें।", loveEn: "Avoid reacting impulsively; listen patiently to loved ones.", loveHi: "क्रोध और जल्दबाजी से बचें; अपनों की बात धैर्य से सुनें।", healthEn: "Drive carefully, rest well, and avoid heavy physical strain.", healthHi: "वाहन सावधानी से चलाएं और स्वास्थ्य के प्रति सजग रहें।", remedyEn: "Chant Maha Mrityunjaya Mantra 11 times and donate food.", remedyHi: "महामृत्युंजय मंत्र का 11 बार जाप करें और अन्न दान करें।", colorEn: "Light Sandalwood", colorHi: "हल्का चन्दन" },
  9: { score: 4, summaryEn: "Moon in the 9th house favors Dharma, elders' blessings, and long-term vision.", summaryHi: "नवम भाव का चन्द्रमा भाग्य, धर्म-कर्म और गुरुजनों के आशीर्वाद से मार्ग प्रशस्त करेगा।", careerEn: "Higher learning, advisory work, and long-distance plans move smoothly.", careerHi: "उच्च शिक्षा, परामर्श और दूरगामी योजनाओं में प्रगति होगी।", loveEn: "Shared spiritual values bring deep peace in relationships.", loveHi: "धार्मिक या पारिवारिक आयोजनों से आपसी स्नेह बढ़ेगा।", healthEn: "Peaceful mind supports strong overall wellbeing.", healthHi: "मानसिक प्रसन्नता से स्वास्थ्य उत्तम बना रहेगा।", remedyEn: "Visit a temple or offer yellow flowers to Lord Vishnu.", remedyHi: "मंदिर दर्शन करें और भगवान विष्णु को पीले पुष्प अर्पित करें।", colorEn: "Turmeric Gold", colorHi: "हल्दी स्वर्ण" },
  10: { score: 5, summaryEn: "Moon in the 10th house elevates career visibility, authority, and results.", summaryHi: "दशम भाव का चन्द्रमा कर्मक्षेत्र में प्रतिष्ठा, अधिकार और उल्लेखनीय सफलता देगा।", careerEn: "Prime day for promotions, government work, and high-visibility deliverables.", careerHi: "पदोन्नति, प्रशासनिक कार्य और महत्वपूर्ण लक्ष्यों की प्राप्ति के लिए श्रेष्ठ दिन है।", loveEn: "Balance work achievements with a warm check-in at home.", loveHi: "कार्य व्यस्तता के बीच परिवार के लिए समय अवश्य निकालें।", healthEn: "High stamina; avoid skipping lunch during busy hours.", healthHi: "ऊर्जा अच्छी रहेगी; समय पर भोजन करना न भूलें।", remedyEn: "Offer Tulsi leaves to Shri Hari and respect elders.", remedyHi: "श्री हरि को तुलसी दल अर्पित करें।", colorEn: "Royal Blue", colorHi: "राजसी नीला" },
  11: { score: 5, summaryEn: "Moon in the 11th house activates Labha Yoga—gains, allies, and fulfilled wishes.", summaryHi: "एकादश भाव का चन्द्रमा लाभ योग बना रहा है—आय, मित्र-सहयोग और मनोकामना पूर्ति का दिन है।", careerEn: "Strong inflows, completed deals, and helpful senior connections.", careerHi: "आर्थिक लाभ, रुके धन की प्राप्ति और वरिष्ठों का सहयोग मिलेगा।", loveEn: "Celebratory energy with friends, family, and well-wishers.", loveHi: "मित्रों और परिवार के साथ उत्सव जैसा आनंदमय समय रहेगा।", healthEn: "Uplifted mood and steady physical comfort.", healthHi: "मन प्रसन्न और शरीर स्वस्थ रहेगा।", remedyEn: "Share prasad or donate a small portion of gains.", remedyHi: "भगवान को भोग लगाकर प्रसाद वितरित करें।", colorEn: "Sky White", colorHi: "आसमानी श्वेत" },
  12: { score: 3, summaryEn: "Moon in the 12th house favors rest, spiritual reflection, and mindful spending.", summaryHi: "द्वादश भाव का चन्द्रमा व्यय बढ़ा सकता है—आध्यात्मिक चिंतन और संयमित बजट रखें।", careerEn: "Good for behind-the-scenes planning, foreign links, and quiet research.", careerHi: "गोपनीय योजना, शोध और विदेश संबंधी कार्यों के लिए उपयुक्त समय है।", loveEn: "Give yourself and loved ones gentle space to recharge.", loveHi: "रिश्तों में धैर्य रखें और व्यर्थ के तर्क से बचें।", healthEn: "Prioritize eye rest and early sleep tonight.", healthHi: "आँखों को विश्राम दें और समय पर शयन करें।", remedyEn: "Light a diya in the evening and recite Vishnu Sahasranama.", remedyHi: "संध्या समय दीपक जलाएं और भगवान का स्मरण करें।", colorEn: "Soft Lavender", colorHi: "हल्का बैंगनी" },
};

export function computeDailyPanchang(dateStr: string, cityOrId: string | PanchangCity): DailyPanchangReport {
  const city =
    typeof cityOrId === "string"
      ? PANCHANG_CITIES.find((c) => c.id === cityOrId) ?? PANCHANG_CITIES[0]
      : cityOrId;

  const [y, m, d] = dateStr.split("-").map(Number);
  const localMidnightUtcMs = Date.UTC(y, m - 1, d, 0, 0, 0) - city.utcOffsetMin * 60000;
  const baseDayLocalMs = Date.UTC(y, m - 1, d, 0, 0, 0);
  const observer = new Astronomy.Observer(city.lat, city.lon, city.elevation);

  const sunriseAstro = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, new Date(localMidnightUtcMs), 1);
  const sunriseMs = sunriseAstro ? sunriseAstro.date.getTime() : localMidnightUtcMs + 6 * 3600000;
  const sunsetAstro = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, new Date(sunriseMs), 1);
  const sunsetMs = sunsetAstro ? sunsetAstro.date.getTime() : sunriseMs + 12 * 3600000;
  const nextSunriseAstro = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, new Date(sunsetMs), 1);
  const nextSunriseMs = nextSunriseAstro ? nextSunriseAstro.date.getTime() : sunriseMs + 24 * 3600000;

  const moonriseAstro = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, +1, new Date(localMidnightUtcMs), 1);
  const moonsetAstro = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, new Date(localMidnightUtcMs), 1);

  const weekday = new Date(baseDayLocalMs).getUTCDay();
  const { ayanamsha, sunSid, moonSid } = getSiderealSunMoon(new Date(sunriseMs));
  const sunRashiIdx = Math.floor(sunSid / 30);
  const moonRashiIdx = Math.floor(moonSid / 30);

  const tithiIdx30 = Math.floor(norm360(moonSid - sunSid) / 12);
  const isShukla = tithiIdx30 < 15;
  const tithiName = tithiIdx30 === 14 ? TITHIS[14] : tithiIdx30 === 29 ? TITHIS[15] : TITHIS[tithiIdx30 % 15];
  const tithiEndMs = findEndTime(sunriseMs, tithiIdx30, "tithi");

  const samvat = computeSamvatAndMasa(sunriseMs, y, m, tithiIdx30);

  const nakIdx = Math.floor(moonSid / (360 / 27));
  const nakPada = Math.floor((moonSid % (360 / 27)) / (360 / 108)) + 1;
  const nakEndMs = findEndTime(sunriseMs, nakIdx, "nakshatra");

  const yogaIdx = Math.floor(norm360(sunSid + moonSid) / (360 / 27));
  const yogaEndMs = findEndTime(sunriseMs, yogaIdx, "yoga");

  const karanaIdx = Math.floor(norm360(moonSid - sunSid) / 6);
  const karanaName = getKaranaName(karanaIdx);
  const karanaEndMs = findEndTime(sunriseMs, karanaIdx, "karana");

  const dayLen = sunsetMs - sunriseMs;
  const nightLen = nextSunriseMs - sunsetMs;
  const muhurtaLen = dayLen / 15;
  const fmtRange = (a: number, b: number) =>
    `${formatLocalTime(a, city.utcOffsetMin, baseDayLocalMs)} – ${formatLocalTime(b, city.utcOffsetMin, baseDayLocalMs)}`;
  const slot8 = (slotIdx: number) => fmtRange(sunriseMs + (dayLen / 8) * slotIdx, sunriseMs + (dayLen / 8) * (slotIdx + 1));

  const dayChoghadiya: ChoghadiyaSlot[] = DAY_CHOGHADIYA_ORDER[weekday].map((nameEn, i) => ({
    nameEn,
    nameHi: CHOGHADIYA_META[nameEn].hi,
    quality: CHOGHADIYA_META[nameEn].quality,
    start: formatLocalTime(sunriseMs + (dayLen / 8) * i, city.utcOffsetMin, baseDayLocalMs),
    end: formatLocalTime(sunriseMs + (dayLen / 8) * (i + 1), city.utcOffsetMin, baseDayLocalMs),
  }));

  const nightChoghadiya: ChoghadiyaSlot[] = NIGHT_CHOGHADIYA_ORDER[weekday].map((nameEn, i) => ({
    nameEn,
    nameHi: CHOGHADIYA_META[nameEn].hi,
    quality: CHOGHADIYA_META[nameEn].quality,
    start: formatLocalTime(sunsetMs + (nightLen / 8) * i, city.utcOffsetMin, baseDayLocalMs),
    end: formatLocalTime(sunsetMs + (nightLen / 8) * (i + 1), city.utcOffsetMin, baseDayLocalMs),
  }));

  const events: DailyVratEvent[] = [];
  const tithiAtSunset = getIndexAt(sunsetMs, "tithi");
  const nextSunRashiIdx = Math.floor(getSiderealSunMoon(new Date(nextSunriseMs)).sunSid / 30);

  if (tithiIdx30 === 10 || tithiIdx30 === 25) {
    events.push({ titleEn: `${isShukla ? "Shukla" : "Krishna"} Ekadashi Vrat`, titleHi: `${isShukla ? "शुक्ल" : "कृष्ण"} एकादशी व्रत`, type: "vrat" });
  }
  if (tithiAtSunset === 12 || tithiAtSunset === 27) {
    events.push({ titleEn: "Pradosh Vrat (Shiv Puja at Sunset)", titleHi: "प्रदोष व्रत (संध्या शिव पूजन)", type: "vrat" });
  }
  if (tithiIdx30 === 3) events.push({ titleEn: "Vinayaka Chaturthi", titleHi: "विनायक चतुर्थी", type: "vrat" });
  if (tithiIdx30 === 18) events.push({ titleEn: "Sankashti Chaturthi", titleHi: "संकष्टी चतुर्थी", type: "vrat" });
  if (tithiIdx30 === 7) events.push({ titleEn: "Masik Durgashtami", titleHi: "मासिक दुर्गाष्टमी", type: "vrat" });
  if (tithiIdx30 === 28) events.push({ titleEn: "Masik Shivaratri", titleHi: "मासिक शिवरात्रि", type: "vrat" });
  if (tithiIdx30 === 14) events.push({ titleEn: "Purnima Vrat & Satyanarayan Puja", titleHi: "पूर्णिमा व्रत एवं श्री सत्यनारायण पूजन", type: "festival" });
  if (tithiIdx30 === 29) events.push({ titleEn: "Amavasya (Pitru Tarpan & Daan)", titleHi: "अमावस्या (पितृ तर्पण एवं दान)", type: "festival" });
  if (nextSunRashiIdx !== sunRashiIdx) {
    events.push({ titleEn: `${RASHIS[nextSunRashiIdx].en.split(" ")[0]} Sankranti`, titleHi: `${RASHIS[nextSunRashiIdx].hi} संक्रांति`, type: "festival" });
  }
  if (nakIdx === 7 && weekday === 0) events.push({ titleEn: "Ravi Pushya Auspicious Yoga", titleHi: "रवि पुष्य महायोग", type: "yoga" });
  if (nakIdx === 7 && weekday === 4) events.push({ titleEn: "Guru Pushya Auspicious Yoga", titleHi: "गुरु पुष्य महायोग", type: "yoga" });

  const horoscopes: RashiTransitPrediction[] = RASHIS.map((rashi, idx) => {
    const transitHouse = ((moonRashiIdx - idx + 12) % 12) + 1;
    const tpl = GOCHARA_TEMPLATES[transitHouse];
    return {
      rashiIndex: idx,
      rashi,
      transitHouse,
      score: tpl.score,
      isChandrashtama: transitHouse === 8,
      summaryEn: tpl.summaryEn,
      summaryHi: tpl.summaryHi,
      careerEn: tpl.careerEn,
      careerHi: tpl.careerHi,
      loveEn: tpl.loveEn,
      loveHi: tpl.loveHi,
      healthEn: tpl.healthEn,
      healthHi: tpl.healthHi,
      remedyEn: tpl.remedyEn,
      remedyHi: tpl.remedyHi,
      luckyColorEn: tpl.colorEn,
      luckyColorHi: tpl.colorHi,
      luckyNumber: ((idx + transitHouse + d) % 9) + 1,
    };
  });

  return {
    dateStr,
    city,
    samvat,
    vara: VARA[weekday],
    sunrise: formatLocalTime(sunriseMs, city.utcOffsetMin, baseDayLocalMs),
    sunset: formatLocalTime(sunsetMs, city.utcOffsetMin, baseDayLocalMs),
    moonrise: formatLocalTime(moonriseAstro ? moonriseAstro.date.getTime() : null, city.utcOffsetMin, baseDayLocalMs),
    moonset: formatLocalTime(moonsetAstro ? moonsetAstro.date.getTime() : null, city.utcOffsetMin, baseDayLocalMs),
    paksha: isShukla ? { en: "Shukla Paksha", hi: "शुक्ल पक्ष" } : { en: "Krishna Paksha", hi: "कृष्ण पक्ष" },
    tithi: { ...tithiName, endTime: formatLocalTime(tithiEndMs, city.utcOffsetMin, baseDayLocalMs), index: tithiIdx30 },
    nakshatra: { ...NAKSHATRAS[nakIdx], pada: nakPada, endTime: formatLocalTime(nakEndMs, city.utcOffsetMin, baseDayLocalMs), index: nakIdx },
    yoga: { ...YOGAS[yogaIdx], endTime: formatLocalTime(yogaEndMs, city.utcOffsetMin, baseDayLocalMs) },
    karana: { ...karanaName, endTime: formatLocalTime(karanaEndMs, city.utcOffsetMin, baseDayLocalMs) },
    sunRashi: RASHIS[sunRashiIdx],
    moonRashi: RASHIS[moonRashiIdx],
    ayanamshaDeg: ayanamsha.toFixed(4) + "°",
    auspicious: {
      brahmaMuhurat: fmtRange(sunriseMs - 96 * 60000, sunriseMs - 48 * 60000),
      abhijitMuhurat: fmtRange(sunriseMs + muhurtaLen * 7, sunriseMs + muhurtaLen * 8),
      abhijitAvoided: weekday === 3,
      vijayMuhurat: fmtRange(sunriseMs + muhurtaLen * 10, sunriseMs + muhurtaLen * 11),
      godhuliMuhurat: fmtRange(sunsetMs - 12 * 60000, sunsetMs + 12 * 60000),
    },
    inauspicious: {
      rahuKaal: slot8(RAHU_SLOT[weekday]),
      yamaganda: slot8(YAMA_SLOT[weekday]),
      gulika: slot8(GULIKA_SLOT[weekday]),
    },
    dayChoghadiya,
    nightChoghadiya,
    events,
    horoscopes,
  };
}
// END OF FILE
