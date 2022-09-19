import { createContext, useContext, useState } from "react";

//Create the context
export const AppContext = createContext({});
//Create de wrapper component
export default function Store({ children }) {
  const [items, setItems] = useState([]);

  function createItem(item) {
    const temp = [...items];
    temp.push(item);
    setItems(temp);
  }

  function getItem(id) {
    return items.find((item) => item.id === id);
  }

  function updateItem(item) {
    const index = items.findIndex((i) => i.id === item.id);
    items[index] = { ...item };
  }

  return (
    <AppContext.Provider value={{ items, createItem, getItem, updateItem }}>
      {children}
    </AppContext.Provider>
  );
}

//Create the function to use the context
export function useAppContext() {
  return useContext(AppContext);
}
