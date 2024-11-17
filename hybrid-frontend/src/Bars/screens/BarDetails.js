import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axiosInstance from '../../PageElements/axiosInstance';
import Footer from '../../PageElements/Footer';

function BarDetails() {
  const [bar, setBar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { params } = useRoute();
  const { barId } = params;

  useEffect(() => {
    console.log('Bar ID:', barId); 
    fetchBarDetails();
  }, [barId]);

  const fetchBarDetails = async () => {
    try {
      const response = await axiosInstance.get(`/bars/${barId}`);
      console.log('API Response:', response.data);
      setBar(response.data); 
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bar details:', err);
      setError('Error fetching bar details.');
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f5c000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!bar) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Bar not found.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{bar.name || 'Bar desconocido'}</Text>
          <Text style={styles.details}>Latitude: {bar.latitude ? bar.latitude.toFixed(6) : 'No disponible'}</Text>
          <Text style={styles.details}>Longitude: {bar.longitude ? bar.longitude.toFixed(6) : 'No disponible'}</Text>
          <Text style={styles.details}>Address: {bar.address.line1} {bar.address.line2}</Text>
          <Text style={styles.details}>City: {bar.address.city}</Text>
          <Text style={styles.details}>Counry: {bar.address.country.name}</Text>
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E' },
  card: { backgroundColor: '#f5c000', padding: 20, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#000' },
  details: { fontSize: 16, marginBottom: 5, color: '#000' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' },
  loadingText: { marginTop: 10, color: '#f5c000' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E1E' },
  errorText: { color: 'red', fontSize: 18 },
});

export default BarDetails;
