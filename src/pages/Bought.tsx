import React from "react";
import { useParams } from "react-router-dom";

export default function Bought() {
  const { order_id } = useParams();
  console.log("获取到的order id是:", order_id);

  return (
    <div>
      {/* <h1>Bought Page - {order_number} </h1> */}
    </div>
  );
}
