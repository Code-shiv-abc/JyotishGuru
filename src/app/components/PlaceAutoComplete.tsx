"use client";

import React, { useState, useEffect, useRef } from "react";

export interface Place {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  admin1?: string;
}

interface PlaceAutoCompleteProps {
  id?: string;
  initialValue?: string;
  onSelect: (place: Place) => void;
  placeholder?: string;
  className?: string;
}

export default function PlaceAutoComplete({
  id = "place-autocomplete",
  initialValue = "",
  onSelect,
  placeholder = "City, State",
  className = "",
}: PlaceAutoCompleteProps) {
  const [query, setQuery] = useState(initialValue);
  const [results, setResults] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasSelected, setHasSelected] = useState(Boolean(initialValue));
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialValue) setQuery(initialValue);
  }, [initialValue]);

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
    if (hasSelected || query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=5&language=en&format=json`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setResults(data.results);
          setIsOpen(true);
          setActiveIndex(0);
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

    const debounceTimer = setTimeout(fetchPlaces, 280);
    return () => clearTimeout(debounceTimer);
  }, [query, hasSelected]);

  const handleSelect = (place: Place) => {
    const formatted = `${place.name}${place.admin1 ? `, ${place.admin1}` : ""}, ${place.country}`;
    setQuery(formatted);
    setHasSelected(true);
    setIsOpen(false);
    onSelect(place);
  };

  // Auto-select top match on blur if user typed a valid city but didn't click the dropdown
  const handleBlur = () => {
    setTimeout(() => {
      if (!hasSelected && results.length > 0) {
        handleSelect(results[0]);
      }
    }, 180);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls={`${id}-listbox`}
        aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined}
        value={query}
        onChange={(e) => {
          setHasSelected(false);
          setQuery(e.target.value);
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        required
      />
      {isLoading && (
        <div className="absolute right-3 top-3.5 text-[#C9A84C]/70" aria-hidden="true">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}

      {isOpen && results.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-[#1A1628] border border-[#C9A84C]/30 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
        >
          {results.map((place, idx) => (
            <li
              id={`${id}-option-${idx}`}
              key={place.id}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseDown={() => handleSelect(place)}
              className={`px-4 py-2.5 cursor-pointer text-[#E8E4F0] border-b border-[#C9A84C]/10 last:border-0 transition-colors ${
                idx === activeIndex ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "hover:bg-[#0D0B1A]"
              }`}
            >
              <div className="font-medium text-sm">{place.name}</div>
              <div className="text-xs text-[#E8E4F0]/70">
                {[place.admin1, place.country].filter(Boolean).join(", ")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
