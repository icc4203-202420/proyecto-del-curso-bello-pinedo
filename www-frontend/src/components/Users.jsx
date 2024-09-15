import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchBar from './PageElements/searchbar'; // Import the SearchBar component

function Users() {
    return (
        <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '70px'}}>
          <Typography variant="h3" sx={{ color: '#f5c000', mb: 2, textAlign: 'center'}}>
            Users
          </Typography>

          {/* Add the SearchBar component without functionality */}
          <SearchBar 
            searchKeywords="" // Empty string since no functionality is needed
            setSearchKeywords={() => {}} // No-op function since no functionality is needed
            keywordList={[]} // Empty list since no functionality is needed
            label="Search Users" // Custom label for the Users page
          />

        </Box>
      );
}

export default Users;
