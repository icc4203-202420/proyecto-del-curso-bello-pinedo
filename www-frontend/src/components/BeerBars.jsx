import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';

const BeerBars = () => {
  const { id } = useParams(); // Obtener el ID de la cerveza desde la URL
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `http://localhost:3001/api/v1/beers/${id}/bars`, // Asumimos que tienes un endpoint para obtener los bares
      method: 'GET'
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <Typography>Loading bars...</Typography>;
  if (error) return <Typography>Error loading bars</Typography>;
  if (!data || data.length === 0) return <Typography>No bars found for this beer.</Typography>;

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h4" component="div" sx={{ mb: 2, color: '#000' }}>
        Bars Serving {data.beerName}
      </Typography>
      <List>
        {data.bars.map((bar) => (
          <ListItem key={bar.id}>
            <ListItemText primary={bar.name} secondary={bar.address} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BeerBars;
