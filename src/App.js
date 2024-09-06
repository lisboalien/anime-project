import React, { useState, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setSearchResults([]);
      setPage(1);
      setHasMore(false);
      return;
    }

    if (searchTerm.trim() === "") {
      console.log("Empty search term");
      setSearchResults([]);
      setPage(1);
      setHasMore(false);
      return;
    }

    setSearch(searchTerm);
    setPage(1);
    setLoading(true);

    fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.data);
        setHasMore(data.pagination.has_next_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        setLoading(false);
      });
  };

  const loadMoreData = () => {
    setLoading(true);

    fetch(`https://api.jikan.moe/v4/anime?q=${search}&page=${page + 1}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults((prevResults) => [...prevResults, ...data.data]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(data.pagination.has_next_page);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching more results:", error);
        setLoading(false);
      });
  };

  return (
    <main>
      <SearchInput onSearch={handleSearch} />
      <InfiniteScroll
        dataLength={searchResults.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={loading && <div className="loader">Loading...</div>}
      >
        <SearchResults results={searchResults} />
      </InfiniteScroll>
    </main>
  );
}

export default App;
