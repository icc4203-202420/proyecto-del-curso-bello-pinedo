import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import useAxios from 'axios-hooks';
import useLocalStorageState from 'use-local-storage-state';
import SearchBar from './PageElements/searchbar';
import { Link } from 'react-router-dom'; // Importamos el componente Link de react-router-dom
import { CardActionArea } from '@mui/material'; // Importamos CardActionArea de Material UI


function Users() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const currentUser = useLocalStorageState('currentUser', {
    defaultValue: {}
  });
  const [keywordList, setKeywordList] = useLocalStorageState('BeerApp/Search/KeywordList', {
    defaultValue: []
  });

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `http://localhost:3001/api/v1/users?query=${searchKeywords}`,
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
    if (data) {
      handleSearch();
    }
  }, [searchKeywords, data]);

  const handleInputChange = (event, newInputValue) => {
    setSearchKeywords(newInputValue);
  };

  const handleSearch = () => {
    if (searchKeywords) {
      const filteredBeers = data.filter(user =>
        user.handle.toLowerCase().includes(searchKeywords.toLowerCase())
      );
      setSearchResults(filteredBeers);
    } else {
      setSearchResults(data);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
        Users
      </Typography>
      <SearchBar
        searchKeywords={searchKeywords}
        setSearchKeywords={setSearchKeywords}
        keywordList={[]}
        label="Search Users"
      />

      <Grid container spacing={3} sx={{ mt: 2, color:'#f5c000' }}>
        {Array.isArray(searchResults) && searchResults.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{backgroundColor:'#f5c000' , transition: 'background-color 0.3s ease', '&:hover':{backgroundColor: '#e0b002'}}}>
                <CardActionArea>
                  <CardContent>
                    {user.id === currentUser[0].id ? (
                      <Typography variant="h6" component="div">
                        {user.handle} (You)
                      </Typography>
                    ) : (
                      <Typography variant="h6" component="div">
                        {user.handle}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      Name: {user.first_name} {user.last_name}
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

export default Users;
