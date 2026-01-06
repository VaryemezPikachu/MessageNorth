import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>MessageNorth</Text>
      <Text style={styles.subtitle}>Güvenli sohbet alanına hoş geldin 💬✨</Text>

      <TouchableOpacity 
        style={styles.buttonPrimary}
        onPress={() => navigation.navigate("Chat")}
      >
        <Text style={styles.buttonText}>Sohbete Başla</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.buttonDanger}
        onPress={() => signOut(auth)}
      >
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1, 
    justifyContent:"center", 
    alignItems:"center", 
    paddingHorizontal:20,
    backgroundColor:"#2b2b2b",
  },

  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: "#bbbbbb",
    marginBottom: 40,
  },

  buttonPrimary: {
    backgroundColor: "limegreen",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#00ff62",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  buttonDanger: {
    backgroundColor: "crimson",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#ff1a4e",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  }
});
