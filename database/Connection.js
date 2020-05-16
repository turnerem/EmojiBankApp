import * as SQLite from 'expo-sqlite';

class Connection {
  constructor() {
    this.database = undefined
  }

  _openDb = () => {
    console.log('\nOPENING DB!')
    // On disk, the database will be created under the app's documents directory, i.e. ${FileSystem.documentDirectory}/SQLite/${name}.
    const db = SQLite.openDatabase("EmojiBank.db")

    db.exec(
      [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], 
      false, 
      () => console.log('Foreign keys turned on')
    );

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
          cat_id INTEGER NOT NULL,
          timestamp INTEGER,
          amount DOUBLE(10, 2) DEFAULT 0.00,
          FOREIGN KEY (cat_id) REFERENCES Categories(cat_id)
        );`
      );
          // spend events
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS SpendEvents (
        event_id INTEGER NOT NULL PRIMARY KEY,
        cat_id INTEGER NOT NULL,
        timestamp INTEGER,
        amount DOUBLE(10, 2),
        FOREIGN KEY (cat_id) REFERENCES Categories(cat_id)
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
    console.log("\nClosing DB now")
    if (this.database !== undefined) {
      // might need to remove underscore, or pass argument, or just use debugger
      this.database._db.close();
    }
  };

  // a function to open the database if it's not already open
  getDb = () => {
    if (this.database !== undefined) {
      return this.database;
    }
    return this._openDb();
  }
}

const connection = new Connection();

export default connection

 