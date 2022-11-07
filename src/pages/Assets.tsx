import React from "react";
import { useParams } from "react-router-dom";
import * as iotex from "../iotex";
import * as api from "./apikey/apikey";

export default function Assets() {
  const { id, ts, nonce, api_key, signature } =
    useParams();

  // 存储手表
  const store_watch = async (imei: any) => {
    await iotex.store_watch(imei);
  };

  const verify_result = api.decrypt_signature(
    id,
    ts,
    nonce,
    api_key,
    signature
  );

  let balance: any = 300000000;
  verify_result.then((value) => {
    if (value == true) {
      iotex.get_user_asset(id).then((asset) => {
        balance = 100;
      });
    }
  });

  return <div>{balance} AUM</div>;
}
