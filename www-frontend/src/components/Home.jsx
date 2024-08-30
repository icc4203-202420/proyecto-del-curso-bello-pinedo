import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid2 } from '@mui/material';

function Home() {
  return (
    <Box sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(35vh )'}}>
      <Typography variant="h3" sx={{ margin: 'right', color: '#f5c000' }}>
        BeerMark
      </Typography>
      <Typography variant="h5" sx={{ color: 'grey', mb: 4 }}>
        A place for beer
      </Typography>
    </Box>
  );
}

export default Home;
