// import { useContext } from 'react'
import connection from "./Connection"
// import { StoreContext } from '../store'

// This should also take arguments for returning Cats with sum totals joined on
// const fetchCats = () => {

  // const { categories, setCategories } = useContext(StoreContext)

  // should also handle the passing of queries
const getCats = () => {
    return new Promise((resolve) => {
      connection.getDb().transaction(tx => {
        tx.executeSql(
          `SELECT * FROM Categories;`, 
          [],
          
          // success cb
          (_, result) => {
            // console.log(result.rows.length, 'row count in TAB\n\n', result.rows._array)
            
            resolve(result.rows._array)
          },
          // failure cb
          (_, err) => {
            console.log("ERROR in getTab: ", err);
            })
          }
        )
      }) 
    }
  
  
  // need to make this more generic so that I can add a row to any table
  // Insert multiple rows into a table:
  // https://www.sqlitetutorial.net/sqlite-nodejs/insert/
  
  
  
const addCat = (cat, catEmoji) => {
    return new Promise((resolve) => {
      connection.getDb().transaction(tx => {
        tx.executeSql(
          `INSERT INTO Categories ( cat, cat_emoji )
          VALUES ( ?, ? );`,
          [ cat, catEmoji ],
          // success cb
          (_, result) => {
            console.log(`new row added with id ${result.insertId}.`)
            resolve(result.insertId)
            })
          },
          // failure cb
          (_, err) => {
            console.log("item not added, soz", err)
          }
        )
      })
    }

const deleteAllCats = () => {
  connection.getDb().transaction(tx => {
    tx.executeSql(
      `DELETE FROM Categories`,
      [],
      (_, success) => {
        console.log("Table contents (?) deleted")
      },
      (_, fail) => {
        console.log("table delete failed!")
      }
    )
  })
}
  
  
  // updateItem = (tab, colName, item) => {
  //   console.log("updatItem PLACEHOLDER :0")
  // }
  
  // return {  }
// }

export default { getCats, addCat, deleteAllCats }


