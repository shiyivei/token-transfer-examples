import React from "react";
import "./App.css";
import coin_logo from "./components/static/img/coin_logo.png";
import { useState } from "react";

import Reward from "./components/Reward";
import Contract_owner from "./components/IotexCalls";

const address =
  // "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";
  "shiyivei";
function App() {
  const [owner, setOwner] = useState([]);

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
        <div className="Coin_name">ART</div>
        <div className="Balance">
          <div className="Address">
            <div className="fc">
              <Contract_owner
                owner={owner}
                setOwner={setOwner}
              />
            </div>
          </div>
        </div>
        <div className="Get_real_money">
          提现金额
        </div>
        <div className="Input_amount">
          <input
            type="text"
            placeholder="请输入要提取的金额"
          ></input>
        </div>
        <div className="Wallet_address">
          钱包地址
        </div>
        <div className="Input_address">
          <input
            type="text"
            placeholder="粘贴钱包地址"
          ></input>
        </div>
        <div className="Transfer_button">
          <button>提现</button>
        </div>
      </div>
    </div>
  );
}

export default App;
