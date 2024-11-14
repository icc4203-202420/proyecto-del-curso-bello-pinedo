import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../PageElements/axiosInstance';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance.get('/feed')
      .then(response => {
        if (response.data && response.data.posts) {
          setPosts(response.data.posts);
        }
      })
      .catch(error => {
        console.error('Error fetching feed:', error);
      });

    const socket = new WebSocket('ws://your-backend-url/ws/feed');

    socket.onmessage = (event) => {
      const newPost = JSON.parse(event.data);
      setPosts(prevPosts => [newPost, ...prevPosts]); // Agregar nueva publicación al inicio
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close(); // Cerrar el socket cuando el componente se desmonte
    };
  }, []);

  return (
    <FeedContext.Provider value={{ posts }}>
      {children}
    </FeedContext.Provider>
  );
};
