import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';
import Footer from '../../PageElements/Footer';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FriendDetails() {
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [events, setEvents] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [loading, setLoading] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState('');
  const [error, setError] = useState('');
  const { id } = useRoute().params;
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserDetails();
    fetchEvents();

    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setCurrentUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const fetchUserDetails = () => {
    axiosInstance.get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setError('Error fetching event details.');
      });
  };

  const fetchEvents = () => {
    axiosInstance.get(`/events`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch(() => {
        setError('Error fetching event details.');
      });
  };

  const handleAdd = () => {
    setLoading(true);
    axiosInstance.post(`/friendships`, { user_id: currentUser.id ,friend_id: id, event_id: selectedEvent })
      .then(() => {
        setCheckInSuccess('You have successfully checked in to the event!');
        notifyFriends();
      })
      .catch(() => {
        setError('Error adding friend. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!user) {
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
            <Text style={styles.title}>{user.handle}</Text>
            <Text style={styles.details}>Name: {user.first_name} {user.last_name}</Text>
            <Text style={styles.details}>Email: {user.email}</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.details}>Where did you meet?</Text>
            <Picker
                selectedValue={selectedEvent}
                onValueChange={(itemValue) => setSelectedEvent(itemValue)}
            >
                <Picker.Item label="Select an event" value="" />
                {events.map((event) => (
                <Picker.Item key={event.id} label={event.name} value={event.id} />
                ))}
            </Picker>

        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          title={loading ? 'Checking in...' : 'Add Friend'}
          color="#f5c000"
          onPress={handleAdd}
          disabled={loading}
        />
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
});

export default FriendDetails;
