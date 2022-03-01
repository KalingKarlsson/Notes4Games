import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("scoreboards.db");

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS scoreboards (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, date TEXT NOT NULL, scores TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      tx.executeSql(
        "DROP TABLE players;",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const insertScoreboard = (title, date, scores) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO scoreboards (title, date, scores) VALUES (?, ?, ?);`,
        [title, date, scores],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};

export const fetchScoreboards = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM scoreboards",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  });
};

export const deleteScoreboard = (scoreboardId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM scoreboards WHERE id = ?;`,
        [scoreboardId],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
};
