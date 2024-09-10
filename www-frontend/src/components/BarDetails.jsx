import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';

function BarDetails() {
  const [bar, setBar] = useState(null); // Estado para manejar el bar
  const { id } = useParams();

  // Fetch bar details
  useEffect(() => {
    axiosInstance.get(`/bars/${id}`)
      .then((res) => {
        if (res.data && res.data.bar) { // Revisa si el objeto `bar` existe dentro de `res.data`
          setBar(res.data.bar); // Asigna los datos del bar
        } else {
          setBar(res.data); // Asigna directamente los datos si no están dentro de `bar`
        }
      })
      .catch((error) => {
        console.error('Error fetching bar:', error);
      });
  }, [id]);

  return (
    <>
      {bar ? (
        <Box key={bar.id} sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
          {/* Bar description */}
          <Card sx={{ backgroundColor: '#f5c000' }}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ color: '#000' }}>
                {bar.name}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Location:</strong> {bar.location || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Country:</strong> {bar.country || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>City:</strong> {bar.city || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Street:</strong> {bar.street || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Postal Code:</strong> {bar.postal_code || 'Unknown'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to="/bars" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
                Back to Bars List
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>
      )}
    </>
  );
}

export default BarDetails;
