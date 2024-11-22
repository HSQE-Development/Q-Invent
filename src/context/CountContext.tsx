import { useProductStore } from "@/store/productStore";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  const [allCount, setAllCount] = useState<number>(0);
  const [activeCount, setActiveCount] = useState<number>(0);
  const [inactiveCount, setInactiveCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const count = await productStore.countOfProducts();
      setAllCount(count.total);
      setActiveCount(count.active);
      setInactiveCount(count.inactive);
    };

    fetchCounts();
  }, []);

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
