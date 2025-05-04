import React from 'react';
import './AnimeDetails.css';

const AnimeDetails = ({ anime, onClose, addToWatchlist, watchlist }) => {
  if (!anime) return null;

  const isInWatchlist = watchlist?.some(item => item.mal_id === anime.mal_id);
  const trailerUrl = anime.trailer?.embed_url;

  return (
    <div className="anime-details-overlay">
      <div className="anime-details-card">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img src={anime.images?.jpg.large_image_url} alt={anime.title} />
        <div className="anime-details-content">
          <h2>{anime.title}</h2>
          <p><strong>Episodes:</strong> {anime.episodes || 'N/A'}</p>
          <p><strong>Status:</strong> {anime.status || 'N/A'}</p>
          <p><strong>Rating:</strong> {anime.score || 'N/A'} / 10</p>
          <p><strong>Genres:</strong> {anime.genres?.map(genre => genre.name).join(', ') || 'N/A'}</p>

          <button
            className="add-btn"
            onClick={() => !isInWatchlist && addToWatchlist(anime)}
            disabled={isInWatchlist}
          >
            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>

          {trailerUrl && (
            <div className="trailer-container">
              <h3>Trailer</h3>
				<iframe
					className="anime-trailer"
					src={trailerUrl}
					title="Anime Trailer"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
            </div>
          )}
		  
          <p className="synopsis">{anime.synopsis || 'No synopsis available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
