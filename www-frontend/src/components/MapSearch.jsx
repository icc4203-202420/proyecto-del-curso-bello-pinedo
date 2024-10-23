import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';
import useLocalStorageState from 'use-local-storage-state';
import SearchBar from './PageElements/searchbar';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: -33.4489, // Latitud por defecto (Santiago, Chile)
  lng: -70.6693,
};

const MapSearch = () => {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [keywordList, setKeywordList] = useLocalStorageState('barApp/Search/KeywordList', {
    defaultValue: [],
  });

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: 'http://localhost:3001/api/v1/bars',
      method: 'GET',
    },
    { manual: true }
  );

  const navigate = useNavigate(); // Para navegación entre vistas
  const [searchResults, setSearchResults] = useState([]); // Para manejar los resultados filtrados
  const [center, setCenter] = useState(defaultCenter); // Centro del mapa

  // Fetch de los datos iniciales (bares)
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Guarda la búsqueda en localStorage si no está ya en la lista
  useEffect(() => {
    if (data && !keywordList.includes(searchKeywords) && searchKeywords) {
      setKeywordList([...keywordList, searchKeywords]);
    }
  }, [keywordList, data, searchKeywords, setKeywordList]);

  // Maneja la búsqueda de bares en tiempo real
  useEffect(() => {
    if (data && data.bars) {
      handleSearch();
    }
  }, [searchKeywords, data]);

  // Filtra los bares por nombre y actualiza los resultados
  const handleSearch = () => {
    if (searchKeywords) {
      const filteredBars = data.bars.filter((bar) =>
        bar.name.toLowerCase().includes(searchKeywords.toLowerCase())
      );
      setSearchResults(filteredBars);
      if (filteredBars.length > 0) {
        setCenter({
          lat: filteredBars[0].latitude,
          lng: filteredBars[0].longitude,
        });
      }
    } else {
      setSearchResults(data.bars);
    }
  };

  // Función para centrar el mapa en la ubicación inicial
  const handleCenterReset = () => {
    setCenter(defaultCenter);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
        Search Bars by Location
      </Typography>

      <SearchBar
        searchKeywords={searchKeywords}
        setSearchKeywords={setSearchKeywords}
        keywordList={[]}
        label="Search Bars"
      />

      <Button
        variant="contained"
        sx={{ mt: 3, backgroundColor: '#000', color: '#f5c000' }}
        onClick={handleCenterReset}
      >
        Center Map
      </Button>

      {loading && (
        <Typography variant="body1" margin="normal">
          Loading map...
        </Typography>
      )}

      {error && (
        <Typography variant="body1" color="error" margin="normal">
          Error loading map data.
        </Typography>
      )}

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {/* Renderiza los marcadores de los bares filtrados */}
          {searchResults.map((bar) => (
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
