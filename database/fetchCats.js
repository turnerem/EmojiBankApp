// import { useContext } from 'react'
import connection from "./Connection"
// import { StoreContext } from '../store'

// This should also take arguments for returning Cats with sum totals joined on
// const fetchCats = () => {

  // const { categories, setCategories } = useContext(StoreContext)


   // should also handle the passing of queries
const getCats = (joinTab = undefined) => {
  // let sqlStmt = "";
  // if( joinTab == undefined) {
  //   console.log("no joining\n")
  //   sqlStmt = `SELECT * FROM Categories;`;
  // } else {
  //   console.log("joining!\n")
  //   sqlStmt = 
  //     `SELECT * FROM Categories
  //      LEFT JOIN (?) ON
  //      Categories.cat_id = (?).cat_id
  //      ORDER BY cat_id;`
  // }

  return new Promise((resolve) => {
    console.log("Starting the sql part\n")
    connection.getDb().transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Categories;`, 
        [],
        
        // success cb
        (_, result) => {
          console.log(result.rows.length, 'row count in TAB\n\n')
          
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

//   // should also handle the passing of queries
// const getCats = (joinTab = undefined) => {
//   let sqlStmt = "";
//   if( joinTab == undefined) {
//     console.log("no joining\n")
//     sqlStmt = `SELECT * FROM Categories;`;
//   } else {
//     console.log("joining!\n")
//     sqlStmt = 
//       `SELECT * FROM Categories
//        LEFT JOIN (?) ON
//        Categories.cat_id = (?).cat_id
//        ORDER BY cat_id;`
//   }

//   return new Promise((resolve) => {
//     console.log("Starting the sql part\n", sqlStmt)
//     connection.getDb().transaction(tx => {
//       tx.executeSql(
//         sqlStmt, 
//         joinTab ? [ joinTab, joinTab ] : [],
        
//         // success cb
//         (_, result) => {
//           console.log(result.rows.length, 'row count in TAB\n\n')
          
//           resolve(result.rows._array)
//         },
//         // failure cb
//         (_, err) => {
//           console.log("ERROR in getTab: ", err);
//           })
//         }
//       )
//     }) 
// }
  
  
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


