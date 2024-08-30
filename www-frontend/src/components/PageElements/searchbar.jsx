import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

function SearchBar({ searchKeywords, setSearchKeywords, keywordList, label }) { // Add label as a prop
  const handleInputChange = (event, newInputValue) => {
    setSearchKeywords(newInputValue);
  };

  return (
    <Autocomplete
      freeSolo
      options={keywordList}
      value={searchKeywords}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label} // Use the dynamic label prop here
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#f5c000', // Border color
              },
              '&:hover fieldset': {
                borderColor: '#e0b002', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#f5c000', // Border color when focused
              },
              backgroundColor: '#1a1a1a', // Background color
              color: '#f5c000', // Text color
            },
            '& .MuiInputLabel-root': {
              color: '#f5c000', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#e0b002', // Label color when focused
            },
          }}
        />
      )}
    />
  );
}

export default SearchBar;
