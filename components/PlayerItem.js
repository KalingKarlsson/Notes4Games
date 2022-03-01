import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
const PlayerItem = (props) => {
  return (
    <TouchableWithoutFeedback style={styles.playerItem}>
      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.rank]}>{props.rank}</Text>
        <Text style={[styles.text, styles.playerName]}>{props.playerName}</Text>
        <Text style={[styles.text, styles.totalScore]}>{props.totalScore}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  playerItem: {
    alignItems: "center",
  },
  infoContainer: {
    width: 260,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  rank: {
    width: 80,
  },
  playerName: {
    width: 100,
  },
  totalScore: {
    width: 80,
  },
});

export default PlayerItem;
