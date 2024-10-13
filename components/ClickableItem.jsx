// components/ClickableItem.jsx
import React from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const ClickableItem = ({ title, imageUrl, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1, // Muda a opacidade quando pressionado
        },
        styles.itemContainer,
      ]}
    >
      <ThemedView>
        <ThemedText>{title}</ThemedText>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
  },
});

export default ClickableItem;
