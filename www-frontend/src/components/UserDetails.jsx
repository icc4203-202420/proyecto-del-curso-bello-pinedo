import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import axiosInstance from './PageElements/axiosInstance';
import { Box, Card, CardContent, Typography, Grid, Button, TextField } from '@mui/material';

function UserDetails() {
  const [user, setUser] = useState(null); 
  const [friends, setFriends] = useState([])
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [render, setRender] = useState(false);
  const { id } = useParams();
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchData = async () => {
        console.log(currentUser.id)
        try {
            const [userRes, friendsRes] = await Promise.all([
                axiosInstance.get(`/users/${id}`),
                axiosInstance.get(`/friendships`,{ params: { user_id: currentUser.id } })
                
            ]);

            setUser(userRes.data);
            setFriends(friendsRes.data);
            
        } catch (error) {
            console.error(error);
        } finally {
            setRender(true);
            console.log(friends)
        }
    };

    fetchData();
}, [id]);

  const handleSubmit = () => {
    // Validate the comment and rating
    if (!currentUser) {
      setError('You must be logged in to submit a review.');
      return;
    }
    
    axiosInstance.post(`/friendships`, {
      user_id: currentUser.id,
      friend_id: id
    })
      .then(() => {
        setSuccess('Review submitted successfully!');
      })
      .catch((error) => {
        setError('Error submitting the review. Please try again.');
        console.error('Error submitting review:', error);
      });
  };

  if (!render){
    return <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>
  }

  return (
    <>
      {user ? (
        <Box key={user.id} sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>

          <Card sx={{ backgroundColor: '#f5c000' }}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ color: '#000' }}>
                {user.handle}
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: '#000' }}>
                {user.first_name} {user.last_name}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Email:</strong> {user.email || 'Unknown'}
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: '#000' }}>
                    <strong>Age:</strong> {user.age || 'Unknown'}
                </Typography>
                </Grid>
                
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Card sx={{ backgroundColor: '#f5c000' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#000', mb: 1 }}>
                  Add Friend
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ backgroundColor: '#000', color: '#f5c000', mt: 2 }}
                >
                  Add
                </Button>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to="/users" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
                Back to Users List
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" sx={{ color: '#fff' }}>Loading...</Typography>
      )}
    </>
  );
}

export default UserDetails;
