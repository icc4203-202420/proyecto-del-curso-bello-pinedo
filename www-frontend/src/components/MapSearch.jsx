import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './PageElements/searchbar';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: -33.4489,
  lng: -70.6693,
};

const MapSearch = () => {
  const [bars, setBars] = useState([]); // Estado para los bares
  const [searchKeywords, setSearchKeywords] = useState(''); // Estado para la búsqueda
  const [center, setCenter] = useState(defaultCenter); // Centro del mapa
  const [filteredBars, setFilteredBars] = useState([]); // Bares filtrados
  const [error, setError] = useState(''); // Estado para manejar errores

  const navigate = useNavigate(); // Navegación

  const fetchBarsNearLocation = async (lat, lng) => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/bars', {
        params: { lat, lng },
      });
      setFilteredBars(response.data.bars || []);
    } catch (error) {
      console.error('Error fetching bars:', error);
      setError('Error fetching bars data.');
    }
  };

  // Función para geocodificar la dirección ingresada
  const handleSearch = async () => {
    try {
      setError('');
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: searchKeywords,
            key: 'api_key', // Reemplaza con tu clave de API
          },
        }
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        setCenter(location); // Actualizar la ubicación del centro en el mapa
        fetchBarsNearLocation(location.lat, location.lng); // Buscar bares cercanos a las coordenadas
      } else {
        setError('No results found for the entered location.');
      }
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      setError('Error fetching geocoding data.');
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
        Search Bars by Location
      </Typography>

      {/* Usa SearchBar para buscar por ubicación */}
      <SearchBar
        searchKeywords={searchKeywords}
        setSearchKeywords={setSearchKeywords}
        label="Search Location (Country, City, Street)"
      />

      <Button
        variant="contained"
        sx={{ mt: 3, backgroundColor: '#000', color: '#f5c000' }}
        onClick={handleSearch}
      >
        Search
      </Button>

      {error && (
        <Typography variant="body1" color="error" margin="normal">
          {error}
        </Typography>
      )}

      <LoadScript
        googleMapsApiKey="api_key"
        onLoad={() => console.log('Google Maps API loaded successfully')}
        onError={(error) => console.error('Error loading Google Maps API:', error)}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {filteredBars.map((bar) => (
            <Marker
              key={bar.id}
              position={{ lat: bar.latitude, lng: bar.longitude }}
              title={bar.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      <Button
        variant="contained"
        sx={{ mt: 3, backgroundColor: '#000', color: '#f5c000' }}
        onClick={() => navigate('/bars')}
      >
        Back to Bars List
      </Button>
    </Box>
  );
};

export default MapSearch;
