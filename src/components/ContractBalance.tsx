import * as iotex from "../iotex";
import { useEffect, useState } from "react";
import "./css/Components.css";

// 组件使用钩子参数
const Contract_balance = ({
  balance,
  setBalance,
}: {
  balance: any;
  setBalance: any;
}) => {
  // 使用异步函数获取资源请求结果，并更新值
  const getContractBalance = async () => {
    const currentBalance =
      await iotex.get_contractBalance();
    // console.log(
    //   "-------- contract balance --------:",
    //   currentBalance
    // );
    if (currentBalance) {
      setBalance(currentBalance);
    }
  };

  //
  useEffect(() => {
    getContractBalance();
  }, []);

  return (
    <>
      <div>
        <div>{balance}</div>
      </div>
    </>
  );
};

export default Contract_balance;
