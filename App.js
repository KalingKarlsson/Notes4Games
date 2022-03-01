import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import "./assets/i18n/IMLocalize";
import { init } from "./helper/db";
import NotesNavigator from "./navigation/NotesNavigator";
import scoreboardReducer from "./store/reducers/scoreboard-reducer";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

const rootReducer = combineReducers({
  scoreboards: scoreboardReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  let [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    radley: require("./assets/fonts/Radley_400Regular.ttf"),
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NotesNavigator />
    </Provider>
  );
}
