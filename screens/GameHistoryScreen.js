import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import PlayerItem from "../components/PlayerItem";
import Colors from "../constants/Colors";

const GameHistoryScreen = (props) => {
  const { t } = useTranslation();

  const gameData = JSON.parse(props.navigation.getParam("scoreboardScores"));

  const scores = gameData.map((player, index) => {
    return (
      <PlayerItem
        key={index.toString() + player.playerName}
        rank={index + 1}
        playerName={player.playerName}
        totalScore={player.totalScore}
      />
    );
  });

  return (
    <View style={styles.screen}>
      <View style={styles.headline}>
        <Text style={styles.title}>{props.navigation.getParam("scoreboardTitle")}</Text>
        <Text style={styles.title}>{props.navigation.getParam("scoreboardDate")}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.scoresHeader}>
          <Text style={styles.scores}>{t("rank")}</Text>
          <Text style={[styles.scores, {width: 100}]}>{t("player")}</Text>
          <Text style={styles.scores}>{t("score")}</Text>
        </View>
        {scores}
      </View>
    </View>
  );
};

GameHistoryScreen.navigationOptions = () => {
  return {
    headerTitle: "Notes4Games",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  headline: {
    justifyContent: "space-evenly",
    width: "85%",
    flexDirection: "row",
    paddingVertical: 24,
    marginVertical: 24,
    backgroundColor: Colors.white,
    //ios
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    //android
    elevation: 4,

    //border
    borderRadius: 8,
  },
  body: {
    width: "85%",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    //ios
    shadowColor: Colors.black,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    //android
    elevation: 4,
  },
  scores: {
    fontSize: 18,
    width: 80,
    textAlign: "center",
  },
  scoresHeader: {
    width: 260,
    flexDirection: "row",
    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
  },
});

export default GameHistoryScreen;
