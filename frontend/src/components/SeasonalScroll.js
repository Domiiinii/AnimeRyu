import React, { useEffect, useRef } from 'react';
import './SeasonalScroll.css';

function SeasonalScroll({ seasonalAnime, showDetails }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: 380, behavior: 'smooth' });
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth - 1
        ) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="seasonal-scroll-container" ref={scrollRef}>
      {seasonalAnime.map(anime => (
        <div
          key={anime.mal_id}
          className="seasonal-anime-card"
          onClick={() => showDetails(anime)}
        >
          <img src={anime.images.jpg.image_url} alt={anime.title} />
			<div className="details">
			  <h3>{anime.title}</h3>
			</div>
        </div>
      ))}
    </div>
  );
}

export default SeasonalScroll;
