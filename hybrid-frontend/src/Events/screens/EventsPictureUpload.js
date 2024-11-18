import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Image, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axiosInstance from '../../PageElements/axiosInstance';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';

function EventPictureUpload() {
  const [imageUri, setImageUri] = useState(null);
  const [event, setEvent] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params;

  useEffect(() => {
    fetchUsers();
    fetchEventDetails();
    requestPermissions();  // Request permissions for iOS
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need permission to access your photos to upload images.');
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const getUserIdFromSecureStore = async () => {
    try {
      const userData = await SecureStore.getItemAsync('user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData.id; // Cambia `id` si el campo tiene un nombre diferente
      }
      return null;
    } catch (err) {
      console.error('Error retrieving user data from SecureStore:', err);
      return null;
    }
  };

  const fetchEventDetails = async () => {
    try {
      const response = await axiosInstance.get(`/events/${eventId}`);
      setEvent(response.data.event);
    } catch (err) {
      console.error('Error fetching event details:', err);
    }
  };

  const pickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    } else {
      console.log('User cancelled image picker');
    }
  };
  
  

  const handleUpload = async () => {
    if (!imageUri) {
      Alert.alert('Please select an image');
      return;
    }
  
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const userId = await getUserIdFromSecureStore();
      if (!userId) {
        setError('User not authenticated. Please log in again.');
        setLoading(false);
        return;
      }
  
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'event_image.jpg',
        type: 'image/jpeg',
      });
      formData.append('description', description);
      formData.append('user_id', userId); 
      if (selectedUser) formData.append('tag_user_id', selectedUser);
  
      const response = await axiosInstance.post(`/bars/${event.bar_id}/events/${eventId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        setSuccess('Image uploaded successfully!');
        setTimeout(() => navigation.navigate('EventsGallery', { eventId }), 1500);
      }
    } catch (err) {
      setError('Error uploading image. Please try again.');
      console.error('Upload error:', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a Picture for the Event</Text>

      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TextInput
        style={styles.input}
        placeholder="Add a description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Tag a User:</Text>
      <Picker
        selectedValue={selectedUser}
        onValueChange={(itemValue) => setSelectedUser(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select User" value="" />
        {users.map((user) => (
          <Picker.Item key={user.id} label={user.handle} value={user.id} />
        ))}
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color="#f5c000" />
      ) : (
        <Button title="Upload Photo" onPress={handleUpload} color="#f5c000" />
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#f5c000', marginBottom: 20 },
  input: { width: '100%', backgroundColor: '#fff', padding: 10, marginVertical: 15, borderRadius: 8 },
  label: { fontSize: 16, color: '#f5c000', marginVertical: 10 },
  picker: { width: '100%', backgroundColor: '#fff', marginBottom: 20, borderRadius: 8 },
  image: { width: 200, height: 200, marginTop: 15, borderRadius: 8 },
  error: { color: 'red', marginTop: 10 },
  success: { color: 'green', marginTop: 10 },
});

export default EventPictureUpload;
