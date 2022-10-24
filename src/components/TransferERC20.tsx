import * as iotex from "../iotex";
import { useEffect, useState } from "react";
import "./css/Components.css";

import { Button, Form, Input } from "antd";
import { nanoid } from "nanoid";

const TransferERC20 = ({
  visible,
  onCreate,
  onCancel,
}: any) => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    console.log(
      "amount and address:",
      values.username,
      values.password
    );

    // 存储手表
    let imei: string = nanoid();
    const watch_status = await iotex.store_watch(
      imei
    );

    // 存储报告
    let report_hash: string = nanoid();
    const report_status =
      await iotex.store_reportHash(report_hash);

    // 设置转账金额
    const set_transfer_amount =
      await iotex.set_reward_amount(
        values.username
      );

    // 转账
    let token_address: string =
      "0xc72a1eb29caA01c74A88C49bcdEd19b326b17cFC";

    const balance1 =
      await iotex.get_contractBalance();
    console.log(
      "-------- transfer before --------:",
      balance1
    );

    const transfererc20 =
      await iotex.transfer_erc20(
        token_address,
        imei,
        report_hash,
        values.password
      );

    const balance2 =
      await iotex.get_contractBalance();
    console.log(
      "-------- after transfer --------:",
      balance2
    );

    if (balance1 - balance2 == values.username)
      console.log("transfer success");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      className="Form"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="Address">提现金额</div>
      <Form.Item
        className="TransferAmount"
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message:
              "Please input your username!",
          },
        ]}
      >
        <Input placeholder="请输入要提现的金额" />
      </Form.Item>

      <div className="Address">提现地址</div>
      <Form.Item
        className="TransferAddress"
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message:
              "Please input your password!",
          },
        ]}
      >
        <Input placeholder="请输入要提现的地址" />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <div className="Remember">
          <Checkbox>记住地址</Checkbox>
        </div>
      </Form.Item> */}
      <br />
      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button type="primary" htmlType="submit">
          提现
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransferERC20;
