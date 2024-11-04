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
  const [error, setError] = useState('');
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
  }, [eventId]);

  const fetchEventDetails = () => {
    axiosInstance.get(`/events/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch(() => {
        setError('Error fetching event details.');
      });
  };

  const handleCheckIn = () => {
    setLoading(true);
    axiosInstance.post(`/attendances`, { user_id: currentUser.id, event_id: eventId, checked_in: true })
      .then(() => {
        setCheckInSuccess('You have successfully checked in to the event!');
        notifyFriends();
      })
      .catch(() => {
        setError('Error checking in to the event. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const notifyFriends = () => {
    axiosInstance.post(`/users/${currentUser.id}/notify-friends`, {
      event_id: eventId,
      message: `${currentUser.name} has checked in to the event: ${event.name}`
    })
    .catch(() => {
      console.error('Error notifying friends about check-in.');
    });
  };

  const handleViewGallery = () => {
    navigation.navigate('EventsGallery', { barId, eventId });
  };

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c000" />
        <Text style={styles.loadingText}>Loading...</Text>
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

        <Button
          title={loading ? 'Checking in...' : 'Check In'}
          color="#1E1E1E"
          onPress={handleCheckIn}
          disabled={loading}
        />

        {/* View Gallery Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="View Gallery"
            color="#f5c000"
            onPress={handleViewGallery}
          />
        </View>
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E' },
  card: { backgroundColor: '#f5c000', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  details: { fontSize: 14, marginBottom: 5 },
  success: { color: 'green', marginBottom: 10, textAlign: 'center' },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' },
  loadingText: { marginTop: 10, color: '#f5c000' },
  buttonContainer: { marginTop: 20 }
});

export default EventsDetails;
