"use client";
import { AppStore, makeStore } from "@/store/store";
import { FC, ReactNode, useRef } from "react";
import { Provider } from "react-redux";

interface IProps {
  children: ReactNode;
}

const StoreProvider: FC<IProps> = ({ children }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
