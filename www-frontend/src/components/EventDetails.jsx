import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from './PageElements/axiosInstance';
import { Box, Card, CardContent, Typography, Grid, Button, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function EventDetails() {
  const [event, setEvent] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Fetch event details
    axiosInstance.get(`/events/${id}`)
      .then((res) => {
        if (res.data && res.data.event) {
          setEvent(res.data.event);
        } else {
          setEvent(res.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
      }
    );

    // Fetch attendance details
    axiosInstance.get(`/events/${id}/attendances`, { params: { "user_id": currentUser.id } })
      .then((res) => {
        setAttendance(res.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching attendance:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, refresh]);

  const handleAttend = () => {
    if (attendance) {
      axiosInstance.put(`/attendances/${attendance.id}`, { "user_id": currentUser.id, "event_id":id , "checked_in": true })
        .then((res) => {
          setAttendance(res.data.attendance);
        })
        .catch((error) => {
          console.error('Error updating attendance:', error);
        })
        .finally(() => {
            setRefresh(!refresh);
        });
    } else {
      axiosInstance.post(`/attendances`, { "user_id": currentUser.id, "event_id": id, "checked_in": true })
        .then((res) => {
          setAttendance(res.data.attendance);
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            alert('You are already attending this event.');
          } else {
            console.error('Error posting attendance:', error);
          }
        })
        .finally(() => {
            setRefresh(!refresh);
        });
    }
  };

    const handleAttendCancel = () => {
    axiosInstance.put(`/attendances/${attendance.id}`, { "user_id": currentUser.id, "event_id": id, "checked_in": false })
        .then((res) => {
            setAttendance(res.data.attendance);
        })
        .catch((error) => {
            console.error('Error updating attendance:', error);
        })
        .finally(() => {
            setRefresh(!refresh);
        });
    };

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ color: '#fff', ml: 2 }}>Loading...</Typography>
        </Box>
      ) : (
        event && (
          <Box key={event.id} sx={{ width: '100%', maxWidth: '600px', margin: '0 auto', padding: '70px' }}>
            <Card sx={{ backgroundColor: '#f5c000', '&:hover': '#e0b002' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" component="div" sx={{ color: '#000' }}>
                    {event.name}
                    {(attendance && attendance.checked_in === true) ? (
                      <CheckCircleIcon sx={{ color: '#000', marginLeft: 1 }} />
                    ) : (
                      <CancelIcon sx={{ color: '#000', marginLeft: 1 }} />
                    )}
                  </Typography>
                  {!attendance || (attendance && attendance.checked_in === false) ? (
                    <Button variant="contained" sx={{ backgroundColor: '#000', color: '#f5c000' }} onClick={handleAttend}>
                      Attend
                    </Button>
                  ) : (
                    <Button variant="contained" sx={{ backgroundColor: '#000', color: '#f5c000' }} onClick={handleAttendCancel}>
                      Cancel
                    </Button>
                  )}
                </Box>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: '#000' }}>
                      <strong>Description:</strong> {event.description || 'Unknown'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: '#000' }}>
                      <strong>Start Date:</strong> {event.start_date || 'Unknown'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" sx={{ color: '#000' }}>
                      <strong>End Date:</strong> {event.end_date || 'Unknown'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={{ backgroundColor: '#f5c000', color: '#000' }}>
                  Back to events List
                </Button>
              </Link>
            </Box>
          </Box>
        )
      )}
    </>
  );
}

export default EventDetails;
