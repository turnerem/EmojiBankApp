import React, { useState } from 'react';
import db from './src/Database';

export const StoreContext = React.createContext();

// compare 
// https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm
// https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/
// in particular: how is the following function differenct from using a reducer?

// ANONYMOUS FUNCTION!



export default ({ children }) => {
  const [ categories, setCategories ] = useState([{cat: "Cream", catEmoji: "🥛"}, {cat: "Mangoes", catEmoji: "🥭"}]);
  const [ cat, setCat ] = useState("");
  const [ catEmoji, setCatEmoji ] = useState("");
  const [ tapped, setTapped ] = useState(false);
  // Really, poundVal needs to take values from SQL spreadsheet
  const [ poundVal, setPoundVal ] = useState(0);
  const [ isSave, setIsSave ] = useState(true);

  const store = {
    categories, setCategories,
    cat, setCat,
    catEmoji, setCatEmoji,
    tapped, setTapped,
    poundVal, setPoundVal,
    isSave, setIsSave
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}