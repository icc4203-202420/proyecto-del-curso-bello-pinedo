import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';
import { useNavigate } from 'react-router-dom';  

function EventGallery() {
  const { id } = useParams();  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();  

  useEffect(() => {
    axiosInstance.get(`/bars/1/events/${id}/images`)
      .then((res) => {
        setImages(res.data.images);  
        setLoading(false); 
      })
      .catch((error) => {
        setError('Error loading images.');
        setLoading(false);
      });
  }, [id]);

  const handleImageClick = (pictureId) => {
    navigate(`/events/${id}/images/${pictureId}`);  
  };

  return (
    <Box sx={{ padding: '100px' }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading images...
          </Typography>
        </Box>
      )}

      {error && (
        <Typography variant="body1" color="error" margin="normal">
          {error}
        </Typography>
      )}

      {!loading && !error && images.length === 0 && (
        <Typography variant="body1">No images found for this event.</Typography>
      )}

      {!loading && images.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {images.map((image) => (
            <Box
              key={image.id}
              sx={{
                minWidth: '200px',
                margin: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                cursor: 'pointer',  
              }}
              onClick={() => handleImageClick(image.id)}  
            >
            <img
              src={image.url}  
              alt={`Event image ${image.id}`}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link to={`/events/${id}/upload`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
            Upload Photos
          </Button>
        </Link>
      </Box>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link to={`/events/${id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
            Back to Event Details
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default EventGallery;
