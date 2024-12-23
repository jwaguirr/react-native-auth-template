import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginError, isLoggingIn } = useAuth();

  const handleLogin = () => {
    login(
      { email, password },
      {
        onSuccess: () => {
          console.log('Login successful');
        },
        onError: (error) => {
          console.error('Login failed:', error);
        }
      }
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        title={isLoggingIn ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={isLoggingIn}
      />
      {loginError && (
        <Text style={{ color: 'red' }}>
          {loginError instanceof Error ? loginError.message : 'Login failed'}
        </Text>
      )}
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
