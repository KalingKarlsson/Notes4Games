import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as Localization from "expo-localization";

import ActiveScoreboardsScreen from "../screens/ActiveScoreboardsScreen";
import NewScoreboardScreen from "../screens/NewScoreboardScreen";
import ScoresScreen from "../screens/ScoresScreen/ScoresScreen";
import HistoryScreen from "../screens/HistoryScreen";
import GameHistoryScreen from "../screens/GameHistoryScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.white,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Colors.black,
  headerTitle: "This Screen",
  headerTitleAlign: "center",
};

const NotesNavigator = createStackNavigator(
  {
    ActiveScoreboards: ActiveScoreboardsScreen,
    NewScoreboard: { screen: NewScoreboardScreen },
    Scoreboard: { screen: ScoresScreen },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const HistoryNavigator = createStackNavigator(
  {
    History: HistoryScreen,
    GameHistory: GameHistoryScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  Active: {
    screen: NotesNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home-outline" size={24} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.white,
      tabBarLabel: Localization.locale === "sv-SE" ? "Hem" : "Home",
    },
  },
  History: {
    screen: HistoryNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <FontAwesome5 name="history" size={21} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.white,
      tabBarLabel: Localization.locale === "sv-SE" ? "Historik" : "History",
    },
  },
};

const BottomTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Colors.black,
        shifting: true,
        barStyle: {
          backgroundColor: Colors.white,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.black,
        },
      });

export default createAppContainer(BottomTabNavigator);
