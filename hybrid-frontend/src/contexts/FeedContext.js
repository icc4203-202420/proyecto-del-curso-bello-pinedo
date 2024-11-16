import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../PageElements/axiosInstance';
import * as SecureStore from 'expo-secure-store';
import useWebSocket from 'react-use-websocket';
import config from '../config/config'; // Importa configuración

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Configura el WebSocket
  const { lastMessage, sendMessage } = useWebSocket(config.WS_BASE_URL, { // Usa la URL del archivo config.js
    onOpen: () => console.log('Connected to WebSocket'),
    onClose: () => console.log('Disconnected from WebSocket'),
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const loadFeedData = async () => {
      try {
        // Obtener el usuario actual desde SecureStore
        const storedUser = await SecureStore.getItemAsync('user');
        if (!storedUser) {
          console.error('No user data found in storage.');
          return;
        }
        const user = JSON.parse(storedUser);
        setCurrentUserId(user.id);

        // Obtener amistades del usuario actual
        console.log(`Fetching friendships for user ${user.id}...`);
        const friendshipsResponse = await axiosInstance.get('/friendships', {
          params: { user_id: user.id },
        });
        const friendIds = friendshipsResponse.data.friendships.map(
          (friendship) => friendship.friend_id
        );

        // Obtener todas las reseñas
        console.log('Fetching all reviews...');
        const reviewsResponse = await axiosInstance.get('/reviews');
        const allReviews = reviewsResponse.data.reviews;

        // Filtrar reseñas de amigos
        const filteredReviews = await Promise.all(
          allReviews
            .filter((review) => friendIds.includes(review.user_id))
            .map(async (review) => {
              const userName = await fetchUserName(review.user_id);
              const beerName = await fetchBeerName(review.beer_id);
              return { ...review, userName, beerName };
            })
        );

        console.log('Filtered reviews:', filteredReviews);
        setReviews(filteredReviews);
      } catch (error) {
        console.error('Error loading feed data:', error);
      }
    };

    loadFeedData();
  }, []);

  useEffect(() => {
    // Escuchar mensajes del WebSocket
    if (lastMessage !== null) {
      try {
        const data = JSON.parse(lastMessage.data);

        if (data.type === 'ping') return; // Ignorar mensajes de tipo ping

        if (data.message && data.message.review) {
          // Nueva reseña recibida desde el servidor
          const newReview = data.message.review;

          // Obtener el nombre de usuario y de la cerveza
          fetchUserName(newReview.user_id).then((userName) => {
            fetchBeerName(newReview.beer_id).then((beerName) => {
              const updatedReview = { ...newReview, userName, beerName };

              // Agregar la nueva reseña al feed
              setReviews((prevReviews) => [updatedReview, ...prevReviews]);
            });
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    }
  }, [lastMessage]);

  const fetchUserName = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);
      const { first_name, last_name } = response.data;
      return `${first_name} ${last_name}`;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return 'Usuario desconocido';
    }
  };

  const fetchBeerName = async (beerId) => {
    try {
      const response = await axiosInstance.get(`/beers/${beerId}`);
      return response.data.name || 'Cerveza desconocida';
    } catch (error) {
      console.error(`Error fetching beer ${beerId}:`, error);
      return 'Cerveza desconocida';
    }
  };

  return (
    <FeedContext.Provider value={{ reviews }}>
      {children}
    </FeedContext.Provider>
  );
};
