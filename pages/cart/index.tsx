/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { Carting } from "../_app";
import Header from "./../../components/Header";
import Image from "next/image";
import { useRouter } from "next/router";

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

const index = () => {
  const [cart, setCart] = useContext<any>(Carting);
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    let s = 0;
    cart.map((item: dataobj) => {
      s += item?.price * item?.count;
    });
    setSum(s);
  }, [cart]);
  const router = useRouter();

  const deleteItem = (item: object) => {
    setCart([...cart.filter((i: object) => i !== item)]);
  };

  const increment = (data: dataobj) => {
    setCart(
      cart.map((item: dataobj) => {
        if (item?.id === data?.id) {
          return {
            ...data,
            count: item?.count + 1,
          };
        } else {
          return item;
        }
      })
    );
  };

  const decrement = (data: dataobj) => {
    if (data?.count === 1) {
      setCart(cart.filter((item: dataobj) => item?.id !== data?.id));
    } else {
      setCart(
        cart.map((item: dataobj) => {
          if (item?.id === data?.id) {
            return {
              ...data,
              count: item?.count - 1,
            };
          } else {
            return item;
          }
        })
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="w-11/12 mx-auto mt-2 drop-shadow-2xl bg-orange-50 p-4 flex flex-col space-y-4 rounded-2xl">
        {cart?.map((item: dataobj) => (
          <div
            key={item?.id}
            className="bg-white p-4 rounded-2xl flex space-x-8"
          >
            <img
              src={item?.image}
              className="cursor-pointer"
              onClick={() => router.push(`product/${item?.id}`)}
              alt="Image"
              height={130}
              width={120}
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <div
                  onClick={() => router.push(`product/${item?.id}`)}
                  className="text-2xl cursor-pointer"
                >
                  {item?.title}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => decrement(item)}
                    className="bg-white text-lg"
                  >
                    -
                  </button>
                  <div className="mt-1 text-lg">{item?.count}</div>
                  <button
                    onClick={() => increment(item)}
                    className="bg-white text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-lg underline underline-offset-2">
                Rating: {item?.rating?.rate}/5
              </div>
              <div className="text-lg underline underline-offset-2">
                Price: ${item?.price}
              </div>
              <div className="text-lg ">
                <button
                  onClick={() => deleteItem(item)}
                  className="text-red-600 underline underline-offset-2"
                >
                  Remove Item
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-2 space-x-4">
          <div>Total:</div>
          <div>{parseFloat(sum.toString()).toFixed(2)}</div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-white px-4 py-2 rounded-lg"
            onClick={() => alert("Ordered Successfully")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
