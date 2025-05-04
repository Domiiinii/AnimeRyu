import React, { useEffect, useState } from 'react';
import AnimeList from './components/AnimeList';
import Watchlist from './components/Watchlist';
import AnimeDetails from './components/AnimeDetails';
import SeasonalScroll from './components/SeasonalScroll';
import './App.css';

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const stored = localStorage.getItem('watchlist');
    return stored ? JSON.parse(stored) : [];
  });
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [seasonalAnime, setSeasonalAnime] = useState([]);
  const [activeTab, setActiveTab] = useState('anime');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    const url = debouncedSearchTerm
      ? `https://api.jikan.moe/v4/anime?q=${debouncedSearchTerm}&page=${page}&sfw`
      : `https://api.jikan.moe/v4/top/anime?page=${page}&sfw`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data?.data) {
          setAnimeList(data.data);
          setLastPage(data.pagination?.last_visible_page || 1);
        } else {
          setAnimeList([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching anime list:', err);
        setAnimeList([]);
        setLoading(false);
      });
  }, [page, debouncedSearchTerm]);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/seasons/now?sfw')
      .then(res => res.json())
      .then(data => {
        const unique = Array.from(new Map(data.data.map(anime => [anime.mal_id, anime])).values());
        setSeasonalAnime(unique);
      })
      .catch(err => console.error('Error fetching seasonal anime:', err));
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const getRandomAnime = () => {
    fetch('https://api.jikan.moe/v4/random/anime?sfw')
      .then(res => res.json())
      .then(data => {
        if (data?.data) setSelectedAnime(data.data);
      })
      .catch(err => console.error('Error fetching random anime:', err));
  };

  const addToWatchlist = anime => {
    if (!watchlist.find(item => item.mal_id === anime.mal_id)) {
      setWatchlist([...watchlist, anime]);
    }
  };

  const removeFromWatchlist = id => {
    setWatchlist(watchlist.filter(anime => anime.mal_id !== id));
  };

  const showDetails = anime => setSelectedAnime(anime);
  const handleBackToList = () => setSelectedAnime(null);

  const nextPage = () => setPage(prev => Math.min(prev + 1, lastPage));
  const prevPage = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="container">
      <div className="container-items">
        <div className="top-bar">
          <div className="title">Anime<span>Ryu</span></div>
          <div className="tab-buttons">
            <button onClick={() => {setActiveTab('anime'); setSearchTerm('');}}>Home</button>
            <button onClick={() => {setActiveTab('watchlist'); setSearchTerm('');}}>Watchlist</button>
            <button onClick={() => {getRandomAnime(); setSearchTerm('');}}>Random</button>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search anime..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {selectedAnime ? (
          <AnimeDetails
            anime={selectedAnime}
            onClose={handleBackToList}
            addToWatchlist={addToWatchlist}
            watchlist={watchlist}
          />
        ) : activeTab === 'anime' ? (
          <>
            {!debouncedSearchTerm ? (
              <>
                <div className="home-text">Ongoing Anime</div>
                <SeasonalScroll seasonalAnime={seasonalAnime} showDetails={showDetails} />
                <div className="home-text">Popular Anime</div>
              </>
            ) : (
              <div className="home-text">Search</div>
            )}
            <AnimeList
              animeList={animeList}
              loading={loading}
              showDetails={showDetails}
              nextPage={nextPage}
              prevPage={prevPage}
              page={page}
              lastPage={lastPage}
            />
          </>
        ) : (
          <div>
            <div className="home-text">Watchlist</div>
            <Watchlist
              watchlist={watchlist}
              removeFromWatchlist={removeFromWatchlist}
              showDetails={showDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;