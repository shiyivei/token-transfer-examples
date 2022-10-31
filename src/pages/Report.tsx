import React from "react";
import { useParams } from "react-router-dom";

export default function Report() {
  const { hash } = useParams();
  console.log("获取到的report hash是:", hash);
  return <div>{/* <h1>Report Page</h1> */}</div>;
}
