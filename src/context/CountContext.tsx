import { useProductStore } from "@/store/productStore";
import React, { createContext, useContext, useMemo } from "react";

interface CountContextProps {
  allCount: number;
  activeCount: number;
  inactiveCount: number;
}

const CountContext = createContext<CountContextProps | undefined>(undefined);

export const CounProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const productStore = useProductStore();

  const allCount = useMemo(() => {
    return productStore.countOfProducts();
  }, [productStore.products]);

  const activeCount = useMemo(() => {
    return productStore.countOfProducts("A");
  }, [productStore.products]);

  const inactiveCount = useMemo(() => {
    return productStore.countOfProducts("I");
  }, [productStore.products]);

  return (
    <CountContext.Provider
      value={{
        allCount,
        activeCount,
        inactiveCount,
      }}
    >
      {children}
    </CountContext.Provider>
  );
};

export const useCountContext = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error(
      "useCountContext debe ser utilizado dentro de CountProductsProvider"
    );
  }
  return context;
};
