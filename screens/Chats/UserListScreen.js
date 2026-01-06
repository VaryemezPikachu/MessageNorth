import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../../firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));

      const list = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.id !== auth.currentUser.uid);

      setUsers(list);
    };

    fetchUsers();
  }, []);

  const openChat = async (otherUserId) => {
    const currentUserId = auth.currentUser.uid;

    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", currentUserId)
    );

    const snapshot = await getDocs(q);

    let chatId = null;

    snapshot.forEach(doc => {
      const members = doc.data().members;
      if (members.includes(otherUserId)) {
        chatId = doc.id;
      }
    });

    if (!chatId) {
      const newChat = await addDoc(collection(db, "chats"), {
        members: [currentUserId, otherUserId],
        createdAt: new Date()
      });

      chatId = newChat.id;
    }

    navigation.navigate("MessageScreen", { chatId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openChat(item.id)}
      style={{
        padding: 15,
        backgroundColor: "#eee",
        marginVertical: 5,
        borderRadius: 10
      }}
    >
      <Text style={{ fontSize: 16 }}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
