/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "./../../../components/Header";
import { Carting } from "../../_app";

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

const index: NextPage = () => {
  const [data, setData] = useState<dataobj>();
  const [cart, setCart] = useContext<any>(Carting);
  const router = useRouter();
  const { id } = router.query;
  const [loader, setLoader] = useState<Boolean>(true);

  useEffect(() => {
    const details = JSON.parse(sessionStorage.getItem(`${id}`));

    if (details) {
      setData(details);
    } else {
      if (id) {
        axios
          .get(`https://fakestoreapi.com/products/${id}`)
          .then((res) => {
            setData({ ...res?.data, count: 0 });
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem(`${id}`, JSON.stringify(data));
      setLoader(false);
    }
  }, [id, data]);

  const handleCart = async () => {
    const found = await cart.filter((item: dataobj) => item?.id === data?.id);
    if (found.length > 0) {
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
    } else {
      setCart([...cart, { ...data, count: data?.count + 1 }]);
    }
  };

  return (
    <div>
      <Header />
      {loader ? (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="w-11/12 mx-auto mt-2 drop-shadow-2xl bg-orange-50 p-4 flex space-x-4 rounded-2xl">
          <img
            src={data?.image}
            className="rounded-md"
            alt="Image"
            height={"400px"}
            width={"280px"}
          />
          <div className="bg-white w-full h-fulls rounded-2xl flex flex-col p-4">
            <div className="text-2xl">{data?.title}</div>
            <div className="text-base">{data?.description}</div>
            <div className="text-xl underline underline-offset-2">
              Rating: {data?.rating?.rate}/5
            </div>
            <div className="text-xl underline underline-offset-2">
              Total count: {data?.rating?.count}
            </div>
            <div className="text-xl underline underline-offset-2">
              Price: ${data?.price}
            </div>
            <div className="flex flex-row space-x-4 mt-4">
              <button className="bg-red-600 rounded-md px-4 py-2">
                Buy Now
              </button>
              <button
                onClick={handleCart}
                className="border-2 border-black rounded-md px-4 py-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
