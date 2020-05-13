import React, { useContext, useReducer, useState } from 'react'
import { View, Text } from 'react-native'
import { StoreContext } from '../store'

const useDb = (tab, initialData) => {

  const { openDb, setOpenDb } = useContext(StoreContext)

  // SQLite is not async, but lets pretend it is. 
  // Also, if end up popping this on a backend, will be handling async then
  const dataReducer = (state, action) => {
    switch( action.type ) {
      case 'GET_INIT':
        return {
          isLoading: true,
          hasErrored: false,
          errMsg: "",
          data: initialData
        };
      case 'GET_SUCCESS': {
        return {
          isLoading: false,
          hasErrored: false,
          errMsg: "",
          data: action.data
        }
      };
      case 'GET_FAILURE': {
        return {
          isLoading: false,
          hasErrored: true,
          errMsg: `Data retrieval failure. ${action.err}`,
          data: []
        }
      }
      case 'ADDED_ITEM': {
        // after sql table has been updated, I want this fn to pop the row on the array
        const newData = [ ...state.data, action.newItem ]
        return {
          isLoading: false,
          hasErrored: false,
          errMsg: "",
          data: newData
        }
      };
      case 'UPDATED_ITEM': {
        const newData = state.data.map(item => {
          item.cat = item.cat == action.oldCat && action.newCat;
          return item;
        })
        return {
          
          isLoading: false,
          hasErrored: false,
          errMsg: "",
          data: newData
        }
      }

    }
    return state;
  }

  const [ state, dispatch ] = useReducer(dataReducer, {
    isLoading: true,
    hasErrored: false,
    errMsg: "",
    data: initialData
  })


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
    setOpenDb(db);
    // return db;
  }

  closeDb = () => {
    console.log("Closing DB now")
    if (openDb !== undefined) {
      // might need to remove underscore, or pass argument, or just use debugger
      openDb._db.close();
    }
  };

  // a function to open the database if it's not already open
  getDatabase = () => {
    if (openDb !== undefined) {
      return openDb;
    }
    return this._openDb();
  }

  getAllTab = (tab) => {
    this.getDatabase().transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ?;`, 
        [tab],
        (_, result) => {
          console.log(result.rows.length, 'row count in TAB\n\n')
          dispatch({
            type: "GET_SUCCESS",
            data: result.rows._array
          })
        },
        (_, err) => {
          dispatch({
            type: "GET_FAILURE",
            err
          })
        }
      )
    })
  }

  // need to make this more generic so that I can add a row to any table
  // Insert multiple rows into a table:
  // https://www.sqlitetutorial.net/sqlite-nodejs/insert/



  addItem = (tab, colNames, row) => {
    let placeholders = colNames.map((name) => '?').join(',')
    this.getDatabase().transaction(tx => {
      tx.executeSql(
        `INSERT INTO ? (` + placeholders + `)
        VALUES (` + placeholders + `);`,
        [ tab, ...colNames, ...row ],
        (_, result) => {
          console.log(`new row added with id ${result.insertId}.`)
          dispatch({
            type: "ADDED_ITEM",
            newItem: result.rows._array
          })
        }
      )
    })
  }

  updateItem = (tab, colName, item) => {
    console.log("updatItem PLACEHOLDER :0")
  }

  // The stuff that will always happen when useDb is called for a given tab:
  getAllTab(tab)

  return { ...state, addItem, updateItem }
}

export default useDb
