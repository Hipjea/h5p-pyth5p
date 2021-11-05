import React, { createContext, useState } from "react";

interface IContext {
  id: string;
  setId: (data: string) => void;
  userCode: string;
  setUserCode: (data: string) => void;
  isCodeRun: boolean;
  setCodeRun: (data: boolean) => void;
  outText: string;
  setOutText: (data: string) => void;
  clearOutText: () => void;
}
  
const defaultState = {
  id: '0',
  setId: () => '0',
  userCode: '',
  setUserCode: () => '',
  isCodeRun: false,
  setCodeRun: () => false,
  outText: '',
  setOutText: () => '',
  clearOutText: () => ''
};

export const AppContext = createContext<IContext>(defaultState);

const AppProvider = ({ children }: any) => {
  const [id, updateContentId] = useState<string>('');
  const setId = (newId: string) => updateContentId(newId);

  const [userCode, updateUserCode] = useState<string>('');
  const setUserCode = (newData: string) => updateUserCode(newData);

  const [isCodeRun, updateCodeRun] = useState<boolean>(false);
  const setCodeRun = (bool: boolean) => updateCodeRun(bool);

  const [outText, updateOutText] = useState<string>('');
  const setOutText = (data: string) => updateOutText(data);

  const clearOutText = () => updateOutText('');

  return (
    <AppContext.Provider
      value={{
        id,
        setId,
        userCode,
        setUserCode,
        isCodeRun,
        setCodeRun,
        outText,
        setOutText,
        clearOutText
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
  
export default AppProvider;
