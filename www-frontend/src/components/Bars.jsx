import React, { useState, useEffect } from 'react';
import { Box, Typography, Autocomplete, TextField, List, ListItem, ListItemText } from '@mui/material';
import useAxios from 'axios-hooks';
import useLocalStorageState from 'use-local-storage-state';

function Bars() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [keywordList, setKeywordList] = useLocalStorageState('barApp/Search/KeywordList', {
    defaultValue: []
  });

  // Hook de Axios para realizar la búsqueda cuando se cambian las palabras clave
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: 'http://localhost:3001/api/v1/bars',
      method: 'GET'
    },
    { manual: true } // Esto evita que se ejecute automáticamente al cargar el componente
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Efecto para guardar la nueva búsqueda en el localStorage
  useEffect(() => {
    if (data && !keywordList.includes(searchKeywords)) {
      setKeywordList([...keywordList, searchKeywords]);
    }
  }, [keywordList, data, searchKeywords, setKeywordList]);

  // Función para manejar el cambio en el campo de texto
  const handleInputChange = (event, newInputValue) => {
    setSearchKeywords(newInputValue);
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (searchKeywords) {
      const filteredbars = data.bars.filter(bar =>
        bar.name.toLowerCase().includes(searchKeywords.toLowerCase())
      );
      setSearchResults(filteredbars);
    } else {
      setSearchResults(data.bars);
    }
  };

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (data && data.bars) {
      setSearchResults(data.bars);
    }
  }, [data]);

  return (
    <Box 
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',  // Centers items horizontally
        justifyContent: 'center',  // Centers items vertically
        minHeight: '100vh',  // Ensures the Box takes full viewport height
        textAlign: 'center',  // Centers text inside the Box
      }}
    >
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2 }}>
        bars
      </Typography>
      <Autocomplete
        freeSolo
        options={keywordList}
        value={searchKeywords}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label="Search bars" variant="outlined" fullWidth margin="normal" />
        )}
      />
      <List>
        {Array.isArray(searchResults) && searchResults.map((bar) => (
          <ListItem key={bar.id}>
            <ListItemText primary={bar.name} />
          </ListItem>
        ))}
      </List>

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