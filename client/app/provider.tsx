import React, { ReactNode } from "react";
import { store } from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";

interface ProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: ProviderProps) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
