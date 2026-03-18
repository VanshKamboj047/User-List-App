import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Loader from "../src/components/Loader";
import { fetchUsers } from "../src/services/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company?: { name: string };
  address: { street: string; suite: string; city: string; zipcode: string };
}

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUsers();
        const selectedUser = data.find((u: User) => u.id.toString() === (id as string));
        setUser(selectedUser || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  if (loading) return <Loader />;

  if (!user) return <Text style={styles.notFound}>User not found</Text>;

  const fullAddress = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.item}>Email: {user.email}</Text>
        <Text style={styles.item}>Phone: {user.phone}</Text>
        <Text style={styles.item}>Website: {user.website}</Text>
        <Text style={styles.item}>Company: {user.company?.name}</Text>
        <Text style={styles.item}>Address: {fullAddress}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  notFound: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#666",
  },
});

