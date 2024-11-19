import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';
import Footer from '../../PageElements/Footer';
import * as SecureStore from 'expo-secure-store';

function EventsDetails() {
  const [event, setEvent] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState('');
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const { id: eventId, barId } = useRoute().params; // Include barId for gallery
  const navigation = useNavigation();

  useEffect(() => {
    fetchEventDetails();

    const fetchUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('user');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, [eventId, refresh]);

  useEffect(() => {
    if (currentUser) {
      fetchAttendance();
    }
  }, [currentUser]);

  const fetchEventDetails = () => {
    axiosInstance.get(`/events/${eventId}`)
      .then((res) => {
        setEvent(res.data.event);
      })
      .catch(() => {
        setError('Error fetching event details.');
      });
  };

  const fetchAttendance = () => {
    setLoading(true);
    axiosInstance.get(`/attendances`)
      .then((res) => {
        const AttendanceFiltered = res.data.find((a) => a.user_id === currentUser.id && a.event_id === eventId);
        setAttendance(AttendanceFiltered);
      })
      .catch(() => {
        setError('Error fetching attendance details.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheckIn = () => {
    axiosInstance.post(`/attendances`, { user_id: currentUser.id, event_id: eventId, checked_in: true })
      .then(() => {
        setCheckInSuccess('You have successfully checked in to the event!');
      })
      .catch(() => {
        setError('Error checking in to the event. Please try again.');
      })
      .finally(() => {
        setRefresh(refresh => !refresh);
      });
  };

  const handleCheckOut = () => {
    axiosInstance.delete(`/attendances/${attendance.id}`)
      .then(() => {
        setCheckInSuccess('You have successfully checked out of the event.');
      })
      .catch(() => {
        setError('Error checking out of the event. Please try again.');
      })
      .finally(() => {
        setRefresh(refresh => !refresh);
      });
  }

  const handleViewGallery = () => {
    navigation.navigate('EventsGallery', { barId: barId, eventId: eventId });
  };

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c000" />
        <Text style={styles.loadingText}>Checking in...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.details}>Date: {event.date ? event.date.split('T')[0] : 'Unknown'}</Text>
          <Text style={styles.details}>Description: {event.description || 'No description available'}</Text>
          <Text style={styles.details}>Start Date: {event.start_date ? event.start_date.split('T')[0] : 'N/A'}</Text>
          <Text style={styles.details}>End Date: {event.end_date ? event.end_date.split('T')[0] : 'N/A'}</Text>
        </View>

        {checkInSuccess ? <Text style={styles.success}>{checkInSuccess}</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {attendance ? 
        <>
        <Button
          title={loading ? 'Checking in...' : 'Check Out'}
          color="#f5c000"
          onPress={handleCheckOut}
          disabled={loading}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="View Gallery"
            color="#f5c000"
            onPress={handleViewGallery}
          />
        </View>
        </> : 
        <Button
          title={loading ? 'Checking in...' : 'Check In'}
          color="#f5c000"
          onPress={handleCheckIn}
          disabled={loading}
        />
      }

        

        {/* View Gallery Button */}
        
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E' },
  card: { backgroundColor: '#f5c000', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  details: { fontSize: 14, marginBottom: 5 },
  success: { color: 'green', marginBottom: 10, textAlign: 'center' },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' },
  loadingText: { marginTop: 10, color: '#f5c000' },
  buttonContainer: { marginTop: 20 }
});

export default EventsDetails;
