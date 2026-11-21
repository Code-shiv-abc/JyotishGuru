"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar, MapPin, Sunrise, Sunset, Moon, Sparkles, Clock,
  ShieldAlert, Star, X, MessageCircle, Compass, Sun, LocateFixed, Search, Loader2
} from "lucide-react";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";
import {
  computeDailyPanchang,
  PANCHANG_CITIES,
  type PanchangCity,
  type RashiTransitPrediction,
} from "@/lib/panchangEngine";
import LiveStatusAndDishaBar from "@/components/astrology/LiveStatusAndDishaBar";
import UpcomingEventsAndHora from "@/components/astrology/UpcomingEventsAndHora";

function getTodayDateString(): string {
  const now = new Date();
  const ist = new Date(now.getTime() + 330 * 60000);
  return ist.toISOString().slice(0, 10);
}

export default function HoroscopePage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const [dateStr, setDateStr] = useState<string>(getTodayDateString);
  const [selectedCity, setSelectedCity] = useState<PanchangCity>(PANCHANG_CITIES[0]);
  const [cityQuery, setCityQuery] = useState<string>("");
  const [showCityMenu, setShowCityMenu] = useState<boolean>(false);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [remoteResults, setRemoteResults] = useState<PanchangCity[]>([]);
  const [locationMsg, setLocationMsg] = useState<string>("");
  const [choghadiyaTab, setChoghadiyaTab] = useState<"day" | "night">("day");
  const [selectedRashi, setSelectedRashi] = useState<RashiTransitPrediction | null>(null);

  const report = useMemo(() => computeDailyPanchang(dateStr, selectedCity), [dateStr, selectedCity]);

  const filteredPresetCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) return PANCHANG_CITIES.slice(0, 12);
    return PANCHANG_CITIES.filter(
      (c) => c.nameEn.toLowerCase().includes(q) || c.nameHi.includes(q)
    ).slice(0, 12);
  }, [cityQuery]);

  const handleUseGPS = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocationMsg(isHi ? "आपके ब्राउज़र में GPS उपलब्ध नहीं है।" : "GPS is not supported in this browser.");
      return;
    }
    setGeoLoading(true);
    setLocationMsg("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lon = Number(pos.coords.longitude.toFixed(4));
        const offsetMin = -new Date().getTimezoneOffset();
        const tzLabel = offsetMin === 330 ? "IST" : `UTC${offsetMin >= 0 ? "+" : ""}${(offsetMin / 60).toFixed(1)}`;
        setSelectedCity({
          id: `gps-${lat}-${lon}`,
          nameEn: `My GPS Location (${lat}°, ${lon}°)`,
          nameHi: `मेरा GPS स्थान (${lat}°, ${lon}°)`,
          lat,
          lon,
          elevation: 100,
          utcOffsetMin: offsetMin,
          tzLabel,
        });
        setShowCityMenu(false);
        setGeoLoading(false);
      },
      () => {
        setLocationMsg(isHi ? "कृपया ब्राउज़र में लोकेशन अनुमति (Allow) दें।" : "Please allow location access in your browser.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
  };

  const handleSearchAnyCity = async () => {
    const q = cityQuery.trim();
    if (q.length < 2) return;
    setSearchLoading(true);
    setLocationMsg("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=6&q=${encodeURIComponent(q)}`
      );
      const data: Array<{ display_name: string; lat: string; lon: string }> = await res.json();
      const mapped: PanchangCity[] = data.map((item, idx) => {
        const lat = Number(parseFloat(item.lat).toFixed(4));
        const lon = Number(parseFloat(item.lon).toFixed(4));
        const isIndia = item.display_name.toLowerCase().includes("india") || (lat >= 6 && lat <= 37 && lon >= 68 && lon <= 98);
        const offsetMin = isIndia ? 330 : Math.round(lon / 15) * 60;
        const shortName = item.display_name.split(",").slice(0, 2).join(", ");
        return {
          id: `custom-${idx}-${lat}-${lon}`,
          nameEn: shortName,
          nameHi: shortName,
          lat,
          lon,
          elevation: 100,
          utcOffsetMin: offsetMin,
          tzLabel: isIndia ? "IST" : `UTC${offsetMin >= 0 ? "+" : ""}${offsetMin / 60}`,
        };
      });
      setRemoteResults(mapped);
      if (mapped.length === 0) {
        setLocationMsg(isHi ? "कोई शहर नहीं मिला। कृपया वर्तनी जांचें।" : "No city found. Try another spelling.");
      }
    } catch {
      setLocationMsg(isHi ? "ऑनलाइन शहर खोज उपलब्ध नहीं है; सूची से चुनें।" : "Live search unavailable; choose from the 55+ built-in cities.");
    } finally {
      setSearchLoading(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isHi
      ? `आज का पंचांग (${report.samvat.purnimantaHi}, विक्रम संवत् ${report.samvat.vikramSamvat}) - आचार्य श्री रविन्द्र शुक्ल शास्त्री`
      : `Daily Drik Panchang (${report.samvat.purnimantaEn}, Vikram Samvat ${report.samvat.vikramSamvat}) - Acharya Shri Ravindra Shukla Shatri`,
    description: `Exact sunrise/sunset, Samvat & Masa, Tithi Samapti Kaal, Choghadiya, Hora, Rahu Kaal, Disha Shool, Vrats, and live Chandra Gochara horoscope for ${report.city.nameEn}.`,
    provider: {
      "@type": "LocalBusiness",
      name: "JyotishGuru — Acharya Shri Ravindra Shukla Shatri",
      telephone: "+91-80091-24454",
      address: { "@type": "PostalAddress", addressLocality: "Ayodhya Dham", addressRegion: "UP", addressCountry: "IN" },
    },
  };

  const qualityBadge = (q: string) => {
    if (q === "best") return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    if (q === "good") return "bg-green-500/15 text-green-300 border-green-500/30";
    if (q === "neutral") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
    return "bg-rose-500/15 text-rose-300 border-rose-500/30";
  };

  return (
    <main className="min-h-screen bg-[#0D0B1A] text-amber-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header, Samvat/Masa Strip & GPS/City Controls */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1A1040] via-[#140E30] to-[#0D0B1A] border border-amber-500/25 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isHi
                    ? `विक्रम संवत् ${report.samvat.vikramSamvat} • शक संवत् ${report.samvat.shakaSamvat}`
                    : `Vikram Samvat ${report.samvat.vikramSamvat} • Shaka Samvat ${report.samvat.shakaSamvat}`}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                  {isHi
                    ? `मास: ${report.samvat.purnimantaHi} (पूर्णिमांत) / ${report.samvat.amantaHi} (अमांत)`
                    : `Masa: ${report.samvat.purnimantaEn} (Purnimanta) / ${report.samvat.amantaEn} (Amanta)`}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-amber-100 tracking-tight">
                {isHi ? "दैनिक पंचांग, शुभ मुहूर्त एवं राशिफल" : "Daily Panchang, Auspicious Muhurat & Horoscope"}
              </h1>
              <p className="text-amber-200/75 mt-2 text-sm sm:text-base">
                {isHi
                  ? `आचार्य श्री रविन्द्र शुक्ल शास्त्री (अयोध्या धाम) • स्थान: ${report.city.nameHi}`
                  : `By Acharya Shri Ravindra Shukla Shatri (Ayodhya Dham) • Location: ${report.city.nameEn}`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Date Picker */}
              <div className="flex items-center gap-2 bg-black/40 border border-amber-500/30 rounded-xl px-3 py-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <input
                  type="date"
                  value={dateStr}
                  onChange={(e) => e.target.value && setDateStr(e.target.value)}
                  className="bg-transparent text-sm text-amber-50 focus:outline-none"
                  aria-label="Select Panchang Date"
                />
              </div>

              {/* Searchable Indian & Custom City Picker */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCityMenu((s) => !s)}
                  className="flex items-center gap-2 bg-black/40 border border-amber-500/30 hover:border-amber-400 rounded-xl px-3 py-2 text-sm text-amber-50 max-w-[230px]"
                >
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">{isHi ? selectedCity.nameHi : selectedCity.nameEn}</span>
                </button>

                {showCityMenu && (
                  <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-2xl bg-[#16112E] border border-amber-500/35 shadow-2xl p-3 z-40 space-y-2.5">
                    <div className="flex items-center gap-1.5 bg-black/40 border border-amber-500/30 rounded-xl px-2.5 py-1.5">
                      <Search className="w-4 h-4 text-amber-400 shrink-0" />
                      <input
                        type="text"
                        value={cityQuery}
                        onChange={(e) => { setCityQuery(e.target.value); setRemoteResults([]); }}
                        onKeyDown={(e) => e.key === "Enter" && handleSearchAnyCity()}
                        placeholder={isHi ? "कोई भी भारतीय शहर खोजें..." : "Search any Indian or global city..."}
                        className="w-full bg-transparent text-xs text-amber-50 placeholder:text-amber-200/45 focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSearchAnyCity}
                      disabled={searchLoading || cityQuery.trim().length < 2}
                      className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 disabled:opacity-40 flex items-center justify-center gap-1.5"
                    >
                      {searchLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                      {isHi ? "अन्य शहर / गाँव ऑनलाइन खोजें" : "Search Any Town / City Online"}
                    </button>

                    <div className="max-h-56 overflow-y-auto divide-y divide-white/5 text-xs">
                      {(remoteResults.length > 0 ? remoteResults : filteredPresetCities).map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSelectedCity(c);
                            setShowCityMenu(false);
                            setCityQuery("");
                            setRemoteResults([]);
                          }}
                          className="w-full text-left px-2.5 py-2 hover:bg-amber-500/15 rounded-lg flex items-center justify-between gap-2 text-amber-100"
                        >
                          <span className="truncate">{isHi ? c.nameHi : c.nameEn}</span>
                          <span className="text-[10px] text-amber-300/70 shrink-0">{c.tzLabel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 1-Click GPS Button */}
              <button
                type="button"
                onClick={handleUseGPS}
                disabled={geoLoading}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 transition"
                title="Use My Current GPS Location"
              >
                {geoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LocateFixed className="w-4 h-4" />}
                {isHi ? "मेरा GPS" : "Use GPS"}
              </button>

              <button
                type="button"
                onClick={() => setDateStr(getTodayDateString())}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-black hover:bg-amber-400 transition"
              >
                {isHi ? "आज" : "Today"}
              </button>
            </div>
          </div>

          {locationMsg && <p className="mt-3 text-xs text-rose-300">{locationMsg}</p>}

          {/* Automated Vrats, Festivals & Special Yogas */}
          {report.events.length > 0 && (
            <div className="mt-6 pt-5 border-t border-amber-500/20 flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                {isHi ? "आज के प्रमुख व्रत / पर्व / योग:" : "Today's Important Vrats & Yogas:"}
              </span>
              {report.events.map((ev, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-200 border border-amber-400/40"
                >
                  ✦ {isHi ? ev.titleHi : ev.titleEn}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Live Active Muhurat/Rahu Kaal Pill, Disha Shool, Panchak & WhatsApp Share */}
        <LiveStatusAndDishaBar report={report} isHi={isHi} />

        {/* Sun/Moon Timings + 5 Panchang Angas with Exact End Times */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[#15112A] border border-amber-500/20 p-5 space-y-4">
            <h2 className="text-lg font-bold text-amber-200 flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              {isHi ? "सूर्योदय एवं चन्द्रोदय" : "Sun & Moon Timings"} ({report.city.tzLabel})
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <div className="text-xs text-amber-300/70 flex items-center gap-1"><Sunrise className="w-3.5 h-3.5" /> {isHi ? "सूर्योदय" : "Sunrise"}</div>
                <div className="font-bold text-amber-50 mt-1">{report.sunrise}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <div className="text-xs text-amber-300/70 flex items-center gap-1"><Sunset className="w-3.5 h-3.5" /> {isHi ? "सूर्यास्त" : "Sunset"}</div>
                <div className="font-bold text-amber-50 mt-1">{report.sunset}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <div className="text-xs text-amber-300/70 flex items-center gap-1"><Moon className="w-3.5 h-3.5" /> {isHi ? "चन्द्रोदय" : "Moonrise"}</div>
                <div className="font-bold text-amber-50 mt-1">{report.moonrise}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                <div className="text-xs text-amber-300/70 flex items-center gap-1"><Moon className="w-3.5 h-3.5" /> {isHi ? "चन्द्रास्त" : "Moonset"}</div>
                <div className="font-bold text-amber-50 mt-1">{report.moonset}</div>
              </div>
            </div>
            <div className="text-xs text-amber-200/70 flex justify-between pt-2 border-t border-white/10">
              <span>{isHi ? "सूर्य राशि:" : "Sun Sign:"} <strong className="text-amber-100">{isHi ? report.sunRashi.hi : report.sunRashi.en}</strong></span>
              <span>{isHi ? "चन्द्र राशि:" : "Moon Sign:"} <strong className="text-amber-100">{isHi ? report.moonRashi.hi : report.moonRashi.en}</strong></span>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-[#15112A] border border-amber-500/20 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h2 className="text-lg font-bold text-amber-200 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                {isHi ? "पंचांग के पाँच अंग (सटीक समाप्ति काल सहित)" : "Five Panchang Angas (With Exact End Times)"}
              </h2>
              <span className="text-xs text-amber-300/70">
                {isHi ? `अयनांश: ${report.ayanamshaDeg}` : `Lahiri Ayanamsha: ${report.ayanamshaDeg}`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                <div className="text-xs text-amber-300/70">{isHi ? "वार एवं पक्ष" : "Vara & Paksha"}</div>
                <div className="font-bold text-amber-50 mt-1">{isHi ? report.vara.hi : report.vara.en}</div>
                <div className="text-xs text-amber-300 mt-0.5">{isHi ? report.paksha.hi : report.paksha.en}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                <div className="text-xs text-amber-300/70">{isHi ? "तिथि (उदया)" : "Tithi (Udaya)"}</div>
                <div className="font-bold text-amber-50 mt-1">{isHi ? report.tithi.hi : report.tithi.en}</div>
                <div className="text-xs text-emerald-300 mt-0.5">{isHi ? "तक:" : "Upto:"} {report.tithi.endTime}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                <div className="text-xs text-amber-300/70">{isHi ? "नक्षत्र एवं चरण" : "Nakshatra & Pada"}</div>
                <div className="font-bold text-amber-50 mt-1">
                  {isHi ? report.nakshatra.hi : report.nakshatra.en} ({isHi ? `चरण ${report.nakshatra.pada}` : `Pada ${report.nakshatra.pada}`})
                </div>
                <div className="text-xs text-emerald-300 mt-0.5">{isHi ? "तक:" : "Upto:"} {report.nakshatra.endTime}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                <div className="text-xs text-amber-300/70">{isHi ? "योग" : "Yoga"}</div>
                <div className="font-bold text-amber-50 mt-1">{isHi ? report.yoga.hi : report.yoga.en}</div>
                <div className="text-xs text-emerald-300 mt-0.5">{isHi ? "तक:" : "Upto:"} {report.yoga.endTime}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 sm:col-span-2">
                <div className="text-xs text-amber-300/70">{isHi ? "करण" : "Karana"}</div>
                <div className="font-bold text-amber-50 mt-1">{isHi ? report.karana.hi : report.karana.en}</div>
                <div className="text-xs text-emerald-300 mt-0.5">{isHi ? "तक:" : "Upto:"} {report.karana.endTime}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Auspicious Muhurat & Inauspicious Kaal */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#11201C] border border-emerald-500/30 p-5 space-y-3">
            <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {isHi ? "शुभ मुहूर्त (Auspicious Muhurat)" : "Auspicious Muhurat (Shubh Kaal)"}
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between py-1.5 border-b border-emerald-500/15">
                <span className="text-emerald-100/80">{isHi ? "ब्रह्म मुहूर्त" : "Brahma Muhurat"}</span>
                <span className="font-semibold text-emerald-200">{report.auspicious.brahmaMuhurat}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-500/15">
                <span className="text-emerald-100/80">
                  {isHi ? "अभिजित मुहूर्त" : "Abhijit Muhurat"}
                  {report.auspicious.abhijitAvoided && (
                    <span className="ml-2 text-xs text-amber-300">({isHi ? "बुधवार को वर्ज्य" : "Avoid on Wed"})</span>
                  )}
                </span>
                <span className="font-semibold text-emerald-200">{report.auspicious.abhijitMuhurat}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-emerald-500/15">
                <span className="text-emerald-100/80">{isHi ? "विजय मुहूर्त" : "Vijay Muhurat"}</span>
                <span className="font-semibold text-emerald-200">{report.auspicious.vijayMuhurat}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-emerald-100/80">{isHi ? "गोधूलि मुहूर्त" : "Godhuli Muhurat"}</span>
                <span className="font-semibold text-emerald-200">{report.auspicious.godhuliMuhurat}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#22121A] border border-rose-500/30 p-5 space-y-3">
            <h2 className="text-lg font-bold text-rose-300 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              {isHi ? "अशुभ काल (त्याज्य समय)" : "Inauspicious Timings (Ashubh Kaal)"}
            </h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between py-1.5 border-b border-rose-500/15">
                <span className="text-rose-100/80">{isHi ? "राहु काल" : "Rahu Kaal"}</span>
                <span className="font-semibold text-rose-200">{report.inauspicious.rahuKaal}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-rose-500/15">
                <span className="text-rose-100/80">{isHi ? "यमगण्ड काल" : "Yamaganda Kaal"}</span>
                <span className="font-semibold text-rose-200">{report.inauspicious.yamaganda}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-rose-100/80">{isHi ? "गुलिक काल" : "Gulika Kaal"}</span>
                <span className="font-semibold text-rose-200">{report.inauspicious.gulika}</span>
              </div>
            </div>
            <p className="text-xs text-rose-200/70 pt-2">
              {isHi
                ? "नोट: सभी मुहूर्त आपके चुने गए शहर / GPS के वास्तविक सूर्योदय व सूर्यास्त के अनुसार गणना किए गए हैं।"
                : "Note: All Muhurats are dynamically divided from your selected city / GPS local Sunrise and Sunset."}
            </p>
          </div>
        </section>

        {/* Day & Night Choghadiya */}
        <section className="rounded-2xl bg-[#15112A] border border-amber-500/20 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <h2 className="text-xl font-bold text-amber-200">
              {isHi ? "आज का चौघड़िया मुहूर्त (Choghadiya)" : "Today's Choghadiya Muhurat"}
            </h2>
            <div className="inline-flex rounded-xl bg-black/40 p-1 border border-amber-500/20">
              <button
                type="button"
                onClick={() => setChoghadiyaTab("day")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  choghadiyaTab === "day" ? "bg-amber-500 text-black" : "text-amber-200 hover:text-white"
                }`}
              >
                {isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}
              </button>
              <button
                type="button"
                onClick={() => setChoghadiyaTab("night")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  choghadiyaTab === "night" ? "bg-amber-500 text-black" : "text-amber-200 hover:text-white"
                }`}
              >
                {isHi ? "रात्रि का चौघड़िया" : "Night Choghadiya"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(choghadiyaTab === "day" ? report.dayChoghadiya : report.nightChoghadiya).map((slot, i) => (
              <div key={i} className={`rounded-xl border p-3.5 ${qualityBadge(slot.quality)}`}>
                <div className="font-bold text-sm">{isHi ? slot.nameHi : slot.nameEn}</div>
                <div className="text-xs opacity-90 mt-1">{slot.start} – {slot.end}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Live Chandra Gochara 12 Rashi Grid */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-amber-100">
              {isHi ? "आज का राशिफल (सटीक चन्द्र गोचर पर आधारित)" : "Daily Vedic Horoscope (Live Chandra Gochara)"}
            </h2>
            <p className="text-sm text-amber-200/70">
              {isHi
                ? `आज चन्द्रमा ${report.moonRashi.hi} राशि में गोचर कर रहे हैं। विस्तृत फलादेश हेतु अपनी राशि चुनें:`
                : `Moon transits ${report.moonRashi.en} today. Click your Moon sign (Rashi) for 4-pillar guidance & remedy:`}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {report.horoscopes.map((item) => (
              <button
                key={item.rashi.id}
                type="button"
                onClick={() => setSelectedRashi(item)}
                className="text-left rounded-2xl bg-[#15112A] hover:bg-[#1D163A] border border-amber-500/20 hover:border-amber-400/50 p-5 transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.rashi.symbol}</span>
                    <div>
                      <div className="font-bold text-amber-100 group-hover:text-amber-300">
                        {isHi ? item.rashi.hi : item.rashi.en}
                      </div>
                      <div className="text-xs text-amber-300/70">
                        {isHi ? `चन्द्र गोचर: ${item.transitHouse}वां भाव` : `Moon Transit: House ${item.transitHouse}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: item.score }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {item.isChandrashtama && (
                  <span className="inline-block mt-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    ⚠ {isHi ? "चन्द्राष्टम सावधानी" : "Chandrashtama Caution"}
                  </span>
                )}

                <p className="text-xs text-amber-100/80 mt-3 line-clamp-2 leading-relaxed">
                  {isHi ? item.summaryHi : item.summaryEn}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Planetary Hora, Upcoming 30-Day Vrats, Eclipses & Bilingual SEO FAQ */}
        <UpcomingEventsAndHora
          dateStr={dateStr}
          city={selectedCity}
          isHi={isHi}
          onSelectDate={(newDate) => {
            setDateStr(newDate);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>

      {/* 4-Pillar Rashi Detail Modal */}
      {selectedRashi && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#16112E] border border-amber-500/35 rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-bold text-amber-100 flex items-center gap-2">
                  <span>{selectedRashi.rashi.symbol}</span>
                  <span>{isHi ? selectedRashi.rashi.hi : selectedRashi.rashi.en}</span>
                </div>
                <div className="text-xs text-amber-300/80 mt-1">
                  {isHi
                    ? `स्वामी: ${selectedRashi.rashi.lordHi} • आज का चन्द्र गोचर: ${selectedRashi.transitHouse}वां भाव`
                    : `Ruler: ${selectedRashi.rashi.lordEn} • Today's Moon Transit: House ${selectedRashi.transitHouse}`}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRashi(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-100"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                <div className="text-xs font-semibold text-amber-300">{isHi ? "करियर एवं धन" : "Career & Finance"}</div>
                <p className="text-amber-50/90 mt-1 text-xs leading-relaxed">{isHi ? selectedRashi.careerHi : selectedRashi.careerEn}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                <div className="text-xs font-semibold text-amber-300">{isHi ? "प्रेम एवं परिवार" : "Love & Family"}</div>
                <p className="text-amber-50/90 mt-1 text-xs leading-relaxed">{isHi ? selectedRashi.loveHi : selectedRashi.loveEn}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                <div className="text-xs font-semibold text-amber-300">{isHi ? "स्वास्थ्य" : "Health & Energy"}</div>
                <p className="text-amber-50/90 mt-1 text-xs leading-relaxed">{isHi ? selectedRashi.healthHi : selectedRashi.healthEn}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="text-xs font-semibold text-amber-300">{isHi ? "वैदिक उपाय (आचार्य जी)" : "Vedic Remedy (Upay)"}</div>
                <p className="text-amber-50/90 mt-1 text-xs leading-relaxed">{isHi ? selectedRashi.remedyHi : selectedRashi.remedyEn}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
              <span>{isHi ? "शुभ रंग:" : "Lucky Color:"} <strong className="text-amber-200">{isHi ? selectedRashi.luckyColorHi : selectedRashi.luckyColorEn}</strong></span>
              <span>{isHi ? "शुभ अंक:" : "Lucky Number:"} <strong className="text-amber-200">{selectedRashi.luckyNumber}</strong></span>
              <a
                href={`https://wa.me/918009124454?text=${encodeURIComponent(
                  `Namaste Acharya Shri Ravindra Shukla Shatri Ji, I checked today's ${selectedRashi.rashi.en} Panchang & Horoscope (${report.dateStr}) and want a personal consultation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                {isHi ? "आचार्य जी से परामर्श लें" : "Consult Acharya Ji"}
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
// END OF FILE
