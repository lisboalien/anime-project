import React, { useState } from "react";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (search) => {
    fetch(`https://api.github.com/search/repositories?q=${search}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.items));
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
}

export default App;