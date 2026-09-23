"use client";

import React, { useState, useEffect, useRef } from "react";

interface Place {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  admin1?: string; // State/Province
}

interface PlaceAutoCompleteProps {
  onSelect: (place: Place) => void;
  placeholder?: string;
  className?: string;
}

export default function PlaceAutoComplete({
  onSelect,
  placeholder = "City, State",
  className = "",
}: PlaceAutoCompleteProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        const data = await response.json();

        if (data.results) {
          setResults(data.results);
          setIsOpen(true);
        } else {
          setResults([]);
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (place: Place) => {
    setQuery(`${place.name}${place.admin1 ? `, ${place.admin1}` : ""}, ${place.country}`);
    setIsOpen(false);
    onSelect(place);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={className}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
      />
      {isLoading && (
        <div className="absolute right-3 top-3 text-[#C9A84C]/50">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-[#1A1628] border border-[#C9A84C]/20 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {results.map((place) => (
            <li
              key={place.id}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-[#0D0B1A] cursor-pointer text-[#E8E4F0] border-b border-[#C9A84C]/10 last:border-0"
            >
              <div className="font-medium">{place.name}</div>
              <div className="text-xs text-[#E8E4F0]/60">
                {[place.admin1, place.country].filter(Boolean).join(", ")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
