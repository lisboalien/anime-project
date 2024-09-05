import AnimeCard from "./AnimeCard";

function SearchResults({ animes }) {
  return (
    <ul id="anime-results">
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </ul>
  );
}

export default SearchResults;
