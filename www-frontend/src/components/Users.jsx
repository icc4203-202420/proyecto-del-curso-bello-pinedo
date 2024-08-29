import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Users() {
    return (
        <Box 
          sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(35vh )'}}
        >
          <Typography variant="h3" sx={{ color: '#f5c000', mb: 2 }}>
            Users
          </Typography>
        </Box>
      );
  }
  export default Users;