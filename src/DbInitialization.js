// import SQLite from "react-native-sqlite-storage";


// function updateDbTables(db) {
//     console.log("INITIALISING DB")
//     return db.transaction((tx) => {this.createTables( tx )})
//         .then(() => {
//           return this.getDbVersion(db);
//         })
//         // chain more stuff on to check version a la
//         // https://brucelefebvre.com/blog/2018/11/06/react-native-offline-first-db-with-sqlite/
//   } 
const dbInitialization = {};

dbInitialization.createTables = (tx) => {
    // categories
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Categories (
        cat_id INTEGER NOT NULL PRIMARY KEY, 
        cat varchar(64), 
        cat_emoji varchar(64)
      );`
    );

    // // spend events
    // tx.executeSql(
    //   `CREATE TABLE IF NOT EXISTS SpendEvents (
    //     event_id INTEGER NOT NULL PRIMARY KEY,
    //     cat_id INTEGER NOT NULL FOREIGN KEY REFERENCES Categories(cat_id),
    //     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    //     amount DOUBLE(10, 2)
    //   );`
    // );

    // // save events
    // tx.executeSql(
    //   `CREATE TABLE IF NOT EXISTS SaveEvents (
    //     event_id INTEGER NOT NULL PRIMARY KEY,
    //     cat_id INTEGER NOT NULL FOREIGN KEY REFERENCES Categories(cat_id),
    //     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    //     amount DOUBLE(10, 2)
    //   );`
    // );

    // version (app version, useful for updates)
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Version (
        version_id INTEGER PRIMARY KEY NOT NULL,
        version INTEGER
      );`
    )
  }

  dbInitialization.getDbVersion = (tx) => {
    tx.executeSql(
      `SELECT version FROM Version ORDER BY version DESC LIMIT 1;`, 
      null,
      (_, result) => console.log(result.rows.array)
    )
  }

export default dbInitialization;

