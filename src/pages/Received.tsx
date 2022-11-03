import React from "react";
import { useParams } from "react-router-dom";
import * as api from "./apikey/apikey";

export default function Received() {
  const {
    receive_id,
    ts,
    nonce,
    api_key,
    signature,
  } = useParams();

  api
    .decrypt_signature(
      receive_id,
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
    <div>{/* <h1>Received Page</h1> */}</div>
  );
}
