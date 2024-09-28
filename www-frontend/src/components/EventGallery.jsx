import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import useAxios from 'axios-hooks';

function EventGallery() {
  const { id } = useParams();  // Obtiene el id del evento desde la URL

  // Realiza la llamada a la API utilizando useAxios
  const [{ data, loading, error }] = useAxios(
    {
      url: `/events/${id}/images`,  // Asegura que la URL sea correcta
      method: 'GET',
    },
    { manual: false }  // Ejecuta la llamada automáticamente al montar el componente
  );

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data && data.images) {
      setImages(data.images);
    }
  }, [data]);

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
          Error loading images.
        </Typography>
      )}

      {!loading && !error && images.length === 0 && (
        <Typography variant="body1">No images found for this event.</Typography>
      )}

      {!loading && images.length > 0 && (
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

      {/* Botón para subir fotos - Siempre visible */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link to={`/events/${id}/upload`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
            Upload Photos
          </Button>
        </Link>
      </Box>

      {/* Botón para regresar - Siempre visible */}
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
