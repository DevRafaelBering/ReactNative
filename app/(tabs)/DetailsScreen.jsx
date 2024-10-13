import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const DetailsScreen = ({ route }) => {
  const { item } = route.params; // Obter o item passado pela navegação

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title || item.name}</Text>
      <Text style={styles.overview}>{item.overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  overview: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default DetailsScreen;
