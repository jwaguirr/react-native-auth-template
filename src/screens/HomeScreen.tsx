import { View, Text, Button } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export function HomeScreen() {
  const { logout, session } = useAuth();

  return (
    <View>
      <Text>Welcome {session?.user?.email}!</Text>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}