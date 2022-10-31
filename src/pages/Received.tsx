import React from "react";
import { useParams } from "react-router-dom";

export default function Received() {
  const { receive_id } = useParams();
  console.log(
    "获取到的receive id是:",
    receive_id
  );

  return (
    <div>{/* <h1>Received Page</h1> */}</div>
  );
}
