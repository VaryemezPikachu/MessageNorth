import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Hoşgeldiniz Efendim'))
      .catch((error) => Alert.alert('Hooop', error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> MessageNorth </Text>
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        keyboardType="email-address" 
      />
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} secureTextEntry />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Hesap Oluştur</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.link}>Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ 
    flex:1, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#5e5b5bff', 
    paddingHorizontal:30 },
  title:{ 
    fontSize:32, 
    fontWeight:'bold', 
    marginBottom:40, 
    color:'red' },
  input:{ 
    width:'100%', 
    borderWidth:1, 
    borderColor:'#ccc', 
    borderRadius:25, 
    padding:15, 
    marginBottom:15, 
    backgroundColor:'#ffffffff' },
  button:{ 
    width:'100%', 
    padding:15, 
    backgroundColor:'red', 
    borderRadius:25, 
    alignItems:'center', 
    marginTop:10 },
  buttonText:{ 
    color:'#fff', 
    fontSize:16, 
    fontWeight:'bold' },
  bottomContainer:{ 
    flexDirection:'row', 
    justifyContent:'space-between', 
    width:'100%', 
    marginTop:20 },
  link:{ 
    color:'red', 
    fontWeight:'bold' },
});
