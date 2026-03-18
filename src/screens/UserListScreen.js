import { useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { fetchUsers } from "../services/api";

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setError("");
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadUsers();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={handleSearch} />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() => navigation.navigate("UserDetail", { user: item })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !error && <Text style={styles.empty}>No users found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default UserListScreen;