import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axiosInstance from '../../PageElements/axiosInstance';

function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    const user = {"user": { email: email, password: password }};

    axiosInstance.post('/login', user)
      .then((response) => {
        setLoading(false);
        const token = response.data.token;  // Suponiendo que el backend te devuelve un token JWT
        // Guarda el token o usa alguna lógica para el inicio de sesión
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home');  // Navegar a la pantalla principal después del inicio de sesión
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Error', 'Invalid email or password');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#f5c000" />
      ) : (
        <Button title="Sign In" onPress={handleSignIn} />
      )}
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#1E1E1E', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#f5c000' },
  input: { backgroundColor: '#f5f5f5', padding: 10, borderRadius: 8, borderColor: '#ccc', borderWidth: 1, marginBottom: 20 },
  signUpText: { textAlign: 'center', marginTop: 20, color: '#f5c000' },
  signUpLink: { color: '#f5c000', fontWeight: 'bold' },
});

export default SignIn;
