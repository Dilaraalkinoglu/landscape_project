'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

export type CursorType = 'default' | 'inspect' | 'drag' | 'leaf';

interface CursorContextValue {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>('default');

  const value = useMemo(
    () => ({
      cursorType,
      setCursorType,
    }),
    [cursorType]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor(): CursorContextValue {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
