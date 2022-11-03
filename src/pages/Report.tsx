import React from "react";
import { useParams } from "react-router-dom";
import * as iotex from "../iotex";
import * as api from "./apikey/apikey";

export default function Report() {
  const { hash, ts, nonce, api_key, signature } =
    useParams();

  // 存储手表
  const store_report_hash = async (hash: any) => {
    await iotex.store_reportHash(hash);
  };

  api
    .decrypt_signature(
      hash,
      ts,
      nonce,
      api_key,
      signature
    )
    .then(function (result) {
      if (result == true) {
        store_report_hash(hash);
      }
    });

  return <div>{/* <h1>Report Page</h1> */}</div>;
}
