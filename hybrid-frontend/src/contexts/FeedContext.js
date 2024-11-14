// src/contexts/FeedContext.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Cargar reseñas iniciales de cervezas
    axios.get('https://b091-181-42-46-50.ngrok-free.app/api/v1/reviews')
      .then(async response => {
        if (response.data && response.data.reviews) {
          const reviewsWithNames = await Promise.all(
            response.data.reviews.map(async (review) => {
              const userName = await fetchUserName(review.user_id);
              const beerName = await fetchBeerName(review.beer_id);
              return { ...review, userName, beerName };
            })
          );
          setReviews(reviewsWithNames);
        }
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  // Función para obtener el nombre de usuario
  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`https://b091-181-42-46-50.ngrok-free.app/api/v1/users/${userId}`);
      const { first_name, last_name, handle } = response.data;
      return `${first_name} ${last_name}` || handle || 'Usuario desconocido';
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      return 'Usuario desconocido';
    }
  };

  // Función para obtener el nombre de la cerveza
  const fetchBeerName = async (beerId) => {
    try {
      const response = await axios.get(`https://b091-181-42-46-50.ngrok-free.app/api/v1/beers/${beerId}`);
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
