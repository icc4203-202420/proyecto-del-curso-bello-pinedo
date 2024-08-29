import React, { useState } from 'react';
import { Box, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSearch();
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{color: '#f5c000'}} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ display: 'flex', width: '100%', justifyContent: 'center',
            '& .MuiInputBase-root': { color: '#f5c000' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f5c000' }, 
            '& .MuiInputBase-input': { color: '#f5c000' },
            '& .MuiInputAdornment-root': { color: '#f5c000' },
            '& .MuiInputAdornment-positionEnd': { color: '#f5c000' },
            '& .Mui': {color: '#f5c000'},
            '& .MuiIconButton-root': {color: '#f5c000'},
}}
      />
    </Box>
  );
}

export default SearchBar;
