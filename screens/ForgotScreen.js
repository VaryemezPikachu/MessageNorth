import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function Forgot({ navigation }) {
  const [email, setEmail] = useState('');

  const handleForgot = () => {
    if (!email) {
      Alert.alert('Hooop ', 'Email boş olamaz!');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => Alert.alert('Şifre sıfırlama maili gönderildi!'))
      .catch((error) => Alert.alert('Hoooop', error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Şifremi Unuttum </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleForgot}>
        <Text style={styles.buttonText}>Sfırla </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Giriş Ekranına Dön </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1, 
    justifyContent:'center', 
    alignItems:'center', 
    backgroundColor:'#4e4d4dff', 
    paddingHorizontal:30 },
  title: { 
    fontSize:32, 
    fontWeight:'bold', 
    marginBottom:40, 
    color:'red' },
  input: { 
    width:'100%', 
    borderWidth:1, 
    borderColor:'#ccc', 
    borderRadius:25, 
    padding:15, 
    marginBottom:15, 
    backgroundColor:'#ffffffff' },
  button: { 
    width:'100%', 
    padding:15, 
    backgroundColor:'red', 
    borderRadius:25, 
    alignItems:'center', 
    marginTop:10 },
  buttonText: { 
    color:'#fff', 
    fontSize:16, 
    fontWeight:'bold' },
  link: { 
    color:'red', 
    fontWeight:'bold', 
    marginTop:15 },
});
