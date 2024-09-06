import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../utils/utils";

function SearchInput({ onSearch }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const prevSearchRef = useRef(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch !== prevSearchRef.current) {
      onSearch(debouncedSearch);
      prevSearchRef.current = debouncedSearch;
    }
  }, [debouncedSearch, onSearch]);

  return (
    <div>
      <p>Does this anime already exist?</p>
      <input
        type="text"
        id="anime-search"
        placeholder="Search for an anime..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchInput;
