import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";

import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
const background = require("../assets/Cards.jpg");

const ActiveScoreboardsScreen = (props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <Image source={background} resizeMode={"center"} style={styles.image} />
      <Text style={styles.title}>{t("appMainText")}</Text>

      <View style={styles.button}>
        <CustomButton
          title={t("startButton")}
          onPress={() => {
            props.navigation.navigate("NewScoreboard");
          }}
        />
      </View>
    </View>
  );
};

ActiveScoreboardsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Notes4Games",
  };
};

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.black,
    borderStyle: "solid",
    borderRadius: 4,
    borderWidth: 1,
    width: "40%",
    bottom: 50,
    marginBottom: 4,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  image: {
    flex: 1,
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    fontFamily: "radley",
    textAlign: "center",
    width: "70%",
    bottom: 100,
  },
});

export default ActiveScoreboardsScreen;
