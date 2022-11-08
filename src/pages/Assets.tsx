import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as iotex from "../iotex";
import * as api from "./apikey/apikey";

export default function Assets() {
  // const [balance, setBalance] = useState(0);
  const { id, ts, nonce, api_key, signature } =
    useParams();

  const verify_result = api.decrypt_signature(
    id,
    ts,
    nonce,
    api_key,
    signature
  );

  const [asset, setAsset] = useState();

  const res = async () => {
    await verify_result.then((value) => {
      if (value == true) {
        console.log("正在获取可提现余额");
        iotex.get_user_asset(id).then((asset) => {
          console.log(
            "获取到的可提现金额是:",
            asset
          );
          setAsset(asset);
        });
      } else {
        console.log("参数验证失败,拒绝查询");
      }
    });
  };

  res();

  return <div>{asset} AUM</div>;
}
