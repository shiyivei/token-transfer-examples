import React from "react";
import { useParams } from "react-router-dom";

export default function Watch() {
  const { imei } = useParams();
  console.log("获取到的imei是:", imei);
  return <div>{/* <h1>Watch Page</h1> */}</div>;
}
