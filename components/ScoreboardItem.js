import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import Colors from "../constants/Colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

const ScoreboardItem = (props) => {
  const { t } = useTranslation();

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={props.handleDelete}>
        <View style={styles.deleteBox}>
          <Animated.Text
            style={{
              transform: [{ scale: scale }],
              fontSize: 20,
              color: Colors.white,
              textAlign: "center",
              width: "100%"
            }}
          >
            {t("delete")}
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightSwipe} onSwipeableRightOpen={() => {}}>
      <TouchableOpacity onPress={props.onSelect} style={styles.scoreboardItem}>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, { width: "10%" }]}>{props.id}</Text>
          <Text style={[styles.text, { width: "50%" }]}>{props.title}</Text>
          <Text style={[styles.text, { width: "30%" }]}>{props.date}</Text>
          <Ionicons style={{ width: "10%", textAlign: "center" }} name="chevron-forward" size={18} color={Colors.black} />
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  scoreboardItem: {
    paddingVertical: 12,
    marginVertical: 2,
    alignItems: "center",
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  deleteBox: {
    backgroundColor: Colors.cancel,
    justifyContent: "center",
    alignItems: Platform.OS === "ios" ? "baseline" : "center",
    flex: 1,
    width: Platform.OS === "android" ? 75 : 85,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
});

export default ScoreboardItem;
