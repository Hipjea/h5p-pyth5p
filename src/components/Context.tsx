import React, { createContext, useState } from "react";

interface IContext {
  id: string;
  setId: (data: string) => void;
  trigger: any;
  setTrigger: (fn: any) => void;
  createXAPIEventTemplate: any;
  setXAPIEventTemplate: (fn: any) => void;
}
  
const defaultState = {
  id: '0',
  setId: () => '0',
  trigger: () => {},
  setTrigger: () => {},
  createXAPIEventTemplate: () => {},
  setXAPIEventTemplate: () => {},
};

export const AppContext = createContext<IContext>(defaultState);

const AppProvider = ({ children }: any) => {
  const [id, setContentId] = useState<string>('');
  const setId = (newId: any) => setContentId((_: any) => newId);

  const [trigger, setFnTrigger] = useState<any>(null);
  const setTrigger = (fn: any) => setFnTrigger((_: any) => fn);

  const [createXAPIEventTemplate, setXAPI] = useState<any>();
  const setXAPIEventTemplate = (fn: any) => setXAPI((_: any) => fn);

  return (
    <AppContext.Provider
      value={{
        id,
        setId,
        trigger,
        setTrigger,
        createXAPIEventTemplate,
        setXAPIEventTemplate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
  
export default AppProvider;
