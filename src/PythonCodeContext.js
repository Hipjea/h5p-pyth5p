import React from 'react';

export const PythonCodeContext = React.createContext();

export function PythonCodeContextProvider({children, value}) {
  return (
    <PythonCodeContext.Provider value={value}>
      {children}
    </PythonCodeContext.Provider>
  );
}
