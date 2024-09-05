import { genreColors } from "./genreColors";

const tooltipElements = document.querySelectorAll("[data-tooltip]");

tooltipElements.forEach((element) => {
  element.addEventListener("mouseover", showTooltip);
  element.addEventListener("mouseout", hideTooltip);
});

function showTooltip(event) {
  console.log(event);
  const iconElement = event.target.closest("[data-tooltip]");
  if (!iconElement) return;

  const tooltip = document.createElement("span");
  tooltip.classList.add("tooltip");
  tooltip.textContent = iconElement.dataset.tooltip;
  document.body.appendChild(tooltip);

  const rect = event.target.getBoundingClientRect();
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.top + window.scrollY + 10}px`;
}

function hideTooltip(event) {
  const tooltip = document.querySelector(".tooltip");
  if (tooltip) {
    tooltip.remove();
  }
}

function AnimeCard({ anime }) {
  const animeTypeElement = document.createElement("span");
  animeTypeElement.classList.add("anime-type");
  animeTypeElement.innerHTML = `<i class="${getIconClass(
    anime.type
  )}" data-tooltip="${anime.type}"></i>`;

  return (
    <div className="anime-card">
      <img src={anime.image_url} alt={anime.title} />
      <div className="content">
        <p className="title">{anime.title}</p>
        <p className="year">{anime.year}</p>
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
      </div>
    </div>
  );

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
        return "fas fa-star";
      case "Music":
        return "fas fa-music";
      case "CM":
        return "fa-regular fa-face-meh-blank";
      case "PV":
        return "fa-regular fa-wand-magic-sparkles";
      case "TV Special":
        return "fa-regular fa-star";
      default:
        return "fas fa-question";
    }
  }
}

export default AnimeCard;

