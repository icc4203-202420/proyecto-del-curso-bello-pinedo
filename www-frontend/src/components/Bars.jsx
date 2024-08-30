import React, { useState, useEffect } from 'react';
import { Box, Typography, Autocomplete, TextField, List, ListItem, ListItemText } from '@mui/material';
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

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (data && !keywordList.includes(searchKeywords)) {
      setKeywordList([...keywordList, searchKeywords]);
    }
  }, [keywordList, data, searchKeywords, setKeywordList]);

  const handleInputChange = (event, newInputValue) => {
    setSearchKeywords(newInputValue);
  };

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
    <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
        Bars
      </Typography>
      <SearchBar
        searchKeywords={searchKeywords}
        setSearchKeywords={setSearchKeywords}
        keywordList={keywordList}
        label="Search Bars"
      />
      <List sx={{ mt: 2 }}>
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
