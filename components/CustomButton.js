import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const CustomButton = (props) => {
  const { style, ...rest } = props;
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <Text style={[styles.buttonText, style]} {...rest}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: Colors.black,
    textAlign: "center",
    paddingVertical: 6,
  },
});
export default CustomButton;
