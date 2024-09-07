import React from "react";
import { genreColors } from "../utils/genreColors";
import { Tooltip } from "react-tooltip";
import { isDarkColor, getIconClass } from "../utils/utils";

function AnimeCard({ anime }) {
  const animeTypeElement = document.createElement("span");
  animeTypeElement.classList.add("anime-type");
  animeTypeElement.innerHTML = `<i class="${getIconClass(
    anime.type
  )}" data-tooltip="${anime.type}"></i>`;

  const imageURL =
    anime.rating === "Rx - Hentai"
      ? "/images/censored.jpg"
      : anime.images.jpg.image_url;

  return (
    <li className="anime-card">
      <img src={imageURL} alt={anime.title} />
      <div className="content">
        <span className="anime-type">
          <i
            className={getIconClass(anime.type)}
            data-tooltip-id={anime.type.toLowerCase().replace(" ", "-")}
            data-tooltip-content={anime.type}
            data-tooltip-place="right"
          ></i>
          <Tooltip
            id={anime.type.toLowerCase().replace(" ", "-")}
            className="diff-arrow"
            classNameArrow="arrow"
          />
        </span>
        <p className="title">{anime.title}</p>
        <p className="year">{anime.year}</p>
      </div>
      <ul className="anime-genres">
        {anime.genres.map((genre) => (
          <li
            key={genre.mal_id}
            className="genre-tag"
            style={{
              backgroundColor: genreColors[genre.name] || "#ddd",
              color: isDarkColor(genreColors[genre.name] || "#ddd")
                ? "#fff"
                : "#000",
              borderColor: isDarkColor(genreColors[genre.name] || "#ddd")
                ? "#fff"
                : "#000",
            }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </li>
  );
}

export default AnimeCard;
