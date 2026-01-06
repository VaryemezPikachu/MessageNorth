import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Hiçbir alan boş bırakılamaz!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Şifreler uyuşmuyor!');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('HesabınızBaşarıyla Oluşturuldu'))
      .catch((error) => Alert.alert('Hoooop', error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Kayıt Ol</Text>

      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        placeholder="Tekrar Şifre"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Zaten Hesabın Var mı? Giriş Yap </Text>
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
