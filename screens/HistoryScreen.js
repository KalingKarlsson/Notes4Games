import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, FlatList, View, RefreshControl, Text, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import CustomButton from "../components/CustomButton";
import ScoreboardItem from "../components/ScoreboardItem";
import Colors from "../constants/Colors";
import * as scoreboardActions from "../store/actions/scoreboard-actions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HistoryScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [reset, doReset] = useState(Math.random());
  const scoreboards = useSelector((state) => state.scoreboards.scoreboards);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(scoreboardActions.loadScoreboard());
  }, [dispatch, reset]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      doReset(Math.random);
    });
  }, []);

  const deleteScoreboardHandler = (scoreboardId) => {
    dispatch(scoreboardActions.deleteSelectedScoreboard(scoreboardId));
    doReset(Math.random);
  };

  const itemSperator = () => {
    return <View style={styles.itemSperator} />;
  };

  const stickyheader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.idText}>Id</Text>
        <Text style={styles.resultText}>{t("final")}</Text>
        <Text style={styles.dateText}>{t("date")}</Text>
        <Text style={styles.idText} />
      </View>
    );
  };

  const emptyList = () => {
    return (
      <View style={styles.emptyListStyles}>
        <Text style={styles.emptyListInfo}>{t("empty")}</Text>
        <View style={styles.button}>
          <CustomButton
            style={styles.textStyle}
            title={t("startButton")}
            onPress={() => {
              props.navigation.navigate("NewScoreboard");
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ display: "none" }} key={reset}></View>
      <FlatList
        data={scoreboards}
        ItemSeparatorComponent={itemSperator}
        ListHeaderComponent={stickyheader}
        ListEmptyComponent={emptyList}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ScoreboardItem
            key={itemData.item.id}
            id={itemData.item.id}
            title={itemData.item.title}
            date={itemData.item.date}
            onSelect={() => {
              props.navigation.navigate("GameHistory", {
                scoreboardId: itemData.item.id,
                scoreboardTitle: itemData.item.title,
                scoreboardDate: itemData.item.date,
                scoreboardScores: itemData.item.scores,
              });
            }}
            handleDelete={() => {
              deleteScoreboardHandler(itemData.item.id);
            }}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

HistoryScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Notes4Games",
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  itemSperator: {
    height: 1,
    width: "100%",
    backgroundColor: Colors.grey,
  },
  listHeader: {
    height: 35,
    width: "100%",
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,

    borderBottomColor: Colors.black,
    borderBottomWidth: 1,
    borderTopColor: Colors.black,
    borderTopWidth: 1,
  },
  button: {
    borderColor: Colors.blue,
    borderStyle: "solid",
    borderRadius: 4,
    borderWidth: 1,
    width: "40%",

    marginTop: 16,

    backgroundColor: Colors.blue,
  },
  title: {
    fontSize: 28,
    fontFamily: "open-sans-bold",
    color: Colors.black,
    marginBottom: "2%",
  },
  textStyle: {
    textAlign: "center",
    color: Colors.white,
  },

  idText: {
    width: "10%",
    fontSize: 20,
    textAlign: "center",
  },

  resultText: {
    width: "50%",
    fontSize: 20,
    textAlign: "center",
  },
  dateText: {
    width: "30%",
    fontSize: 20,
    textAlign: "center",

    marginRight: Platform.OS === "android" ? 0 : 0,
  },

  emptyListStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  emptyListInfo: {
    width: "70%",
    fontSize: 20,
    textAlign: "center",
  },
});

export default HistoryScreen;
