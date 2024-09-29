import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';
import { Box, Card, CardContent, Typography, Grid, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function UserDetails() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const storedUser = localStorage.getItem('currentUser');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, friendsRes, eventsRes] = await Promise.all([
          axiosInstance.get(`/users/${id}`),
          axiosInstance.get(`/friendships`, { params: { user_id: currentUser.id } }),
          axiosInstance.get("/events")
        ]);

        setUser(userRes.data);
        setFriends(friendsRes.data.friendships);
        setEvents(eventsRes.data)
        setIsFollowing(friendsRes.data.friendships.some(friend => friend.friend_id === parseInt(id)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentUser.id, refresh]);

  const handleFollow = async () => {
    try {
      if (selectedEvent){
        await axiosInstance.post(`/friendships`, { user_id: currentUser.id, friend_id: parseInt(id), bar_id: selectedEvent.bar_id });
        setIsFollowing(true);
      }
      else {
        await axiosInstance.post(`/friendships`, { user_id: currentUser.id, friend_id: parseInt(id) });
        setIsFollowing(true);
      }
      
    } catch (error) {
      console.error('Failed to follow user:', error);
    } finally {
      setRefresh(!refresh);
    }
  };

  const handleUnfollow = async () => {
    const friendship = friends.find(friend => friend.friend_id === parseInt(id));
    if (!friendship) return;

    try {
      await axiosInstance.delete(`/friendships/${friendship.id}`);
      setIsFollowing(false);
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    } finally {
      setRefresh(!refresh);
    }
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ color: '#fff', ml: 2 }}>Loading...</Typography>
        </Box>
      ) : (
        user && (
          <Box key={user.id} sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
            <Card sx={{ backgroundColor: '#f5c000', '&:hover': '#e0b002' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" component="div" sx={{ color: '#000' }}>
                    {user.first_name} {user.last_name}
                    {isFollowing ? (
                      <CheckCircleIcon sx={{ color: '#000', marginLeft: 1 }} />
                    ) : (
                      <CancelIcon sx={{ color: '#000', marginLeft: 1 }} />
                    )}
                  </Typography>
                  {!isFollowing ? (
                   <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                   <Button variant="contained" sx={{ backgroundColor: '#000', color: '#f5c000', mb: 2,  }} onClick={handleFollow}>
                     Follow
                   </Button>
                    <Typography variant="body1" sx={{ color: '#000' }}><strong>Select Event:</strong></Typography>
                   {/* Event Selector */}
                   
                   <FormControl fullWidth>
                     <InputLabel id="event-selector-label">Event</InputLabel>
                     <Select
                       labelId="event-selector-label"
                       value={selectedEvent}
                       onChange={handleEventChange}
                       sx={{ backgroundColor: '#fff', mb: 2 }}
                     >
                       <MenuItem value="">
                         <em>None</em>
                       </MenuItem>
                       {events.map(event => (
                         <MenuItem key={event.id} value={event}>{event.name}</MenuItem>
                       ))}
                     </Select>
                   </FormControl>
                 </Box>

                  ) : (
                    <Button variant="contained" sx={{ backgroundColor: '#000', color: '#f5c000' }} onClick={handleUnfollow}>
                      Unfollow
                    </Button>
                  )}
                </Box>
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
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: '#000' }}>
                      <strong>Friends Count:</strong> {friends.length}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Link to="/users" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
                  Back to Users List
                </Button>
              </Link>
            </Box>
          </Box>
        )
      )}
    </>
  );
}

export default UserDetails;
