import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SharedContextProps {
  sharedValue: number;
  setSharedValue: React.Dispatch<React.SetStateAction<number>>;
}

const SharedContext = createContext<SharedContextProps | undefined>(undefined);

export const SharedProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sharedValue, setSharedValue] = useState<number>(0);

  return (
    <SharedContext.Provider value={{ sharedValue, setSharedValue }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useShared = (): SharedContextProps => {
  const context = useContext(SharedContext);
  if (!context) {
    throw new Error('useShared must be used within a SharedProvider');
  }
  return context;
};
