import type { NextPage } from "next";
import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import axios from "axios";
import { Carting } from "./_app";
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

const Home: NextPage = () => {
  const [start, setStart] = useState<number>(0);
  // const [limit, setLimit] = useState<number>(4);
  // const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<[dataobj]>([]);
  const [cart, setCart] = useContext<any>(Carting);
  const [loader, setLoader] = useState<Boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("products"));
    if (data === null) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          setProducts(
            response?.data?.map((item: object) => ({
              ...item,
              count: 0,
            }))
          );
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      setProducts(data);
    }
    const startPage = parseInt(localStorage.getItem("page"));
    if (startPage) {
      setStart(startPage);
    }
  }, []);

  useEffect(() => {
    if (products?.length > 0) {
      sessionStorage.setItem("products", JSON.stringify(products));
      setLoader(false);
    }
  }, [products]);

  useEffect(() => {
    localStorage.setItem("page", start?.toString());
    // setPage(start);
  }, [start]);

  const handleCart = async (data: dataobj) => {
    const found = await cart?.filter((item: dataobj) => item?.id === data?.id);
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
      <Head>
        <title>ECommerce</title>
      </Head>
      <Header />
      <div className="w-11/12 mx-auto mt-2 drop-shadow-2xl bg-orange-50 mb-4">
        {loader ? (
          <div className=" flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-row justify-center flex-wrap mx-3 space-x-8 space-y-4">
              {products?.slice(start, start + 4)?.map((item) => (
                <div
                  className="bg-white px-2 py-3 flex flex-col w-40"
                  key={item?.id}
                >
                  <Image
                    src={item?.image}
                    alt="Image"
                    className="cursor-pointer"
                    onClick={() => router.push(`product/${item?.id}`)}
                    height={130}
                    width={70}
                  />
                  <div
                    className="truncate cursor-pointer"
                    onClick={() => router.push(`product/${item?.id}`)}
                  >
                    {item?.title}
                  </div>
                  <div>Price: ${item?.price}</div>
                  <button className="my-2 bg-red-600 rounded-md">
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleCart(item)}
                    className="my-2 border-2 border-black rounded-md"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4 mr-4">
              <div>Page {start / 4 + 1} of 5</div>
              <button
                className={
                  start === 0 ? "cursor-not-allowed" : "cursor-pointer"
                }
                disabled={start === 0}
                onClick={() => {
                  setStart(start - 4);
                  // setPage(start - 4);
                }}
              >
                prev
              </button>
              <button
                className={
                  start + 4 === 20 ? "cursor-not-allowed" : "cursor-pointer"
                }
                disabled={start + 4 === 20}
                onClick={() => {
                  setStart(start + 4);
                  // setPage(start + 4);
                }}
              >
                next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
