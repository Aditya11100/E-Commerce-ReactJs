import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

interface CartingContext {
  cart: [object];
  setCart: React.Dispatch<React.SetStateAction<ObjectConstructor[]>>;
}

interface dataobj {
  category: string;
  count: number;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}

const Carting = createContext<CartingContext>([]);

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState<[dataobj]>([]);

  return (
    <Carting.Provider value={[cart, setCart]}>
      <Component {...pageProps} />
    </Carting.Provider>
  );
}

export default MyApp;
export { Carting };
