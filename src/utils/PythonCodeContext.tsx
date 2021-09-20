import React, { useContext } from 'react';

interface PythonCodeContextInterface {
  "$": any,
  attach: () => void,
  contentId: number,
  id:  number,
  libraryInfo: { 
    machineName: string,
    majorVersion: string,
    minorVersion: string,
    versionedName: string,
    versionedNameNoSpaces: string
  },
  off: (type: any, listener: any)​ => void,
  on: (type: any, listener: any, thisArg: any)​ => void,
  once: (type: any, listener: any, thisArg: any)​ => void,
  params: any,
  trigger: (event: any, eventData: any, extras: any)​ => void,
  wrapper: HTMLElement
}

const PythonCodeContext = React.createContext<PythonCodeContextInterface | null>(null);

function PythonCodeContextProvider({children, value}: any) {
  return (
    <PythonCodeContext.Provider value={value}>
      {children}
    </PythonCodeContext.Provider>
  );
}

function usePythonCodeContext() {
  const context = useContext(PythonCodeContext);
  if (context === undefined) {
    const mockContext = Object.create(H5P.EventDispatcher.prototype);
    mockContext.trigger = (eventName: string, data: any) => {
      H5P.jQuery("root").trigger(eventName, data);
    };
    return mockContext;
  }
  return context;
}

export {
  PythonCodeContextProvider,
  usePythonCodeContext,
};
