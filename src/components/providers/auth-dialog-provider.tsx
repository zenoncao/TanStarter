'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

type AuthDialogType = 'login' | 'register' | null;

interface AuthDialogContextValue {
  openDialog: AuthDialogType;
  openLogin: () => void;
  openRegister: () => void;
  closeDialog: () => void;
}

const AuthDialogContext = createContext<AuthDialogContextValue | undefined>(
  undefined,
);

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [openDialog, setOpenDialog] = useState<AuthDialogType>(null);

  const openLogin = useCallback(() => setOpenDialog('login'), []);
  const openRegister = useCallback(() => setOpenDialog('register'), []);
  const closeDialog = useCallback(() => setOpenDialog(null), []);

  return (
    <AuthDialogContext.Provider
      value={{ openDialog, openLogin, openRegister, closeDialog }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (context === undefined) {
    throw new Error('useAuthDialog must be used within AuthDialogProvider');
  }
  return context;
}
