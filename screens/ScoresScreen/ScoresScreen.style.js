import { StyleSheet, Platform } from "react-native";
import Colors from "../../constants/Colors";

export default StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8%",
    marginBottom: "12%",
    paddingHorizontal: 16,
    //border
    borderColor: Colors.black,
    borderStyle: "solid",
    borderRadius: 4,
    borderWidth: 1,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  buttonProps: {
    fontSize: 20,
  },
  content: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    width: "75%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  headerButton: {
    position: "absolute",
    right: "1%",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
    color: Colors.black,
    marginTop: 4,
    width: "70%",
    textAlign: "center",
  },
  inputScores: {
    width: 110,
    borderColor: Colors.black,
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
    marginBottom: 8,
    marginRight: 8,
    justifyContent: "flex-start",
    paddingLeft: 4,
  },
  playerRow: {
    display: "flex",
    justifyContent: "center",
  },
  playerName: {
    fontSize: 18,
    textAlign: "left",
    marginBottom: 1,
  },
  playerPoints: {
    fontSize: 18,
    justifyContent: "center",
  },
  playerPointsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  screen: {
    backgroundColor: Colors.white,
    height: "100%",
  },
});
