import React from 'react';
import { Box, Typography, Card, CardContent, TextField, IconButton, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LollapaloozaImage from '../assets/Bud-Lollapalooza.jpg';

const Home = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px', paddingTop: '100px' }}>
      {/* Main Section with Image and other elements */}
      <Grid container spacing={4}>
        {/* Left Column: Lollapalooza Image */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f5c000', color: '#000', mb: 4 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Popular Now
              </Typography>
              <img
                src={LollapaloozaImage}
                alt="Lollapalooza"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Search bar, events, etc. */}
        <Grid item xs={12} md={6}>
          {/* Search Friends */}
          <Box sx={{ display: 'flex', mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Search friends"
              variant="outlined"
              sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
            />
            <IconButton
              sx={{
                backgroundColor: '#f5c000',
                color: '#000',
                ml: 1,
                width: 48, // Ancho del botón
                height: 48, // Alto del botón (igual que el ancho)
                borderRadius: '50%', // Hace el botón perfectamente circular
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Most Visited Bars */}
          <Typography variant="h6" sx={{ color: '#f5c000', mb: 2 }}>
            Most visited Bars
          </Typography>
          <Card sx={{ backgroundColor: '#f5c000', color: '#000', mb: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 2 }} />
              <Box>
                <Typography variant="h6">Oculto Beergarden</Typography>
                <Typography variant="body2">Descripcion de evento</Typography>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ backgroundColor: '#f5c000', color: '#000', mb: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ mr: 2 }} />
              <Box>
                <Typography variant="h6">Barba Azul Apoquindo</Typography>
                <Typography variant="body2">Descripcion de evento</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Trending Events */}
          <Typography variant="h6" sx={{ color: '#f5c000', mb: 2 }}>
            Trending events
          </Typography>
          <Card sx={{ backgroundColor: '#f5c000', color: '#000', mb: 2 }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <WhatshotIcon sx={{ mr: 2 }} />
              <Box>
                <Typography variant="h6">Cata a ciegas</Typography>
                <Typography variant="body2">Descripcion de evento</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
