import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';

function EventsPictureDetails() {
  const route = useRoute();
  const { barId, eventId, pictureId } = route.params;
  const [picture, setPicture] = useState(null);
  const [users, setUsers] = useState([]);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPictureDetails();
    fetchUsers();
  }, [barId, eventId, pictureId]);

  const fetchPictureDetails = async () => {
    try {
      const response = await axiosInstance.get(`/bars/${barId}/events/${eventId}/images/${pictureId}`);
      if (response.data && response.data.url && response.data.user) {
        setPicture(response.data);
        setTaggedUsers(response.data.tags);
      } else {
        setError('Image details not found.');
      }
    } catch (error) {
      console.error('Error loading picture details:', error);
      setError('Error loading picture details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleTagUser = async () => {
    try {
      await axiosInstance.post(`/bars/${barId}/events/${eventId}/images/${pictureId}/tag_user`, {
        user_id: selectedUser,
      });
      setTaggedUsers([...taggedUsers, users.find((user) => user.id === selectedUser).handle]);
      setSelectedUser('');
    } catch (error) {
      console.error('Error tagging user:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c000" />
        <Text>Loading picture details...</Text>
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {picture && (
        <>
          <Image
            source={{ uri: picture.url }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.uploadedBy}>Uploaded by: {picture.user.name}</Text>

          <View style={styles.tagsContainer}>
            <Text style={styles.tagTitle}>Tagged Users:</Text>
            {taggedUsers.map((handle, index) => (
              <Text key={index} style={styles.taggedUser}>@{handle}</Text>
            ))}
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedUser}
              onValueChange={(itemValue) => setSelectedUser(itemValue)}
            >
              <Picker.Item label="Select User" value="" />
              {users.map((user) => (
                <Picker.Item key={user.id} label={user.handle} value={user.id} />
              ))}
            </Picker>
            <Button title="Tag User" onPress={handleTagUser} disabled={!selectedUser} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#1E1E1E' },
  image: { width: '80%', height: 300, borderRadius: 8, marginBottom: 20 },
  uploadedBy: { fontSize: 16, color: '#f5c000', marginBottom: 10 },
  tagsContainer: { marginTop: 20 },
  tagTitle: { fontSize: 16, fontWeight: 'bold', color: '#f5c000' },
  taggedUser: { fontSize: 14, color: '#FFF' },
  pickerContainer: { width: '80%', marginTop: 20, backgroundColor: '#FFF', borderRadius: 8 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, marginTop: 20 },
});

export default EventsPictureDetails;
