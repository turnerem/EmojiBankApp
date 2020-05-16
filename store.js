import React, { useState } from 'react';
// import fetchCats from './database/fetchCats'

export const StoreContext = React.createContext();

// compare 
// https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm
// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
// in particular: how is the following function differenct from using a reducer?

// ANONYMOUS FUNCTION!


export default ({ children }) => {

  const [ categories, setCategories ] = useState([]);
  // XX Is use of catsCount a bit hacky?
  // Motivation: update categories in AddCategories every time a cat is added / removed
  const [ catsCount, setCatsCount ] = useState(0);
  const [ cat, setCat ] = useState("");
  const [ catEmoji, setCatEmoji ] = useState("");
  const [ tapped, setTapped ] = useState(false);
  // Really, poundVal needs to take values from SQL spreadsheet
  const [ isSave, setIsSave ] = useState(true);
  const [ newAmt, setNewAmt ] = useState("");

  const store = {
    categories, setCategories,
    catsCount, setCatsCount,
    cat, setCat,
    catEmoji, setCatEmoji,
    tapped, setTapped,
    isSave, setIsSave,
    newAmt, setNewAmt
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}