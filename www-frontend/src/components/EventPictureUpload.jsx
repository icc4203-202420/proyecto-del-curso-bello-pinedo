import React, { useState, useEffect } from 'react';
import axiosInstance from './PageElements/axiosInstance';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

function EventPictureUpload() {
  const { id } = useParams();  // Obtiene el id del evento desde la URL
  const [file, setFile] = useState(null);  // Estado para el archivo seleccionado
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [error, setError] = useState('');  // Estado para manejar errores
  const [success, setSuccess] = useState('');  // Estado para manejar éxito
  const [barId, setBarId] = useState(null);  // Estado para almacenar el bar_id
  const navigate = useNavigate();  // Navegación después de la subida

  useEffect(() => {
    axiosInstance.get(`/events/${id}`)
      .then((res) => {
        const eventData = res.data.event;
        if (eventData && eventData.bar_id) {
          setBarId(eventData.bar_id);  // Guardar el bar_id del evento
        } else {
          setError('Event or bar information not available.');
        }
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
        setError('Error fetching event details.');
      });
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      setError('Please select a file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', file);
  
    setLoading(true);
  
    try {
      const response = await axiosInstance.post(`/bars/${barId}/events/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        setSuccess('Image uploaded successfully!');
        setFile(null);
        setTimeout(() => {
          navigate(`/events/${id}/gallery`);
        }, 1500);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '100px', textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Upload a Picture for the Event
      </Typography>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: '20px' }}
        />

        {error && (
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography variant="body1" color="success" sx={{ mb: 2 }}>
            {success}
          </Typography>
        )}

        <Button type="submit" variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000', mb: 3 }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Upload Photo'}
        </Button>
      </form>

      <Box sx={{ mt: 3 }}>
        <Link to={`/events/${id}/gallery`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
            Back to Event Gallery
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default EventPictureUpload;
