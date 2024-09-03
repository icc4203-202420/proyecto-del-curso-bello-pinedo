import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import beerLogo from './assets/beer icon.png';
import { AppBar, Box, Toolbar, Typography, IconButton, BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import { Home as HomeIcon, Store as StoreIcon, Event as EventIcon, Person as PersonIcon, SportsBar as SportsBarIcon } from '@mui/icons-material';

import Home from './components/Home';
import Bars from './components/Bars';
import Beers from './components/Beers';
import Users from './components/Users';
import Events from './components/Events';
import SignupForm from './components/Signup';
import LoginForm from './components/Login';

function App() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/beers');
        break;
      case 2:
        navigate('/bars');
        break;
      case 3:
        navigate('/events');
        break;
      case 4:
        navigate('/login');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#f5c000' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img src={beerLogo} alt="logo" style={{ width: '30px', height: '30px' }} />
        </IconButton>
        <Typography variant="h5" component="div" sx={{ color: 'black', flexGrow: 1 }}>
          BeerMark
        </Typography>
        <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
      </Toolbar>
    </AppBar>

      {/* Main content area */}
      <Box className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bars" element={<Bars />} />
          <Route path="/beers" element={<Beers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Box>


      <BottomNavigation
        value={value}
        onChange={handleNavigationChange}
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          backgroundColor: '#f5c000',
          boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{
            color: '#000',
            '&.Mui-selected': {
              color: '#f5c000',
              backgroundColor: '#000',
            },
            '&:hover:not(.Mui-selected)': {
              backgroundColor: '#e0b002',
            },
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
            },
            '&:hover:not(.Mui-selected)': {
              backgroundColor: '#e0b002',
            },
          }}
        />
        <BottomNavigationAction
          label="Bars"
          icon={<StoreIcon />}
          sx={{
            color: '#000',
            '&.Mui-selected': {
              color: '#f5c000',
              backgroundColor: '#000',
            },
            '&:hover:not(.Mui-selected)': {
              backgroundColor: '#e0b002',
            },
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
            },
            '&:hover:not(.Mui-selected)': {
              backgroundColor: '#e0b002',
            },
          }}
        />
        <BottomNavigationAction
          label="Users"
          icon={<PersonIcon />}
          sx={{
            color: '#000',
            '&.Mui-selected': {
              color: '#f5c000',
              backgroundColor: '#000',
            },
            '&:hover:not(.Mui-selected)': {
              backgroundColor: '#e0b002',
            },
          }}
        />
      </BottomNavigation>
    </>
  );
}

export default App;
