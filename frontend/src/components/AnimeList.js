import React from 'react';
import './AnimeList.css';

const AnimeList = ({
  animeList,
  loading,
  showDetails,
  nextPage,
  prevPage,
  page,
  lastPage
}) => {
  if (loading) {
    return;
  }

  return (
    <div>
      <div className="anime-list-container">
        {animeList.map((anime) => (
          <div key={anime.mal_id} className="anime-card" onClick={() => showDetails(anime)}>
            <img src={anime.images?.jpg.large_image_url || 'default-image.jpg'} alt={anime.title} />
			<div className="details">
			  <h3>{anime.title}</h3>
			</div>
          </div>
        ))}
		</div>
			{lastPage > 1 && (
				<div className="pagination">
					<button onClick={prevPage} disabled={page === 1}>
						<strong>Prev</strong>
					</button>
					<span>Page {page} of {lastPage}</span>
					<button onClick={nextPage} disabled={page === lastPage}>
						<strong>Next</strong>
					</button>
				</div>
			)}
		</div>
	);
};

export default AnimeList;
