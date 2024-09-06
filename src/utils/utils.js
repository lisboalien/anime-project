import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  // State to store the debounce value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout to trigger the callback after the delay
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup functin to clear the timeout when the component unmounts or when the value changes
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

function isDarkColor(color) {
    let r, g, b;

    if (color.startsWith("#")) {
      r = parseInt(color.substr(1, 2), 16);
      g = parseInt(color.substr(3, 2), 16);
      b = parseInt(color.substr(5, 2), 16);
    } else if (color.startsWith("rgb")) {
      const parts = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (parts) {
        r = parseInt(parts[1], 10);
        g = parseInt(parts[2], 10);
        b = parseInt(parts[3], 10);
      }
    }

    if (r !== undefined && g !== undefined && b !== undefined) {
      const luminance = (r * 299 + g * 587 + b * 114) / 255000;
      return luminance < 0.5;
    } else {
      console.error("Invalid color format:", color);
      return false; // Default to false if color format is not recognized
    }
  }

  function getIconClass(animeType) {
    switch (animeType) {
      case "TV":
        return "fas fa-tv";
      case "Movie":
        return "fas fa-film";
      case "OVA":
        return "fas fa-video";
      case "ONA":
        return "fas fa-laptop";
      case "Special":
        return "fas fa-bolt";
      case "Music":
        return "fas fa-music";
      case "CM":
        return "fa-regular fa-face-meh-blank";
      case "PV":
        return "fas fa-magic";
      case "TV Special":
        return "fa-regular fa-star";
      default:
        return "fas fa-question";
    }
  }

export { useDebounce, isDarkColor, getIconClass };
