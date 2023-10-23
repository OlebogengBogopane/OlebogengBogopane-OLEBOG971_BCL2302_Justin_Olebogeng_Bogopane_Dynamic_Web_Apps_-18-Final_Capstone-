import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Fuse from 'fuse.js';
import Box from '@mui/material/Box';

function Filter() {
  const [filteredPreviews, setFilteredPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const numPreviewsShown = 10;

  const genreTitleMapping = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  useEffect(() => {
    filterPreviews();
  }, [searchQuery, sortBy, selectedGenre]); // Removed 'previewData' dependency

  const filterPreviews = () => {
    let filteredPreviews = [...previewData]; // You need to provide 'previewData' in your actual code
    if (searchQuery) {
      const fuse = new Fuse(filteredPreviews, { keys: ['title'] });
      filteredPreviews = fuse.search(searchQuery).map((result) => result.item);
    }
    if (selectedGenre) {
      filteredPreviews = filteredPreviews.filter((preview) =>
        preview.genres.includes(parseInt(selectedGenre))
      );
    }
    setFilteredPreviews(filteredPreviews);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress size={60} />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Box className="Box-container">
      <img src={searchIcon} alt="Search Icons" className="Icons" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by title..."
      />
      <select id="sortDropdown" onChange={(e) => setSortBy(e.target.value)}>
        {/* Options for sort */}
      </select>
      <div className="Card-Box">
        {/* Rest of your JSX */}
      </div>
    </Box>
  );
}

export default Filter;
