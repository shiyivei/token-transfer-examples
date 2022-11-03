import React from "react";
import { useParams } from "react-router-dom";
import * as api from "./apikey/apikey";

export default function Bought() {
  const {
    order_id,
    ts,
    nonce,
    api_key,
    signature,
  } = useParams();

  api
    .decrypt_signature(
      order_id,
      ts,
      nonce,
      api_key,
      signature
    )
    .then(function (result) {
      if (result == true) {
      }
    });

  return (
    <div>
      {/* <h1>Bought Page - {order_number} </h1> */}
    </div>
  );
}
