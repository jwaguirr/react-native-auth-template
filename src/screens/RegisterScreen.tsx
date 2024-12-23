import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, registerError } = useAuth();

  const handleRegister = () => {
    register({ email, password });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button 
        title="Go to Login" 
        onPress={() => navigation.navigate('Login')} 
      />
      {registerError && (
        <Text>{(registerError as Error).message}</Text>
      )}
    </View>
  );
}