import React, { useState, useEffect } from 'react';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

function Events() {
  const [bars, setBars] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch the list of bars when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/bars')
      .then(response => {
        setBars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the bars!', error);
      });
  }, []);

  // Fetch the events for the selected bar
  useEffect(() => {
    if (selectedBar) {
      axios.get(`http://localhost:3001/api/v1/bar/${selectedBar.id}/events`)
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the events!', error);
        });
    }
  }, [selectedBar]);

  return (
    <Box 
    sx={{p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(60vh )'}}
    >
      <Typography variant="h3" sx={{ color: '#f5c000', mb: 2 }}>
        Events
      </Typography>
      <Autocomplete
        options={bars}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setSelectedBar(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Select a Bar" variant="outlined" fullWidth margin="normal" />
        )}
        sx={{ mb: 2, width: '300px' }}
      />
      
      {events.length > 0 ? (
        events.map(event => (
          <Box key={event.id} sx={{ mb: 2 }}>
            <Typography variant="h5">{event.name}</Typography>
            <Typography>{event.description}</Typography>
            <Typography>{new Date(event.date).toLocaleString()}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No events found for the selected bar.
        </Typography>
      )}
    </Box>
  );
}

export default Events;