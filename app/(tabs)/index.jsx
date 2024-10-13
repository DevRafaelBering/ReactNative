// HomeScreen.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import ClickableItem from "@/components/ClickableItem";

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [tvTop, setTvTop] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [moviesResponse, seriesResponse, tvTopResponse] =
          await Promise.all([
            axios.get("https://api.themoviedb.org/3/movie/popular", {
              params: { api_key: "e6e7ec51c94f1b387d581a393008e486" },
            }),
            axios.get("https://api.themoviedb.org/3/tv/popular", {
              params: { api_key: "e6e7ec51c94f1b387d581a393008e486" },
            }),
            axios.get("https://api.themoviedb.org/3/tv/top_rated", {
              params: { api_key: "e6e7ec51c94f1b387d581a393008e486" },
            }),
          ]);
        setMovies(moviesResponse.data.results);
        setSeries(seriesResponse.data.results);
        setTvTop(tvTopResponse.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderMovieItem = ({ item }) => (
    <ClickableItem
      title={item.title}
      imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
      onPress={() => console.log("Movie clicked:", item.title)}
    />
  );

  const renderSeriesItem = ({ item }) => (
    <ClickableItem
      title={item.name}
      imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
      onPress={() => console.log("Series clicked:", item.name)}
    />
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ParallaxScrollView
      headerHeight={500}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/john-wick.jpg")}
          style={styles.mainImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Pressable style={styles.buttone}>
          <ThemedText>Play</ThemedText>
        </Pressable>
        <Pressable style={styles.buttwo}>
          <ThemedText>Details</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Trending Now</ThemedText>
        <FlatList
          horizontal
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Popular Series</ThemedText>
        <FlatList
          horizontal
          data={series}
          renderItem={renderSeriesItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Top Rated TV Shows</ThemedText>
        <FlatList
          horizontal
          data={tvTop}
          renderItem={renderSeriesItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  mainImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  buttone: {
    backgroundColor: "#545454",
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  buttwo: {
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  list: {
    paddingBottom: 8,
  },
});
