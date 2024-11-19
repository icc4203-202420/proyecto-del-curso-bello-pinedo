import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const BeerBars = () => {
  const { id } = useParams(); // Obtener el ID de la cerveza desde la URL
  const [bars, setBars] = useState([]); // Estado para almacenar los bares
  const [error, setError] = useState(''); // Manejo de errores

  useEffect(() => {
    axiosInstance.get(`/beers/${id}/bars`)
      .then((res) => {
        if (res.data.bars && res.data.bars.length > 0) {
          setBars(res.data.bars);
        } else {
          setError('No bars found serving this beer.');
        }
      })
      .catch((error) => {
        setError('Error fetching bars.');
        console.error('Error fetching bars:', error);
      });
  }, [id]);

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#f5c000' }}>
        Bars Serving This Beer
      </Typography>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      {bars.length > 0 ? (
        bars.map((bar) => (
          <Card key={bar.id} sx={{ backgroundColor: '#f5c000', mb: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ color: '#000' }}>
                {bar.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#000' }}>
                {bar.address}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: '#000' }}>
          No bars found serving this beer.
        </Typography>
      )}
    </Box>
  );
};

export default BeerBars;
