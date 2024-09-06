import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const BeerDetails = () => {
  const [beer, setBeer] = useState(null); // Store single beer object
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get(`/beers/${id}`)
      .then((res) => {
        setBeer(res.data.beer);
      })
      .catch((error) => {
        console.error('Error fetching beer:', error);
      });
  }, [id]);

  return (
    <>
      {beer ? (
        <Box key={beer.id} sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
          <Card sx={{ backgroundColor: '#f5c000' }}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ color: '#000' }}>
                {beer.name}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Style:</strong> {beer.style || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Hop:</strong> {beer.hop || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Yeast:</strong> {beer.yeast || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>ABV:</strong> {beer.abv || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>IBU:</strong> {beer.ibu || 'Unknown'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>
      )}
    </>
  );
};

export default BeerDetails;
