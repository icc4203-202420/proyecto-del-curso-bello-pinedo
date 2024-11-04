import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import axiosInstance from '../../PageElements/axiosInstance';
import { useNavigation, useRoute } from '@react-navigation/native';

function EventPictureUpload() {
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { id: eventId, barId } = route.params;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const pickImage = () => {
    if (typeof launchImageLibrary !== 'function') {
      Alert.alert('Error', 'Image picker is not available. Please try again.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.error('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', 'Could not pick the image. Please try again.');
        } else {
          // Successful selection
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  const handleUpload = async () => {
    if (!imageUri) {
      Alert.alert('Please select an image');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'event_image.jpg',
      type: 'image/jpeg',
    });
    formData.append('description', description);
    if (selectedUser) formData.append('tag_user_id', selectedUser);

    try {
      const response = await axiosInstance.post(`/bars/${barId}/events/${eventId}/images`, formData, {
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
      console.error('Upload error:', err);
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
