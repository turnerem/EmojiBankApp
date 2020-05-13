import * as SQLite from 'expo-sqlite';
// import { DbInitialization } from './DbInitialization';
// import { createTables, getDbVersion } from './DbInitialization'

// Wondering about SQLITE:
// https://stackoverflow.com/questions/47512338/should-i-open-and-close-db-for-every-db-operation-in-sqlite
// https://developer.android.com/training/data-storage/sqlite
// takeaway: Don't open and close db with every update/interaction

// https://www.sqlite.org/howtocorrupt.html
// Nice overview for TROUBLESHOOTING

// https://sqlite.org/optoverview.html
// overview of optimization

// https://brucelefebvre.com/blog/2018/11/06/react-native-offline-first-db-with-sqlite/
// Discussing, inter alia, lifecycle management
// open db when app is running in foreground, and close when it bops back to the background

// I think I need this object, because I srote an open db in it, 
// and check whether it's open before trying to open another. So things can't get tangled.
// could possibly also use the backpack of a function for this stuff. What's the difference?
// Make open db a private method

class Database {

  constructor() {
    this.database = undefined
  }
  
  _openDb = () => {
    // On disk, the database will be created under the app's documents directory, i.e. ${FileSystem.documentDirectory}/SQLite/${name}.
    const db = SQLite.openDatabase("EmojiBank.db")

    // db.transaction(callback, error, success)
    db.transaction(tx => {
      // both these contain executeSqls. They are being enqueued. ENQUEUED.
      // createTables(tx)

      //tx.executeSql(sqlStatement, arguments, success, error)
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Categories (
          cat_id INTEGER NOT NULL PRIMARY KEY, 
          cat varchar(64), 
          cat_emoji varchar(64)
        );`
      );

      // save events
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS SaveEvents (
          event_id INTEGER NOT NULL PRIMARY KEY,
          cat_id INTEGER NOT NULL FOREIGN KEY REFERENCES Categories(cat_id),
          timestamp TEXT DEFAULT datetime('now'),
          amount DOUBLE(10, 2)

        );`
      );
          // spend events
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS SpendEvents (
        event_id INTEGER NOT NULL PRIMARY KEY,
        cat_id INTEGER NOT NULL FOREIGN KEY REFERENCES Categories(cat_id),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        amount DOUBLE(10, 2)
      );`
    );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Version (
          version_id INTEGER PRIMARY KEY NOT NULL,
          version INTEGER
        );`
      )
      //this should really be setting a db context varl
      // getDbVersion(tx)
      tx.executeSql(
        `SELECT version FROM Version ORDER BY version DESC LIMIT 1;`, 
        null,
        (_, result) => console.log(result.rows._array)
      )
    })
    this.database = db;
    // return db;
  }

  closeDb = () => {
    console.log("Closing DB now")
    if (this.database !== undefined) {
      // might need to remove underscore, or pass argument, or just use debugger
      this.database._db.close();
    }
  };

  // a function to open the database if it's not already open
  getDatabase = () => {
    if (this.database !== undefined) {
      return this.database;
    }
    return this._openDb();
  }

  // might need to return something
  getAllTab = (tab) => {
    this.getDatabase().transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ?;`, 
        [tab],
        (_, result) => {
          console.log(result.rows.length, 'row count in TAB\n\n')
          // for (let i = 0; i < res.rows.length; i++) {
          //   console.log("ITEM ", i, res.rows.item(i))
          // }
          // // return res;
          // return {cat: 'croissants', catEmoji: '🥐'};
// 
        // }
        // )
    })
     
  })
  }


  addCat = (cat, catEmoji) => {
    this.getDatabase().transaction(tx => {
      tx.executeSql(
        `INSERT INTO Categories (cat, cat_emoji)
         VALUES (?, ?);`, 
        [cat, catEmoji],
        (_, result) => console.log(`New cat added, ${catEmoji}, with id ${result.insertId}`)
      )
    })
  }

  addSave = (cat, amt) => {
    this.getDatabase().transaction(tx => {
      tx.executeSql(
        `SELECT cat_id, cat FROM Categories
         WHERE cat = ?
         LIMIT 1;`,
        [cat],
        (tx, result) => {
          const { _array } = result.rows;
          console.log("RESULT ROWS!:", result.rows)
          tx.executeSql(
            `INSERT INTO SaveEvents (cat_id)
             VALUES (?);`,
            [_array],
            (_, result) => {console.log("Just added save:", result.rows)}
          )
        }
      )
    })
  }

  // Get all categories with saves/spends appended on and summed - for a given TIME

  // Add save/spend

  // util to find entries in last x weeks / x months / x years


  // }


  /*
  syntax for multiple rows: 
  INSERT INTO table_name (col_list)
  VALUES 
    (value_list_1),
    (value_list_2),
    (...);
  */

 
}; 

const db = new Database();
// export default db;
export default db

// export {db};
          