import React from 'react'
import connection from "./Connection"

// This should also take arguments for returning Cats with sum totals joined on
const fetchCats = (initialData = []) => {

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
      // case 'UPDATED_ITEM': {
      //   const newData = state.data.map(item => {
      //     item = (item.cat_id == action.updatedCat.cat_id && action.newCat;
      //     return item;
      //   })
      //   return {
          
      //     isLoading: false,
      //     hasErrored: false,
      //     errMsg: "",
      //     data: newData
      //   }
      // }

    }
    return state;
  }

  const [ state, dispatch ] = useReducer(dataReducer, {
    isLoading: true,
    hasErrored: false,
    errMsg: "",
    data: initialData
  })

  // should also handle the passing of queries
  getTab = () => {
    getDb().transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Categories;`, 
        [],
        
        // success cb
        (_, result) => {
          console.log(result.rows.length, 'row count in TAB\n\n')
          dispatch({
            type: "GET_SUCCESS",
            data: result.rows._array
          })
        },
        // failure cb
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
  
  
  
  addItem = (cat, catEmoji) => {
    getDb().transaction(tx => {
      tx.executeSql(
        `INSERT INTO Categories ( cat, cat_emoji )
        VALUES ( ?, ? );`,
        [ cat, catEmoji ],
        // success cb
        (_, result) => {
          console.log(`new row added with id ${result.insertId}.`)
          dispatch({
            type: "ADDED_ITEM",
            newItem: result.rows._array
          })
        },
        // failure cb
        (_, err) => {
          console.log("item not added, soz", err)
        }
      )
    })
  }
  
  // updateItem = (tab, colName, item) => {
  //   console.log("updatItem PLACEHOLDER :0")
  // }
  
  return { ...state, addItem }
}

export default fetchCats


