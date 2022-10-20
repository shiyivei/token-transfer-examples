import * as iotex from "../iotex";
import { useEffect, useState } from "react";
import "./css/Components.css";
import {
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
// 组件使用钩子参数
const ERC20_balance = ({
  erc20Balance,
  setErc20Balance,
}: {
  erc20Balance: any;
  setErc20Balance: any;
}) => {
  // 使用异步函数获取资源请求结果，并更新值
  const getContractBalance = async () => {
    const currentBalance =
      await iotex.get_user_asset(
        "chenhongjun@advaita.world"
      );
    // console.log(
    //   "-------- contract balance --------:",
    //   currentBalance
    // );
    if (currentBalance) {
      setErc20Balance(currentBalance);
    }
  };

  //
  useEffect(() => {
    getContractBalance();
  }, []);

  return (
    <>
      <div>
        <Input.Group compact>
          <Input placeholder="请输入邮箱" />
          <Button type="primary">
            查询可提现余额
          </Button>
        </Input.Group>
        <div>{erc20Balance}</div>
      </div>
    </>
  );
};

export default ERC20_balance;
