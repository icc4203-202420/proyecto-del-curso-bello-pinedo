import React, { useState, useEffect } from 'react';
import axiosInstance from './PageElements/axiosInstance';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';

function EventGallery() {
  const { id } = useParams();  // Obtiene el id del evento desde la URL
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener las imágenes del evento
    axiosInstance.get(`/events/${id}/images`)
      .then((res) => {
        if (res.data && res.data.images) {
          setImages(res.data.images);
        } else {
          setImages([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setError('Error fetching images');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading images...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '100px' }}>
      {error && (
        <Typography variant="body1" color="error" margin="normal">
          {error}
        </Typography>
      )}

      {images.length === 0 ? (
        <Typography variant="body1">No images found for this event.</Typography>
      ) : (
        <Box sx={{ overflowX: 'auto', display: 'flex', flexDirection: 'row' }}>
          {images.map((image) => (
            <Box
              key={image.id}
              sx={{
                minWidth: '300px',
                marginRight: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
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

      {/* Botón para subir fotos, visible siempre */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link to={`/events/${id}/upload`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '##000' }}>
            Upload Photos
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default EventGallery;
