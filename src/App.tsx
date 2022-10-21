import React from "react";
import "./App.css";
import coin_logo from "./components/static/img/coin_logo.png";
import { useState } from "react";

import Reward from "./components/Reward";
import Contract_balance from "./components/ContractBalance";
import TransferERC20 from "./components/TransferERC20";
import ERC20_balance from "./components/ERC20Balance";
import * as iotex from "./iotex";

const address =
  // "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";
  "shiyivei";
function App() {
  // 固定写法
  const [balance, setBalance] = useState([]);

  const [erc20Balance, setErc20Balance] =
    useState([]);

  const [transfererc20, setTransfererc20] =
    useState([]);

  // 存储手表
  const getWatchStatus = async (imei: any) => {
    const watch_status =
      await iotex.get_watch_store_status(imei);

    console.log(watch_status);
  };

  return (
    <div className="App">
      <div className="App-Header">
        <div className="Header-Wallet">钱包</div>
        <p className="Header-Wallet_details">
          钱包明细
        </p>
      </div>
      <div className="App-Body">
        <img
          src={coin_logo}
          alt="logo"
          className="Coin_logo"
        />
        <div className="Coin_name">总奖金池</div>
        <div className="Balance">
          <Contract_balance
            balance={balance}
            setBalance={setBalance}
          />
        </div>
        <div className="ERC20Balance">
          <ERC20_balance
            erc20Balance={erc20Balance}
            setErc20Balance={setErc20Balance}
          />
        </div>
        <div className="Transfer">
          <TransferERC20 />
        </div>
      </div>
    </div>
  );
}

export default App;
