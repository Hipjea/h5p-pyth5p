import React, {useContext} from 'react';

const PythonCodeContext = React.createContext();

function PythonCodeContextProvider({children, value}) {
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
    mockContext.trigger = (eventName, data) => {
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
