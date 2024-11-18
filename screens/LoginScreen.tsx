import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { clients } from '../util/courseList';
import { styles } from '../util/styles';

interface LoginScreenProps {
  onLogin: (user: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.mainLogo}
        />
        <Text style={styles.brandName}>Gourmet</Text>
        <Text style={styles.slogan}>MAESTRO</Text>
      </View>
      <View style={styles.buttonContainer}>
        {clients.map((client) => (
          <TouchableOpacity
            key={client}
            style={styles.loginButton}
            onPress={() => onLogin(client)}
          >
            <Text style={styles.buttonText}>{client}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};