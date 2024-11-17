import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { FeedContext } from '../../contexts/FeedContext';
import Footer from '../../PageElements/Footer';
import { useNavigation } from '@react-navigation/native';

function FeedScreen() {
  const { reviews, setFilter } = useContext(FeedContext); // Incluye setFilter del contexto
  const [currentFilter, setCurrentFilter] = useState(null);
  const navigation = useNavigation();

  const renderReviewItem = ({ item }) => (
    <TouchableOpacity
      style={styles.reviewCard}
      onPress={() => navigation.navigate('BeerDetails', { id: item.beer_id })} // Navegación al detalle de la cerveza
    >
      <Text style={styles.reviewHeader}>
        {item.userName || 'Usuario desconocido'} comentó en {item.beerName || 'Cerveza desconocida'}:
      </Text>
      <Text style={styles.reviewText}>"{item.text}"</Text>
      <Text style={styles.reviewRating}>Nota: {item.rating}</Text>
      <Text style={styles.reviewDate}>{new Date(item.created_at).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  const handleFilterChange = (type, value) => {
    setCurrentFilter({ type, value });
    setFilter({ type, value });
  };

  const clearFilter = () => {
    setCurrentFilter(null);
    setFilter(null);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Text style={styles.filterHeader}>Filtrar por:</Text>
          <View style={styles.filterButtons}>
            <Button
              title="Amistad: Amigo1"
              onPress={() => handleFilterChange('friend', 'Amigo1')}
            />
            <Button
              title="Bar: Bar XYZ"
              onPress={() => handleFilterChange('bar', 'Bar XYZ')}
            />
            <Button
              title="País: Chile"
              onPress={() => handleFilterChange('country', 'Chile')}
            />
            <Button
              title="Cerveza: Cerveza ABC"
              onPress={() => handleFilterChange('beer', 'Cerveza ABC')}
            />
          </View>
          {currentFilter && (
            <Button title="Quitar Filtro" onPress={clearFilter} color="red" />
          )}
        </View>
        {reviews.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#f5c000" />
            <Text style={styles.loadingText}>Cargando comentarios...</Text>
          </View>
        ) : (
          <FlatList
            data={reviews}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text style={styles.noReviews}>No hay comentarios aún.</Text>}
          />
        )}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#1E1E1E',
  },
  filterContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5c000',
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: '#f5c000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  reviewText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    fontStyle: 'italic',
  },
  reviewRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#555',
    marginTop: 10,
    textAlign: 'right',
  },
  noReviews: {
    textAlign: 'center',
    marginTop: 20,
    color: '#f5c000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#f5c000',
  },
});

export default FeedScreen;
