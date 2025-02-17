"use client"

import React, { createContext, useContext, useState } from 'react';

// Create a context with a default value
const AppContext = createContext({
  user: null,
  setUser: (user: any) => {},
});

const AppProvider = ({ children }:{children:React.ReactNode}) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );

};

const useAppContext = () => {
  const context = useContext(AppContext);
  if(!context){
    throw Error("No hay Context");
  }

  return context;
};

export { AppProvider, useAppContext, AppContext };
