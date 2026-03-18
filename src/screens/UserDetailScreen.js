import { ScrollView, StyleSheet, Text, View } from "react-native";

const UserDetailScreen = ({ route }) => {
  const { user } = route.params;

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
};

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
});

export default UserDetailScreen;