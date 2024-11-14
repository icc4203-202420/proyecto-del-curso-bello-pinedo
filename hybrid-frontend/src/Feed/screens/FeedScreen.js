import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FeedContext } from '../../contexts/FeedContext';
import Footer from '../../PageElements/Footer'; // Asegúrate de importar Footer

function FeedScreen() {
  const { posts } = useContext(FeedContext);

  const renderPostItem = ({ item }) => (
    <View style={styles.postCard}>
      <Text style={styles.postUser}>{item.userName}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postDate}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.noPosts}>No posts yet.</Text>}
        />
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // Añade espacio inferior para el Footer
    backgroundColor: '#1E1E1E',
  },
  postCard: {
    backgroundColor: '#f5c000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  postContent: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  postDate: {
    fontSize: 12,
    color: '#555',
    marginTop: 10,
    textAlign: 'right',
  },
  noPosts: {
    textAlign: 'center',
    marginTop: 20,
    color: '#f5c000',
  },
});

export default FeedScreen;
