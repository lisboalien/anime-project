import React from "react";
import AnimeCard from "./AnimeCard";

function SearchResults({ results }) {
  return (
    results && (
      <ul id="anime-results">
        {results.length > 0 &&
          results.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
      </ul>
    )
  );
}

export default SearchResults;
