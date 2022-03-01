import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TextInput, Platform, Keyboard, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import styles from "./ScoresScreen.style";
import { CalcSum } from "./ScoresScreen.logic";
import CustomButton from "../../components/CustomButton";
import FinalScoresDialog from "../../components/FinalScores";
import Colors from "../../constants/Colors";

import * as scoreboardsActions from "../../store/actions/scoreboard-actions";

const ScoresScreen = ({ navigation }) => {
  const game = navigation.state.params;
  const [gameData, setGameData] = useState(game);
  const [currentRound, setCurrentRound] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [finalScores, setFinalScores] = useState();
  const [wasIconPressed, setIconPressed] = useState(false);
  const { t } = useTranslation();

  const refInput = React.useRef([]);

  const dispatch = useDispatch();

  let playersNames = game.players.map((player) => {
    return player.playerName;
  });

  const handleChange = (event) => {
    const { score, index } = event;
    setGameData((prevState) => {
      prevState.players[index].score[currentRound - 1] = score;
      return { players: prevState.players };
    });
  };

  const onBackPress = () => {
    if (currentRound !== 1) {
      setCurrentRound(currentRound - 1);
    }
    if (currentRound === 2) {
      setIsDisabled(true);
    }
    Keyboard.dismiss();
  };

  const onNextPress = () => {
    Keyboard.dismiss();
    setCurrentRound(currentRound + 1);
    setIsDisabled(false);
  };

  const checkScores = () => {
    Keyboard.dismiss();
    const scores = CalcSum(gameData.players, game.winner);
    setFinalScores(scores);
    setModalVisible(true);
  };

  const playerRow = playersNames.map((player, index) => {
    return (
      <View style={styles.playerRow} key={player + index}>
        <Text style={styles.playerName}>{player}</Text>
        <View style={styles.playerPointsContainer}>
          <TextInput
            style={styles.inputScores}
            keyboardType="number-pad"
            placeholder="0"
            maxLength={8}
            onChangeText={(score) => handleChange({ score, index })}
            value={gameData.players[index].score[currentRound - 1]}
            returnKeyType={playersNames.length === index + 1 ? "done" : "next"}
            onSubmitEditing={() => (playersNames.length === index + 1 ? null : refInput.current[index + 1].focus())}
            ref={(input) => (refInput.current[index] = input)}
          ></TextInput>
          <Text style={styles.playerPoints}>{t("score")}</Text>
        </View>
      </View>
    );
  });

  const statsIcon = Platform.OS === "android" ? "md-stats-chart-outline" : "ios-stats-chart-outline";
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center" }}
      style={[styles.screen, { backgroundColor: modalVisible ? Colors.grey : Colors.white }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t("round")} {currentRound}/{game.rounds}
        </Text>
        <Ionicons
          name={statsIcon}
          size={25}
          style={styles.headerButton}
          onPress={() => {
            setIconPressed(true);
            checkScores();
          }}
        />
      </View>
      <FinalScoresDialog
        players={finalScores}
        modalVisible={modalVisible}
        setModalVisibility={() => {
          setModalVisible(!modalVisible);
        }}
        playAgain={() => {
          const winners =
            finalScores[0].totalScore === finalScores[1].totalScore
              ? t("deuce")
              : `${t("winner")}: ${finalScores[0].playerName}`;
          dispatch(scoreboardsActions.addScoreboard(winners, JSON.stringify(finalScores)));

          setModalVisible(!modalVisible);
          navigation.goBack();
        }}
        IconPressed={wasIconPressed}
        whoWins={game.winner}
      />
      <View style={styles.contentContainer}>
        <View style={[styles.content, { backgroundColor: modalVisible ? Colors.grey : Colors.white }]}>
          <View keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
            {playerRow}
          </View>
          <View style={styles.buttonContainer}>
            <View
              style={[
                styles.button,
                {
                  backgroundColor: isDisabled ? Colors.disabled : Colors.white,
                  borderColor: isDisabled ? Colors.disabled : Colors.black,
                },
              ]}
            >
              <CustomButton
                title={t("back")}
                onPress={() => {
                  if (!isDisabled) onBackPress();
                }}
                style={[styles.buttonProps, { color: isDisabled ? Colors.white : Colors.black }]}
                disabled={isDisabled}
              />
            </View>
            <View
              style={[
                styles.button,
                {
                  backgroundColor: currentRound === game.rounds ? Colors.blue : Colors.white,
                  borderColor: currentRound === game.rounds ? Colors.blue : Colors.black,
                },
              ]}
            >
              <CustomButton
                title={currentRound === game.rounds ? t("finish") : t("next")}
                style={[styles.buttonProps, { color: currentRound === game.rounds ? Colors.white : Colors.black }]}
                onPress={() => {
                  currentRound === game.rounds ? (checkScores(), setIconPressed(false)) : onNextPress();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

ScoresScreen.navigationOptions = () => {
  return {
    headerTitle: "Notes4Games",
  };
};

export default ScoresScreen;
