import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Modal,
  Alert,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";

import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";

const pickerRoundsDDL = Array.from({ length: 20 }).map((value, index) => {
  return { id: index, label: (index + 1).toString(), value: index + 1, key: Math.random() };
});

const pickerPlayersDDL = Array.from({ length: 7 }).map((value, index) => {
  return { id: index, label: (index + 2).toString(), value: index + 2, key: Math.random() };
});

const NewScoreboardScreen = (props) => {
  const [isPickedRounds, setIsPickedRounds] = useState(1);
  const [roundsOpen, setRoundsOpen] = useState(false);
  const [rounds, setRounds] = useState(pickerRoundsDDL);

  const [isPickedNumber, setIsPickedNumber] = useState(2);
  const [playersOpen, setPlayersOpen] = useState(false);
  const [players, setPlayers] = useState(pickerPlayersDDL);

  const { t } = useTranslation();

  const radioButtonsData = [
    {
      id: "1",
      label: "",
      value: "low",
      selected: true,

      color: Colors.blue,
      borderColor: Colors.black,
      labelStyle: { fontSize: 16, width: 150 },
      containerStyle: { width: "100%", justifyContent: "space-around" },
      size: 30,
    },
    {
      id: "2",
      label: "",
      value: "high",

      color: Colors.black,
      borderColor: Colors.black,
      labelStyle: { fontSize: 16, width: 150 },
      containerStyle: { width: "100%", justifyContent: "space-around" },
      size: 30,
    },
  ];

  radioButtonsData[0].label = t("low");
  radioButtonsData[1].label = t("high");
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const [modalVisible, setModalVisible] = useState(false);
  const [startIsDisabled, setStartIsDisabled] = useState(true);

  const [values, setValues] = React.useState({
    textArray: Array.from({ length: isPickedNumber }).fill(""),
  });

  const refInput = React.useRef([]);
  const textInputs = Array.from({ length: isPickedNumber });

  const createScoreboardHandler = () => {
    let whoWins = "";
    radioButtons.forEach((button) => {
      if (button.selected) {
        whoWins = button.value;
      }
    });
    const playerData = values.textArray.map((value, i) => {
      let name = value.toLowerCase();
      name = name.charAt(0).toUpperCase() + name.slice(1);
      return { playerName: name };
    });

    playerData.forEach((player) => {
      player["score"] = Array.from({ length: isPickedRounds }).fill("");
    });

    props.navigation.navigate({
      routeName: "Scoreboard",
      params: {
        players: playerData,
        rounds: isPickedRounds,
        winner: whoWins,
      },
    });
  };

  const handleChange = (event) => {
    const { text, index } = event;
    setValues((prevState) => {
      prevState.textArray[index] = text;
      return {
        textArray: prevState.textArray,
      };
    });
  };

  const onPressRadioButton = (radioButtonsArray) => {
    radioButtonsArray.forEach((button) => {
      if (button.selected) {
        button.color = Colors.blue;
      }
    });
    setRadioButtons(radioButtonsArray);
  };

  useEffect(() => {
    values.textArray.includes("") || values.textArray.includes(undefined)
      ? setStartIsDisabled(true)
      : setStartIsDisabled(false);
  }, [handleChange]);

  useEffect(() => {
    values.textArray.length = isPickedNumber;
    setValues(values);
  }, [isPickedNumber]);

  const submitPlayers = () => {
    setModalVisible(!modalVisible);
    createScoreboardHandler();
  };
  return (
    <View style={[styles.mainContainer, { backgroundColor: modalVisible ? Colors.grey : Colors.white }]}>
      <View style={styles.content}>
        <>
          <Text style={styles.pickerHeader}>{t("selectRounds")}</Text>
          <DropDownPicker
            open={roundsOpen}
            value={isPickedRounds}
            items={rounds}
            setOpen={setRoundsOpen}
            setValue={setIsPickedRounds}
            setItems={setRounds}
            autoScroll={true}
            zIndex={3000}
            zIndexInverse={1000}
            style={{ width: 200, alignSelf: "center", backgroundColor: modalVisible ? Colors.grey : Colors.white }}
            containerStyle={{ width: 200 }}
            labelStyle={{
              fontSize: 16,
            }}
            arrowIconStyle={{ tintColor: Colors.blue }}
            tickIconStyle={{ tintColor: Colors.blue }}
          />

          <Text style={styles.pickerHeader}>{t("playerAmount")}</Text>
          <DropDownPicker
            open={playersOpen}
            value={isPickedNumber}
            items={players}
            setOpen={setPlayersOpen}
            setValue={setIsPickedNumber}
            setItems={setPlayers}
            autoScroll={true}
            zIndex={2000}
            zIndexInverse={2000}
            style={{ width: 200, alignSelf: "center", backgroundColor: modalVisible ? Colors.grey : Colors.white }}
            containerStyle={{ width: 200 }}
            labelStyle={{
              fontSize: 16,
            }}
            arrowIconStyle={{ tintColor: Colors.blue }}
            tickIconStyle={{ tintColor: Colors.blue }}
          />
        </>

        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} containerStyle={styles.radioGroup} />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
                {textInputs.map((v, index) => {
                  return (
                    <View style={{ flexDirection: "column" }} key={index}>
                      <Text>{t("player")} {index + 1} </Text>
                      <TextInput
                        onChangeText={(text) => handleChange({ text, index })}
                        value={values.textArray[index]}
                        maxLength={10}
                        autoCorrect={false}
                        textAlign="left"
                        autoFocus={Platform.OS === "ios" ? (index === 0 ? true : false) : false}
                        returnKeyType={textInputs.length === index + 1 ? "done" : "next"}
                        onSubmitEditing={() =>
                          textInputs.length === index + 1 ? null : refInput.current[index + 1].focus()
                        }
                        ref={(input) => (refInput.current[index] = input)}
                        selectionColor={Colors.disabled}
                        style={styles.nameInputs}
                      />
                    </View>
                  );
                })}
              </ScrollView>
              <View style={styles.buttonContainer}>
                <View style={[styles.button, styles.buttonClose]}>
                  <CustomButton style={styles.textStyle} title={t("close")} onPress={() => setModalVisible(!modalVisible)} />
                </View>
                <View
                  style={[
                    styles.button,
                    styles.buttonOpen,
                    {
                      backgroundColor: startIsDisabled ? Colors.disabled : Colors.blue,
                      borderColor: startIsDisabled ? Colors.disabled : Colors.blue,
                    },
                  ]}
                >
                  <CustomButton
                    style={[styles.textStyle, { color: Colors.white }]}
                    title={t("start")}
                    onPress={() => {
                      if (!startIsDisabled) submitPlayers();
                    }}
                    disabled={startIsDisabled}
                  />
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <View style={styles.createScoreboardButton}>
        <CustomButton
          title={t("playerNamesButton")}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </View>
  );
};

NewScoreboardScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Notes4Games",
  };
};

const styles = StyleSheet.create({
  amountPlayers: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: Colors.black,
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: "10%",
  },

  createScoreboardButton: {
    //border
    borderRadius: 4,
    borderColor: Colors.black,
    borderStyle: "solid",
    borderWidth: 1,

    width: "50%",
    alignSelf: "center",
    bottom: Platform.OS === "android" ? 50 : 120,
    position: "absolute",
  },
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  number: {
    fontSize: 32,
  },
  numPicker: {
    width: "80%",
    height: 100,
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS === "android" ? "15%" : 0,
  },
  item: {
    color: Colors.black,
  },
  picker: {
    height: 150,
  },
  pickerAndroid: {
    height: 50,
  },
  pickerContainer: {
    marginBottom: 12,
    width: "50%",
  },
  pickerContainerSecond: {
    marginBottom: 12,
    width: "50%",
  },
  pickerContainerAndroid: {
    marginBottom: 12,
    width: "50%",

    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 4,
  },
  pickerHeader: {
    fontSize: 16,
    textAlign: "left",
    width: 200,
    marginTop: 24,
  },
  selectedItem: {
    color: Platform.OS === "ios" ? Colors.blue : Colors.black,
  },
  title: {
    fontSize: 28,
    fontFamily: "open-sans-bold",
    color: Colors.black,
    marginTop: "8%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    width: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  button: {
    borderColor: Colors.black,
    borderStyle: "solid",
    borderRadius: 4,
    borderWidth: 1,
  },
  buttonOpen: {
    backgroundColor: Colors.confirm,
    width: "40%",
  },
  buttonClose: {
    width: "40%",
  },
  textStyle: {
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  radioGroup: {
    width: 180,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 150,
    marginTop: 20,
  },
  nameInputs: {
    width: 150,
    borderColor: Colors.black,
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
    marginBottom: 8,
    justifyContent: "center",
    paddingLeft: 4,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
});

export default NewScoreboardScreen;
