import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

const Preview = () => {
  const [previewData, setPreviewData] = useState([]);
  const [showData, setShowData] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [loadingShow, setLoadingShow] = useState(false);

  useEffect(() => {
    fetchPreviewData();
  }, []);

  // Fetches preview data from the API
  const fetchPreviewData = () => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPreviewData(data);
        setLoadingPreview(false);
        console.log(data)
      })
      .catch((error) => console.error('Error fetching previews:', error));
  };

  // Fetches show details for a specific showId
  const fetchShowDetails = async (showId) => {
    try {
      setLoadingShow(true);
      const response = await axios.get(`https://podcast-api.netlify.app/id/${showId}`);
      const data = response.data;
      setShowData(data);
      setLoadingShow(false);
    } catch (error) {
      console.error('Error fetching show details:', error);
      setLoadingShow(false);
    }
  };

  const handleShowClick = (showId) => {
    fetchShowDetails(showId);
  };

  if (loadingPreview) {
    return <div>Loading...</div>;
  }

  if (!showData) {
    return (
      <div className="Card-Box">
        {/* Render the previews */}
        <Grid container spacing={2}>
          {previewData.map(({ id, image, title, file }) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <div className="preview-item">
                <div className="image">
                  <img src={image} alt={title} className="preview-image" />
                  <div className="dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <div className="info">
                  <h3>Title: {title}</h3>
                  {/* Display other show information here */}
                </div>
                <div className='buttons'>
                  {/* Handle clicking on a show */}
                  <button onClick={() => handleShowClick(id)}>Seasons</button>
                </div>
                <div>
                  {/* Add audio player */}
                  {file && (
                    <audio controls>
                      <source src={file} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  // Render show details and episodes when showData is available
  return (
    <div className="season-container">
      {/* Back button */}
      <button onClick={() => setShowData(null)}>Back to Show List</button>

      {/* Show details */}
      <h2>{showData.title}</h2>
      {/* Render seasons and episodes here */}
    </div>
  );
};

export default Preview;