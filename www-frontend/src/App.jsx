import { useState } from 'react';
import beerLogo from './assets/beer icon.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import './App.css';

function App() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#f5c000' }}> {/* Navigation Bar Color */}
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}> {/* Box for logo and title */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img src={beerLogo} alt="logo" style={{ width: '30px', height: '30px' }} />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ color: 'black' }}>
              BeerMark
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(15vh )' }}> {/* Centered Content */}
        <Typography variant="h3" sx={{ color: '#f5c000' }}>
          BeerMark<br />
          <Typography variant="h5" sx={{ color: 'grey' }}>
            A place for beer
          </Typography>
        </Typography>
      </Box>

      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#f5c000' }} // Yellow bar
      >
        <BottomNavigationAction 
          label="Home" 
          icon={<HomeIcon />} 
          sx={{
            color: '#000', // Black icons
            '&.Mui-selected': {
              color: '#f5c000', // Yellow color for selected icon
              backgroundColor: '#000', // Black background for selected
              borderRadius: '100%'
            }
          }}
        />
        <BottomNavigationAction 
          label="Beers" 
          icon={<SportsBarIcon />} 
          sx={{
            color: '#000', 
            '&.Mui-selected': {
              color: '#f5c000',
              backgroundColor: '#000',
              borderRadius: '100%'
            }
          }}
        />
        <BottomNavigationAction 
          label="Bars" 
          icon={<StoreIcon />} 
          sx={{
            color: '#000', 
            '&.Mui-selected': {
              color: '#f5c000',
              height: '100%',
              width: '100%',
              backgroundColor: '#000',
              borderRadius: '100%'
            }
          }}
        />
        <BottomNavigationAction 
          label="Events" 
          icon={<EventIcon />} 
          sx={{
            color: '#000', 
            '&.Mui-selected': {
              color: '#f5c000',
              backgroundColor: '#000',
              borderRadius: '100%'
            }
          }}
        />
        <BottomNavigationAction 
          label="Users" 
          icon={<PersonIcon />} 
          sx={{
            color: '#000', 
            '&.Mui-selected': {
              color: '#f5c000',
              height: '100%',
              width: '100%',
              backgroundColor: '#000',
              borderRadius: '100%'
            }
          }}
        />
      </BottomNavigation>
      </Box>
    </Box>
  );
}

export default App;
