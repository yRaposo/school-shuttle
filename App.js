import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext, AuthContextProvider } from './contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import PublicRoutes from './screens/Routes/PublicRoutes';
import PrivateRoutes from './screens/Routes/PrivateRoutes';

export default function App() {
  return (
    <AuthContextProvider>

      <NavigationContainer>
        <Routes />
      </NavigationContainer>

    </AuthContextProvider>
  );
}

function Routes() {
  const { token } = useContext(AuthContext);
  return token ? <PrivateRoutes /> : <PublicRoutes />;
}
