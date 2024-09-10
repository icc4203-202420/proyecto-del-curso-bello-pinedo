import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';
import useLocalStorageState from 'use-local-storage-state';
import SearchBar from './PageElements/searchbar';

function Bars() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [keywordList, setKeywordList] = useLocalStorageState('barApp/Search/KeywordList', {
    defaultValue: []
  });

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: 'http://localhost:3001/api/v1/bars',
      method: 'GET'
    },
    { manual: true }
  );

  const navigate = useNavigate(); // Añadimos la funcionalidad de navegación

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data && !keywordList.includes(searchKeywords) && searchKeywords) {
      setKeywordList([...keywordList, searchKeywords]);
    }
  }, [keywordList, data, searchKeywords, setKeywordList]);

  useEffect(() => {
    if (data && data.bars) {
      handleSearch();
    }
  }, [searchKeywords, data]);

  const handleInputChange = (event, newInputValue) => {
    setSearchKeywords(newInputValue);
  };

  const handleSearch = () => {
    if (searchKeywords) {
      const filteredBars = data.bars.filter(bar =>
        bar.name.toLowerCase().includes(searchKeywords.toLowerCase())
      );
      setSearchResults(filteredBars);
    } else {
      setSearchResults(data.bars);
    }
  };

  // Añadimos un botón que navega al mapa
  const goToMap = () => {
    navigate('/map');
  };

  const goToBarDetails = (barId) => {
    navigate(`/bars/${barId}`);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
        Bars
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
        onClick={goToMap}
      >
        Search Bars by Map
      </Button>

      <Grid container spacing={3} sx={{ mt: 2, color:'#f5c000' }}>
        {Array.isArray(searchResults) && searchResults.map((bar) => (
          <Grid item xs={12} sm={6} md={4} key={bar.id}>
            <Card sx={{ backgroundColor: '#f5c000' }} onClick={() => goToBarDetails(bar.id)}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {bar.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Latitude: {bar.latitude}<br/>
                  Longitude: {bar.longitude} 
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Typography variant="body1" margin="normal">
          Loading data...
        </Typography>
      )}

      {error && (
        <Typography variant="body1" color="error" margin="normal">
          Error loading data.
        </Typography>
      )}
    </Box>
  );
}

export default Bars;
