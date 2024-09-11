import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import beerLogo from './assets/beer icon.png';
import { AppBar, Box, Toolbar, Typography, IconButton, BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import { Home as HomeIcon, Store as StoreIcon, Event as EventIcon, Person as PersonIcon, SportsBar as SportsBarIcon } from '@mui/icons-material';

import Home from './components/Home';
import Bars from './components/Bars';
import BarDetails from './components/BarDetails';
import MapSearch from './components/MapSearch';
import Beers from './components/Beers';
import Users from './components/Users';
import Events from './components/Events';
import SignupForm from './components/Signup';
import LoginForm from './components/Login';
import BeerDetails from './components/BeerDetails';
import BeerBars from './components/BeerBars';
import axiosInstance from './components/PageElements/axiosInstance';
import EventDetails from './components/EventDetails';

function App() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    axiosInstance.get('/users')
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('There was an error fetching the user!', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/login');
  };

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
        if (currentUser) {
          navigate('/users');
        } else {
          navigate('/login');
        }
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
          {currentUser ? (
            <Button color="inherit" onClick={handleLogout}><Typography color='black'>Log out</Typography></Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/signup')}><Typography color='black'>Sign Up</Typography></Button>
              <Button color="inherit" onClick={() => navigate('/login')}><Typography color='black'>Log in</Typography></Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bars" element={<Bars />} />
          <Route path="/bars/:id" element={<BarDetails />} /> 
          <Route path="/map" element={<MapSearch />} />
          <Route path="/beers" element={<Beers />} />
          <Route path="/beers/:id" element={<BeerDetails />} />
          <Route path="/beer/:id/bars" element={<BeerBars users={users} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser}/>} />

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
            transition: 'background-color 0.3s ease',
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
              transition: 'background-color 0.3s ease',
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
            transition: 'background-color 0.3s ease',
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
            transition: 'background-color 0.3s ease',
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
            transition: 'background-color 0.3s ease',
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
