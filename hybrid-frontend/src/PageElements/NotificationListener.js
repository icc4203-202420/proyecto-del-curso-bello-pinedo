import { useEffect } from 'react';
import ActionCable from 'actioncable';

function NotificationListener({ userId, onNotification }) {
  useEffect(() => {
    // Conecta con el servidor WebSocket
    const cable = ActionCable.createConsumer('wss://your-app-url/cable');

    // Suscribe al canal de notificaciones
    const channel = cable.subscriptions.create(
      { channel: 'NotificationsChannel', user_id: userId },
      {
        received(data) {
          console.log('New notification received:', data);
          if (onNotification) {
            onNotification(data); // Llama la función para manejar notificaciones
          }
        },
      }
    );

    // Limpia la suscripción cuando el componente se desmonta
    return () => {
      channel.unsubscribe();
    };
  }, [userId, onNotification]);

  return null; // Este componente no renderiza nada en pantalla
}

export default NotificationListener;
