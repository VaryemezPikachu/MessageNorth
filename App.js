import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import Forgot from './screens/ForgotScreen';
import Home from './screens/HomeScreen';
import Settings from './screens/Settings/SettingScreen';

import Chat from './screens/Chats/ChatScreen';
import MessageScreen from './screens/Chats/MessageScreen';
import UserList from './screens/Chats/UserListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Users" component={UserList} />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen name='Settings' component={Settings} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Forgot" component={Forgot} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
