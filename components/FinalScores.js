import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTranslation } from "react-i18next";

import CustomButton from "./CustomButton";
import Colors from "../constants/Colors";

const FinalScoresDialog = ({ players, modalVisible, setModalVisibility, playAgain, IconPressed, whoWins }) => {
  if (!modalVisible) {
    return null;
  }
  const { t } = useTranslation();

  let leader = players[0].totalScore;
  let winnersArr = players.filter(({ totalScore }) => totalScore === leader);

  let winnerHeadline = t("congratualtions") + " ";
  winnersArr.forEach((winner, index) => {
    if (index !== 0) {
      if (index + 1 === winnersArr.length) {
        winnerHeadline += " & ";
      } else {
        winnerHeadline += ", ";
      }
    }
    winnerHeadline += winner.playerName;
  });

  const winners = (
    <Text style={[styles.winnerText, { display: IconPressed ? "none" : "flex" }]}>
      {IconPressed ? "" : winnerHeadline}
    </Text>
  );

  const winnerFormat = whoWins === "low" ? t("deciderInfoLow") : t("deciderInfoHigh");

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}> {IconPressed ? t("current") : t("final")}</Text>
          {winners}
          <View style={styles.modalHeader}>
            <Text style={styles.modalText}> {t("rank")} </Text>
            <Text style={[styles.modalText, styles.modalTextPlayer]}> {t("player")}</Text>
            <Text style={styles.modalText}> {t("score")}</Text>
          </View>
          {players.map((player, index) => {
            return (
              <Animatable.View
                animation="bounceInDown"
                duration={1000 + index * 100}
                style={styles.animatedText}
                key={index}
              >
                <Text style={styles.modalText}>{index + 1}</Text>
                <Text style={[styles.modalText, styles.modalTextPlayer]}>{player.playerName}</Text>
                <Text style={styles.modalText}>{player.totalScore}</Text>
              </Animatable.View>
            );
          })}
          <View style={styles.buttonContainer}>
            {IconPressed ? (
              <View style={styles.button}>
                <CustomButton title={t("close")} onPress={setModalVisibility} />
              </View>
            ) : (
              <Animatable.View
                animation="swing"
                iterationCount="infinite"
                iterationDelay={3000}
                style={[styles.button, styles.buttonPlayAgain]}
              >
                <CustomButton title={t("playAgain")} onPress={playAgain} style={styles.buttonText} />
              </Animatable.View>
            )}
          </View>

          {IconPressed ? <Text style={styles.modalInfo}>{winnerFormat}</Text> : <></>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  animatedText: {
    flexDirection: "row",
    display: "flex",
    width: 260,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    top: "27%",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    display: "flex",
    width: 260,
    borderColor: Colors.black,
    borderStyle: "solid",
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    width: 80,
  },
  modalTextPlayer: {
    width: 100,
  },
  modalInfo: {
    fontSize: 16,
    marginTop: 16,
  },
  button: {
    borderColor: Colors.black,
    borderStyle: "solid",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  buttonPlayAgain: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 200,
    marginTop: 24,
  },
  buttonText: {
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  winnerText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
    color: Colors.blue,
    textAlign: "center",
    maxWidth: "80%",
  },
});

export default FinalScoresDialog;
