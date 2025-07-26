import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    // Simple validation - in real app, connect to backend
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // On successful login
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/app-icon.png')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Finance Buddy</Text>
      <Text style={styles.subtitle}>Secure your financial future</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.signupLink}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f9ff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#e74c3c',
    marginBottom: 15,
    textAlign: 'center',
  },
  signupLink: {
    marginTop: 20,
  },
  linkText: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;