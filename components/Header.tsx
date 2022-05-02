import React, { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import Cart from "../public/Cart.png";
import Image from "next/image";
import Link from "next/link";
import { Carting } from "../pages/_app";

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

const Header: NextPage = () => {
  const [cart, setCart] = useContext<any>(Carting);
  const [count, setCount] = useState<number>();

  useEffect(() => {
    let c: number = 0;
    cart?.map((item: dataobj) => {
      c += item?.count;
    });
    setCount(c);
  }, [cart]);

  return (
    <div className="w-full bg-zinc-400">
      <div className="absolute top-0 right-3 z-20">{count}</div>
      <div className="flex justify-between py-1">
        <div>header</div>
        <div className="mr-2">
          <Link href="/cart">
            <a>
              <Image src={Cart} alt="cart" height={50} width={50} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
