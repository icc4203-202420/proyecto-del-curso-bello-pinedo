import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av';
import axiosInstance from '../../PageElements/axiosInstance';

function EventsGallery() {
  const { barId, eventId } = useRoute().params; 
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [noImagesAvailable, setNoImagesAvailable] = useState(false);
  const navigation = useNavigation();

  const getBaseURL = () => {
    return axiosInstance.defaults.baseURL.replace(/\/api.*/, '');
  };
  

  useEffect(() => {
    fetchGallery();
  }, [barId, eventId]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/bars/${barId}/events/${eventId}/images`);
      const galleryData = res.data.images || [];
  
      // Dynamically get the base URL for the video file
      const videoUrl = `${getBaseURL()}/events/${eventId}/summary_video.mp4`;
      if (galleryData.length > 0 || res.data.video_url) {
        galleryData.push({ type: 'video', url: videoUrl });
        setNoImagesAvailable(false);
      } else {
        setNoImagesAvailable(true); // Set this if there are no images
      }
  
      console.log("Gallery data with video:", galleryData);
      setGallery(galleryData);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setError('Error loading gallery.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/bars/${barId}/events/${eventId}/generate_summary`);
      Alert.alert('Success', 'Video summary created successfully!');
      fetchGallery();  // Refresh the gallery after video generation
    } catch (error) {
      console.error('Error generating video summary:', error);
      Alert.alert('Error', 'There was an issue generating the video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (id) => {
    navigation.navigate('EventsPictureDetails', { barId, eventId, pictureId: id });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f5c000" />
          <Text style={styles.loadingText}>Loading gallery...</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && noImagesAvailable && (
        <Text style={styles.noImagesText}>No images available for this event.</Text>
      )}

      {!loading && !error && gallery.length === 0 && (
        <Text style={styles.noImagesText}>No images or videos found for this event.</Text>
      )}

      {!loading && gallery.length > 0 && (
        <View style={styles.imagesContainer}>
          {gallery.map((item, index) => (
            item.url ? (
              item.type === 'video' ? (
                <View key={index} style={styles.videoWrapper}>
                  <Video
                    source={{ uri: item.url }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    useNativeControls
                    style={styles.video}
                  />
                </View>
              ) : (
                <TouchableOpacity key={index} style={styles.imageWrapper} onPress={() => handleImageClick(item.id)}>
                  <Image source={{ uri: item.url }} style={styles.image} />
                </TouchableOpacity>
              )
            ) : (
              <Text key={index} style={styles.errorText}>Invalid item in gallery</Text>
            )
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
        <Button
          title="Generate Summary Video"
          onPress={handleGenerateSummary}
          disabled={loading}
          color="#f5c000"
        />
      </View>
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
  videoWrapper: { width: 300, height: 200, marginVertical: 10 },
  video: { width: '100%', height: '100%' },
  buttonContainer: { marginVertical: 10, alignItems: 'center' },
});

export default EventsGallery;
