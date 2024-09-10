import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import useAxios from 'axios-hooks';
import useLocalStorageState from 'use-local-storage-state';
import SearchBar from './PageElements/searchbar';
import { Link } from 'react-router-dom'; // Importamos el componente Link de react-router-dom
import { CardActionArea } from '@mui/material'; // Importamos CardActionArea de Material UI


function Beers() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [keywordList, setKeywordList] = useLocalStorageState('BeerApp/Search/KeywordList', {
    defaultValue: []
  });

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `http://localhost:3001/api/v1/beers?query=${searchKeywords}`,
      method: 'GET'
    },
    { manual: true }
  );

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
    if (data && data.beers) {
      handleSearch();
    }
  }, [searchKeywords, data]);

  const handleInputChange = (event, newInputValue) => {
    setSearchKeywords(newInputValue);
  };

  const handleSearch = () => {
    if (searchKeywords) {
      const filteredBeers = data.beers.filter(beer =>
        beer.name.toLowerCase().includes(searchKeywords.toLowerCase())
      );
      setSearchResults(filteredBeers);
    } else {
      setSearchResults(data.beers);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
        Beers
      </Typography>
      <SearchBar
        searchKeywords={searchKeywords}
        setSearchKeywords={setSearchKeywords}
        keywordList={[]}
        label="Search Beers"
      />

      <Grid container spacing={3} sx={{ mt: 2, color:'#f5c000' }}>
        {Array.isArray(searchResults) && searchResults.map((beer) => (
          <Grid item xs={12} sm={6} md={4} key={beer.id}>
            {/* Aquí añadimos un Link para redirigir a los detalles */}
            <Link to={`/beers/${beer.id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{backgroundColor:'#f5c000'}}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {beer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Style: {beer.style}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
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

export default Beers;
