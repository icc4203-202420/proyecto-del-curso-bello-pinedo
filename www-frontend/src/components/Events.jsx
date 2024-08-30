import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import SearchBar from './PageElements/searchbar';

function Events() {
  const [bars, setBars] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/bars')
      .then(response => {
        setBars(response.data.bars);
      })
      .catch(error => {
        console.error('There was an error fetching the bars!', error);
      });
  }, []);

  useEffect(() => {
    if (selectedBar) {
      axios.get(`http://localhost:3001/api/v1/bars/${selectedBar.id}/events`)
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the events!', error);
        });
    }
  }, [selectedBar]);

  const handleSearch = () => {
    if (searchKeywords && events.length > 0) {
      const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchKeywords.toLowerCase())
      );
      setEvents(filteredEvents);
    } else if (selectedBar) {
      axios.get(`http://localhost:3001/api/v1/bars/${selectedBar.id}/events`)
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the events!', error);
        });
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '70px' }}>
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2, textAlign: 'center' }}>
        Events
      </Typography>

      {bars.length > 0 && (
        <Autocomplete
          options={bars}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setSelectedBar(newValue)}
          renderInput={(params) => (
            <TextField
              label="Select a Bar"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#f5c000', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#e0b002',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f5c000',
                  },
                  backgroundColor: '#1a1a1a', 
                  color: '#f5c000',
                },
                '& .MuiInputLabel-root': {
                  color: '#f5c000', 
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#e0b002', 
                },
              }}
            />
          )}
        />
      )}

      {events.length > 0 ? (
        <Grid container spacing={3} sx={{ mt: 2, color: '#f5c000' }}>
          {Array.isArray(events) && events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ backgroundColor: '#f5c000' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(event.date).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', width: '100%' }}>
          No events found for the selected bar.
        </Typography>
      )}
    </Box>
  );
}

export default Events;
