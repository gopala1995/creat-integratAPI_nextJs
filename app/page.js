"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import "./page_home.css";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  console.log(data);

  const FetchData = async () => {
    const res = await axios.get("http://localhost:3004/products");
    setData(res.data);
  };
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <button>
        <Link href="/addproduct">Add product</Link>
      </button>
      <div className="home">
        {data.map((el, i) => (
          <div className="card" key={i}>
            <img src={el.image} />
            <div className="about">
              <h3 className="text-gray-500">{el.title}</h3>
              <p className="text-xl font-bold my-3">₹. {el.price}</p>
              <p className="description">{el.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
