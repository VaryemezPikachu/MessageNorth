import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Expo içinde var

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Ayarlar</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="person-outline" size={22} />
          <Text style={styles.label}>Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="notifications-outline" size={22} />
          <Text style={styles.label}>Bildirimler</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="color-palette-outline" size={22} />
          <Text style={styles.label}>Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="lock-closed-outline" size={22} />
          <Text style={styles.label}>Gizlilik</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="log-out-outline" size={22} />
          <Text style={[styles.label, { color: "red" }]}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    gap: 15,
  },
  label: {
    fontSize: 17,
  },
});
 