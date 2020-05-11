import * as SQLite from 'expo-sqlite';
// import { DbInitialization } from './DbInitialization';
// import { createTables, getDbVersion } from './DbInitialization'

/*
Notes on sqlite:
executeSql:
SQLitePlugin.prototype.executeSql = function(sstatement, params, success, error) (in sqlite.core.js)
*/

// try export a single instance of Database class XX
// make a js class called database, the a class dbImplementation implmenting database, then... stuff
class Database {

  constructor() {
    this.database = undefined
  }
  
  openDb = () => {
    const db = SQLite.openDatabase("EmojiBank.db")
    db.transaction(tx => {
      // both these contain executeSqls. They are being enqueued. ENQUEUED.
      // createTables(tx)
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
    return db;
  }

  closeDb = () => {
    if (this.database !== undefined) {
      // might need to remove underscore, or pass argument, or just use debugger
      db._db.close();
    }
  };

  // a function to open the database if it's not already open
  getDatabase = () => {
    if (this.database !== undefined) {
      return this.database;
    }
    return this.openDb();
  }

  // might need to return something
  getAllTab = (tab) => {
    this.getDatabase().transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ?;`, 
        [tab],
        ([result]) => {
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
          