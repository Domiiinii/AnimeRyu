import React, { useState } from 'react';
import './Watchlist.css';

const Watchlist = ({ watchlist, removeFromWatchlist, showDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = watchlist.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(watchlist.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {watchlist.length === 0 ? (
        <p className="empty-watchlist-message">Your watchlist is empty. Add some anime!</p>
      ) : (
        <div className="watchlist-container">
          {currentItems.map((anime) => (
            <div key={anime.mal_id} className="watchlist-card" onClick={() => showDetails(anime)}>
              <img src={anime.images.jpg.large_image_url} alt={anime.title} />
              <div className="details">
                <h3>{anime.title}</h3>
                <button className="rmv-btn" onClick={(e) => { e.stopPropagation(); removeFromWatchlist(anime.mal_id); }}>
                  Remove from Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {watchlist.length > 10 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
          <span>{currentPage} of {Math.ceil(watchlist.length / itemsPerPage)}</span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(watchlist.length / itemsPerPage)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
