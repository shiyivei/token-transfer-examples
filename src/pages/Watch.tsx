import React from "react";
import { useParams } from "react-router-dom";
import * as iotex from "../iotex";
import * as api from "./apikey/apikey";

export default function Watch() {
  const { imei, ts, nonce, api_key, signature } =
    useParams();

  // 存储手表
  const store_watch = async (imei: any) => {
    await iotex.store_watch(imei);
  };

  api
    .decrypt_signature(
      imei,
      ts,
      nonce,
      api_key,
      signature
    )
    .then(function (result) {
      if (result == true) {
        store_watch(imei);
      }
    });

  return <div>{/* <h1>Watch Page</h1> */}</div>;
}
