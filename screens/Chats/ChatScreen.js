import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Image,  
  Platform, 
  StatusBar 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Ionicons } from '@expo/vector-icons';

export default function Chat({ navigation }) {
  const [chats, setChats] = useState([]);

  const topPadding = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    
    const q = query(
      collection(db, "chats"),
      where("users", "array-contains", uid)
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const loaded = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(loaded);
    });

    return unsubscribe;
  }, []);

  const openChat = (chatId) => {
    navigation.navigate('Message', { chatId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => openChat(item.id)}
      activeOpacity={0.7}
    >
      <Image source={require('../../assets/MessageNorth.png')} style={styles.avatar} />

      <View style={styles.chatContent}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name || "Bilinmeyen Kullanıcı"}</Text>

          <Text style={styles.time}>
            {item.lastMessageTime 
              ? new Date(item.lastMessageTime.seconds * 1000).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                }) 
              : ""}
          </Text>
        </View>

        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage || 'Henüz mesaj yok'}
        </Text>
      </View>

      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: topPadding, backgroundColor: '#6942c2ff' }}>

      {/* HEADER */}
      <View style={styles.header}>
        
        {/* SOL PROFİL FOTO */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/MuzafferDaldal.jpg')}
            style={styles.headerProfile}
          />
        </TouchableOpacity>

        {/* ORTA BAŞLIK */}
        <Text style={styles.headerTitle}>Sohbetler</Text>

        {/* SAĞ AYARLAR */}
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={30} color="#333" />
        </TouchableOpacity>

      </View>

      {/* CHAT LIST */}
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#6942c2ff' }}>
            Henüz sohbet yok
          </Text>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Users')}
        activeOpacity={0.7}
      >
        <Ionicons name="chatbubbles" size={28} color="#fff" />
      </TouchableOpacity>

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
    backgroundColor: '#afafafff',
    borderBottomWidth: 1,
    borderColor: '#afafafff',
  },

  headerProfile: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#88ff00',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },

  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#afafafff',
    borderRadius: 18,
    marginBottom: 14,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#afafafff',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: '#555',
    backgroundColor: '#afafafff',
  },

  chatContent: {
    flex: 1,
    marginLeft: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },

  lastMessage: {
    marginTop: 6,
    fontSize: 14,
    color: '#7b7b7b',
  },

  time: {
    fontSize: 12,
    color: '#b3b3b3',
    fontWeight: '500',
  },

  unreadBadge: {
    backgroundColor: '#2bff00ff',
    borderRadius: 18,
    paddingHorizontal: 10,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  unreadText: {
    color: '#ff0000ff',
    fontWeight: '700',
    fontSize: 13,
  },

  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 35 : 20,
    right: 25,
    backgroundColor: '#88ff00ff',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  }
});
