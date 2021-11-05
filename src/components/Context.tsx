import React, { createContext, useState } from "react";

interface IContext {
  id: string;
  setId: (data: string) => void;
}
  
const defaultState = {
  id: '0',
  setId: () => '0'
};

export const AppContext = createContext<IContext>(defaultState);

const AppProvider = ({ children }: any) => {
  const [id, setContentId] = useState<string>('');
  const setId = (newId: any) => setContentId((_: any) => newId);

  return (
    <AppContext.Provider
      value={{
        id,
        setId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
  
export default AppProvider;
