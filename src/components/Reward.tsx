import React from "react";
import Web3 from "web3";
import ABI from "./utilis/abi";
import { nanoid } from "nanoid";
import CONTRACT_ADDRESS from "./utilis/contract_address";
import PRIVATE_KEY from "./utilis/env";
import TOKEN_ADDRESS from "./utilis/token_address";

const Big = require("big.js");

// declare a variable via interface
interface IProps {
  title: string;
  age: number;
  onMyClick: any;
}

interface IState {
  count: number;
}

// impl the interface above
export default class Reward extends React.Component<
  IProps,
  IState
> {
  // set default value
  public constructor(props: IProps) {
    super(props);

    // initial value
    this.state = {
      count: 1000,
    };

    // bind and change value
    this.clickHandler =
      this.clickHandler.bind(this);

    this.clickSendMessageHandler =
      this.clickSendMessageHandler.bind(this);
  }

  // implement
  // public readonly state: Readonly<IState> = {
  //   count: 1000,
  // };

  // implement a handler
  public clickHandler() {
    this.setState({
      count: 2000,
    });
  }

  public clickSendMessageHandler() {
    console.log("test Send Message");
    this.props.onMyClick("200");
  }

  public render() {
    const { title, age } = this.props;
    return (
      <>
        <div>
          Hello {title}
          {age}
        </div>
        <div>{this.state.count}</div>
        <button onClick={this.clickHandler}>
          Click
        </button>
        <button
          onClick={this.clickSendMessageHandler}
        >
          Send Message
        </button>
      </>
    );
  }
}

console.log(
  "hello, welcome to the reward contract !"
);

// Initialize web3.js using the IoTeX Babel endpoint
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://babel-api.testnet.iotex.io"
  )
);

const contract_address: any = CONTRACT_ADDRESS;

console.log("合约地址是:", contract_address);

//合约ABI
const abi: any = ABI;

//合约实例
const reward = new web3.eth.Contract(
  abi,
  contract_address
);

//1.查看合约创建者
const get_owner = async () => {
  var owner = await reward.methods.owner().call();
  console.log("合约创建者:", `${owner}`);

  return owner;
};

get_owner();

//2.获取合约信息
console.log("创建的合约实例:", reward);

//2.查询创建者账户余额
const test_address =
  "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

const get_iotex_test_balance = async () =>
  web3.eth
    .getBalance(test_address)
    .then(function (balance: any) {
      let iotxBalance = Big(balance).div(
        10 ** 18
      );
      console.log(
        "%s 账户余额: %s IOTX",
        test_address,
        iotxBalance.toFixed(18)
      );
    });

get_iotex_test_balance();

//3.查询合约某个报告是否已经存储（出具）

const get_report_hash_store_status = async (
  report_hash: string
) => {
  let result = await reward.methods
    .get_reportHash_store_status(report_hash)
    .call();
  console.log(
    "未病测评报告时是否存储:",
    `${result}`
  );
};

//4.查询某个手表是否存储在合约中

const get_watch_store_status = async (
  imei: string
) => {
  let result = await reward.methods
    .get_watch_store_status(imei)
    .call();
  console.log("脉诊手表是否存储:", `${result}`);
};

//5.查询当前合约余额

const token_address = TOKEN_ADDRESS;
const get_contractBalance = async () => {
  let result = await reward.methods
    .getContractBalance(token_address)
    .call();
  console.log("当前合约余额:", `${result}`);
};

get_contractBalance();

//6.存储报告哈希

const r_hash = nanoid();

const store_reportHash = async (
  report_hash: string
) => {
  console.log(
    "call store_reportHash function......"
  );

  const address =
    "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

  //构建交易对象
  const tx: any = {
    from: address,
    to: contract_address,
    gas: 50000,
    data: reward.methods
      .store_reportHash(report_hash)
      .encodeABI(),
  };

  //签名
  const signed: any =
    await web3.eth.accounts.signTransaction(
      tx,
      PRIVATE_KEY.private_key
    );

  console.log(
    "Transaction successful with hash",
    signed
  );

  web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log("receipt", receipt);
    });
};

console.log("获取到的随机报告哈希是:", r_hash);

get_report_hash_store_status(r_hash);

store_reportHash(r_hash);

get_report_hash_store_status(r_hash);

//7 存储手表

const imei = nanoid();

const store_watch = async (imei: string) => {
  console.log("call store_watch function......");

  const address =
    "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

  //构建交易对象
  const tx: any = {
    from: address,
    to: contract_address,
    gas: 50000,
    data: reward.methods
      .store_watch(imei)
      .encodeABI(),
  };

  //签名
  const signed: any =
    await web3.eth.accounts.signTransaction(
      tx,
      PRIVATE_KEY.private_key
    );

  console.log(
    "Transaction successful with hash",
    signed
  );

  web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log("receipt", receipt);
    });
};

console.log("获取到的随机IMEI码:", imei);

get_watch_store_status(imei);
store_watch(imei);
get_watch_store_status(imei);

// 转账
