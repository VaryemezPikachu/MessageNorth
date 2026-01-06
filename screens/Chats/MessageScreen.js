import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { auth, db } from '../../firebase';
import { collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessageScreen({ route, navigation }) {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(data);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: auth.currentUser.uid,
      text,
      createdAt: new Date(),
    });

    setText("");
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.message,
        item.senderId === auth.currentUser.uid ? styles.myMessage : styles.theirMessage
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Topluluk Sohbeti</Text>

        {/* sağda ikon yoksa boş bırakıyoruz */}
        <View style={{ width: 32 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{ padding: 10 }}
          />
        </View>

        <View style={styles.inputArea}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Mesaj yaz…"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Gönder</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },

  message: {
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
    borderRadius: 10
  },

  myMessage: {
    backgroundColor: "#4ADE80",
    alignSelf: "flex-end",
  },
  
  theirMessage: {
    backgroundColor: "#ddd",
    alignSelf: "flex-start",
  },

  messageText: {
    fontSize: 16,
  },

  inputArea: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc"
  },

  input: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginRight: 10
  },

  sendButton: {
    backgroundColor: "#4ADE80",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 10
  },
});
