import Web3 from "web3";
import aum_reward_abi from "./utilis/aum_reward_abi";
import { nanoid } from "nanoid";
import aum_reward_address from "./utilis/aum_reward_address";
import PRIVATE_KEY from "./utilis/env";
import token_address from "./utilis/aum_address";
import storage_abi from "./utilis/watch_report_storage_abi";
import storage_address from "./utilis/watch_report_storage_address";
import axios from "axios";

const Big = require("big.js");

// Initialize web3.js using the IoTeX Babel endpoint
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://babel-api.testnet.iotex.io"
  )
);

// console.log("1.合约地址是:", contract_address);

//奖励合约实例
const aum_reward = new web3.eth.Contract(
  aum_reward_abi,
  aum_reward_address
);

console.log("aum_reward合约实例", aum_reward);

//存储合约实例
const watch_and_report_storage =
  new web3.eth.Contract(
    storage_abi,
    storage_address
  );

// 获取合约信息
console.log(
  "storage合约实例",
  watch_and_report_storage
);

//1.查看合约创建者
const get_owner = async () => {
  var owner = await aum_reward.methods
    .contract_owner()
    .call();
  console.log("合约归属人:", `${owner}`);

  return owner;
};

get_owner();

//2.查询创建者账户余额
const test_address =
  "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

const get_iotex_test_balance = async () => {
  let result = web3.eth
    .getBalance(test_address)
    .then(function (balance: any) {
      let iotxBalance = Big(balance).div(
        10 ** 18
      );
      console.log(
        "4.%s 账户余额: %s IOTX",
        test_address,
        iotxBalance.toFixed(2)
      );
      return iotxBalance.toFixed(2);
    });

  return result;
};

//3.查询当前合约余额

// const token_address = TOKEN_ADDRESS;
const get_contractBalance = async () => {
  let result = await aum_reward.methods
    .get_contract_balance(token_address)
    .call();

  let balance: number = result;
  console.log(
    "当前合约余额:",
    Big(balance)
      .div(10 ** 18)
      .toFixed(0)
  );
  return Big(balance)
    .div(10 ** 18)
    .toFixed(0);
};

//4.查询合约某个报告是否已经存储（出具）

const get_report_hash_store_status = async (
  report_hash: string
) => {
  let result =
    await watch_and_report_storage.methods
      .report_is_stored(report_hash)
      .call();
  console.log(
    "未病测评报告时是否存储:",
    `${result}`
  );
  return result;
};

//5.查询某个手表是否存储在合约中

const get_watch_store_status = async (
  imei: string
) => {
  let result =
    await watch_and_report_storage.methods
      .watch_is_stored(imei)
      .call();

  console.log("脉诊手表是否存储:", `${result}`);

  return result;
};

//6.存储报告哈希

const store_reportHash = async (
  report_hash: string
) => {
  console.log("正在存储报告哈希......");

  const address =
    "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

  //构建交易对象
  const tx: any = {
    from: address,
    to: storage_address,
    gas: 50000,
    data: watch_and_report_storage.methods
      .store_report(report_hash)
      .encodeABI(),
  };

  //签名
  const signed: any =
    await web3.eth.accounts.signTransaction(
      tx,
      PRIVATE_KEY.private_key
    );

  console.log(
    "Transaction process with hash",
    signed
  );

  await web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log(
        "store_hash receipt",
        receipt.logs.length
      );
      console.log("store_hash finished");
    });

  const report_status =
    await get_report_hash_store_status(
      report_hash
    );

  return report_status;
};

const imei = nanoid();

const store_watch = async (imei: string) => {
  console.log("正在存储手表......");

  const address =
    "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

  //构建交易对象
  const tx: any = {
    from: address,
    to: storage_address,
    gas: 5000000,
    data: watch_and_report_storage.methods
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
    "Transaction process with hash:",
    signed
  );

  await web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log(
        "store_watch receipt",
        receipt.logs.length
      );
      console.log("%s stored:", imei);
    });

  const store_status =
    await get_watch_store_status(imei);

  return store_status;
};

const transfer_erc20 = async (
  token_contract_address: string,
  receive_address: string,
  amount: any
) => {
  const address =
    "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

  const value = Big(amount)
    .times(10 ** 18)
    .toFixed(0);

  //构建交易对象
  const tx: any = {
    from: address,
    to: aum_reward_address,
    gas: 5000000,
    data: aum_reward.methods
      .transfer_erc20(
        token_contract_address,
        receive_address,
        value
      )
      .encodeABI(),
  };

  //签名
  const signed: any =
    await web3.eth.accounts.signTransaction(
      tx,
      PRIVATE_KEY.private_key
    );

  console.log(
    "Transaction process with hash:",
    signed
  );

  console.log("正在转账......");

  await web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log(
        "get receipt",
        receipt.logs.length
      );
    });

  console.log("转账已完成");
};

const get_user_asset = async (id: any) => {
  let url: string =
    "http://localhost:3000/assets/?id=" + id;

  console.log("请求的路径:", url);

  let data;
  await axios.get(url).then((res) => {
    data = JSON.stringify(res.data);
    // console.log(
    //   "--------------------------------data:",
    //   data
    // );
  });

  return data;
};

const update_user_asset = async (amount: any) => {
  let url: string = "api/assets/?value=" + amount;
  await axios.get(url);
};

// get_user_asset("chenhongjun@advaita.world");

export {
  update_user_asset,
  get_user_asset,
  get_owner,
  get_iotex_test_balance,
  get_contractBalance,
  get_report_hash_store_status,
  get_watch_store_status,
  store_reportHash,
  store_watch,
  transfer_erc20,
};
