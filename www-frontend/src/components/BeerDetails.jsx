import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import Beers from './Beers';

const BeerDetails = () => {

  const [beer, setBeer] = useState();
  const { id } = useParams(); // Obtener el ID de la URL
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `http://localhost:3001/api/v1/beers/${id}`,
      method: 'GET'
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Mostrar mensaje de carga
  if (loading) return <Typography>Loading beer details...</Typography>;

  // Mostrar mensaje de error
  if (error) return <Typography>Error loading beer details</Typography>;

  // Verificar si los datos están disponibles
  if (!data) return <Typography>No beer data found.</Typography>;

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
      <Card sx={{ backgroundColor: '#f5c000' }}>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ color: '#000' }}>
            {data.name || 'Unknown Beer'}
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: '#000' }}>
                <strong>Style:</strong> {data.style || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: '#000' }}>
                <strong>Hop:</strong> {data.hop || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: '#000' }}>
                <strong>Yeast:</strong> {data.yeast || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: '#000' }}>
                <strong>Malts:</strong> {data.malts || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: '#000' }}>
                <strong>IBU:</strong> {data.ibu || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: '#000' }}>
                <strong>Alcohol:</strong> {data.alcohol || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: '#000' }}>
                <strong>BLG:</strong> {data.blg || 'Unknown'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: '#000' }}>
                <strong>Average Rating:</strong> {data.avg_rating ? data.avg_rating : 'No rating available'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BeerDetails;
