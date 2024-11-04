import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import axiosInstance from '../../PageElements/axiosInstance';

function EventsGallery() {
  const { barId, eventId } = useRoute().params; 
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch images for the event
    axiosInstance.get(`/bars/${barId}/events/${eventId}/images`)
      .then((res) => {
        setImages(res.data.images || []);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error loading images.');
        setLoading(false);
      });
  }, [barId, eventId]);

  const handleImageClick = (pictureId) => {
    navigation.navigate('EventsPictureDetails', { barId, eventId, pictureId });
  };

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/events/${eventId}/generate_summary`);
      setVideoUrl(response.data.video_url);
      Alert.alert('Success', 'Video summary created successfully!');
    } catch (error) {
      console.error('Error generating video summary:', error);
      Alert.alert('Error', 'There was an issue generating the video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f5c000" />
          <Text style={styles.loadingText}>Loading images...</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && images.length === 0 && (
        <Text style={styles.noImagesText}>No images found for this event.</Text>
      )}

      {!loading && images.length > 0 && (
        <View style={styles.imagesContainer}>
          {images.map((image) => (
            <TouchableOpacity key={image.id} style={styles.imageWrapper} onPress={() => handleImageClick(image.id)}>
              <Image source={{ uri: image.url }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Upload Photos"
          color="#f5c000"
          onPress={() => navigation.navigate('EventsPictureUpload', { barId, eventId })}
        />
      </View>

      <View style={styles.buttonContainer}>
        {videoUrl ? (
          <Button
            title="View Summary Video"
            onPress={() => {
              navigation.navigate('VideoPlayer', { videoUrl }); // Navigates to a video player screen if you want
            }}
          />
        ) : (
          <Button
            title="Generate Summary"
            onPress={handleGenerateSummary}
            disabled={loading}
            color="#f5c000"
          />
        )}
      </View>

      {videoUrl && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            style={styles.video}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#1E1E1E', justifyContent: 'center' },
  loadingContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  loadingText: { marginTop: 10, color: '#f5c000' },
  errorText: { color: 'red', textAlign: 'center' },
  noImagesText: { color: '#f5c000', textAlign: 'center', marginVertical: 20 },
  imagesContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  imageWrapper: { width: 100, height: 100, margin: 5, borderRadius: 8, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  buttonContainer: { marginVertical: 10, alignItems: 'center' },
  videoContainer: { alignItems: 'center', marginVertical: 20 },
  video: { width: 300, height: 200 },
});

export default EventsGallery;
