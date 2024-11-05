import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button, MenuItem, Select } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';

function EventPictureDetails() {
  const { id, pictureId } = useParams();
  const [picture, setPicture] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    axiosInstance.get(`/bars/1/events/${id}/images/${pictureId}`)
      .then((res) => {
        if (res.data && res.data.url && res.data.user) {
          setPicture(res.data);
          setTaggedUsers(res.data.tags);
        } else {
          setError('Image details not found.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading picture details:', error);
        setError('Error loading picture details.');
        setLoading(false);
      });
  }, [id, pictureId]);

  useEffect(() => {
    axiosInstance.get('/users') // Suponiendo que esta ruta retorna todos los usuarios
      .then((res) => setUsers(res.data))
      .catch((error) => console.error('Error loading users:', error));
  }, []);

  const handleTagUser = () => {
    axiosInstance.post(`/bars/1/events/${id}/images/${pictureId}/tag_user`, { user_id: selectedUser })
      .then(() => {
        setTaggedUsers([...taggedUsers, users.find(user => user.id === selectedUser).handle]);
        setSelectedUser('');
      })
      .catch((error) => {
        console.error('Error tagging user:', error);
      });
  };

  return (
    <Box sx={{ padding: '100px', textAlign: 'center' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Loading picture details...</Typography>
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error" margin="normal">{error}</Typography>
      ) : (
        picture && (
          <>
            <img
              src={picture.url}
              alt={`Event image ${picture.id}`}
              style={{ width: '40%', height: 'auto', borderRadius: '8px' }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Uploaded by: {picture.user.name}
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Tagged Users:</Typography>
              {taggedUsers.map((handle, index) => (
                <Typography key={index} variant="body1">{`@${handle}`}</Typography>
              ))}
            </Box>

            {/* Sección para etiquetar usuarios */}
            <Box sx={{ mt: 3 }}>
              <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                displayEmpty
                sx={{ minWidth: 200, mr: 2,backgroundColor: '#FFFFFF', color: '#000' }}
              >
                <MenuItem value="" disabled>Select User</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.handle}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#f5c000', color: '#000' }}
                onClick={handleTagUser}
                disabled={!selectedUser}
              >
                Tag User
              </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Link to={`/events/${id}/gallery`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
                  Back to Event Gallery
                </Button>
              </Link>
            </Box>
          </>
        )
      )}
    </Box>
  );
}

export default EventPictureDetails;
