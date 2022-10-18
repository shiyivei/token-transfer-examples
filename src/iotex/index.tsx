import Web3 from "web3";
import ABI from "./utilis/abi";
import { nanoid } from "nanoid";
import CONTRACT_ADDRESS from "./utilis/contract_address";
import PRIVATE_KEY from "./utilis/env";
import TOKEN_ADDRESS from "./utilis/token_address";
const Big = require("big.js");

// Initialize web3.js using the IoTeX Babel endpoint
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://babel-api.testnet.iotex.io"
  )
);

const contract_address: any = CONTRACT_ADDRESS;

// console.log("1.合约地址是:", contract_address);

//合约ABI
const abi: any = ABI;

//合约实例
const reward = new web3.eth.Contract(
  abi,
  contract_address
);

//2.获取合约信息
// console.log("2.创建的合约实例:", reward);

//1.查看合约创建者
const get_owner = async () => {
  var owner = await reward.methods
    .contract_owner()
    .call();
  // console.log("3.合约创建者:", `${owner}`);

  return owner;
};

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

const token_address = TOKEN_ADDRESS;
const get_contractBalance = async () => {
  let result = await reward.methods
    .get_contract_balance(token_address)
    .call();

  let balance: number = result;
  // console.log(
  //   "5.当前合约余额:",
  //   Big(balance)
  //     .div(10 ** 18)
  //     .toFixed(0)
  // );
  return Big(balance)
    .div(10 ** 18)
    .toFixed(0);
};

//4.查询合约某个报告是否已经存储（出具）

const get_report_hash_store_status = async (
  report_hash: string
) => {
  let result = await reward.methods
    .report_is_stored(report_hash)
    .call();
  // console.log(
  //   "未病测评报告时是否存储:",
  //   `${result}`
  // );
  return result;
};

//5.查询某个手表是否存储在合约中

const get_watch_store_status = async (
  imei: string
) => {
  let result = await reward.methods
    .watch_is_stored(imei)
    .call();

  console.log("脉诊手表是否存储:", `${result}`);

  return result;
};

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
    "Transaction process with hash",
    signed
  );

  await web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log("store_hash receipt", receipt);
      console.log("store_hash finished");
    });

  const report_status =
    await get_report_hash_store_status(
      report_hash
    );

  return report_status;
};

//7.存储报告哈希

const get_reward_amount = async () => {
  let result = await reward.methods
    .reward_amount()
    .call();

  console.log(
    "当前提现金额:",
    Big(result)
      .div(10 ** 18)
      .toFixed(0)
  );
};

const get_next_reward_time = async (
  imei: string
) => {
  let result = await reward.methods
    .get_next_reward_time(imei)
    .call();
  console.log("6.下次提现时间:", `${result}`);
};

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
    gas: 5000000,
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
    "Transaction process with hash:",
    signed
  );

  await web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log("store_watch receipt", receipt);
      console.log("%s stored:", imei);
    });

  const store_status =
    await get_watch_store_status(imei);

  return store_status;
};

// console.log("获取到的随机IMEI码:", imei);

// 转账

const set_reward_amount = async (
  amount: number
) => {
  console.log("call set amount function......");

  const address =
    "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

  //构建交易对象
  const tx: any = {
    from: address,
    to: contract_address,
    gas: 5000000,
    data: reward.methods
      .set_reward_amount(amount)
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

  web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log(
        "set reward amount receipt",
        receipt
      );
      console.log("set_reward_amount finished");
    });
};

const to: any =
  "0xec876F62798E65270Ef163f86ec7afE5E7D634e7";

const transfer_erc20 = async (
  token_contract_address: string,
  watch_id: string,
  report_hash: string,
  receive_address: string
) => {
  console.log("call set amount function......");

  const address =
    "0xFb7032b3fcfFc0A41E96B99AFd663A477819667C";

  //构建交易对象
  const tx: any = {
    from: address,
    to: contract_address,
    gas: 5000000,
    data: reward.methods
      .transfer_erc20(
        token_contract_address,
        watch_id,
        report_hash,
        receive_address
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

  web3.eth
    .sendSignedTransaction(signed.rawTransaction)
    .on("receipt", (receipt) => {
      console.log(
        "set reward amount receipt",
        receipt
      );
      console.log("set_reward_amount finished");
    });
};

const moonbeam_web3 = new Web3(
  "wss://wss.api.moonbase.moonbeam.network"
);

const block = async () => {
  moonbeam_web3.eth
    .subscribe(
      "newBlockHeaders",
      (error, result) => {
        if (error) console.error(error);
      }
    )
    .on("connected", function (subscriptionId) {
      console.log(subscriptionId);
    })
    .on("data", function (log) {
      console.log(log);
    });
};

export {
  get_owner,
  get_iotex_test_balance,
  get_contractBalance,
  get_report_hash_store_status,
  get_watch_store_status,
  store_reportHash,
  get_reward_amount,
  get_next_reward_time,
  store_watch,
  set_reward_amount,
  transfer_erc20,
};
