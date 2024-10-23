import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axiosInstance from '../../PageElements/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }

    if (password.length < 6) {
      newErrors.password = 'Invalid Password.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const user = { "user": { email: email, password: password } };

    try {
      const response = await axiosInstance.post('/login', user);
      setLoading(false);
      const userData = response.data.status.data.user;

      // Save user data to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Home');  // Navigate to home screen
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Invalid email or password');
    }
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
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

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
  error: { color: 'red', marginBottom: 10 },
});

export default SignIn;
