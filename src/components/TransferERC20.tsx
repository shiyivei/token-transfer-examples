import * as iotex from "../iotex";
import { useEffect, useState } from "react";
import "./css/Components.css";

import { Button, Form, Input } from "antd";

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

    const watch_status = await iotex.store_watch(
      values.username
    );

    const report_status =
      await iotex.store_reportHash(
        values.password
      );

    console.log(
      "-------- watch_status --------:",
      watch_status
    );

    console.log(
      "-------- report_status --------:",
      report_status
    );

    let ART_balance;
    await iotex
      .get_user_asset(values.username)
      .then((res) => {
        ART_balance = res;

        return ART_balance;
      });

    console.log(
      "获取到的用户ART余额是:",
      ART_balance
    );
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
      <div className="Address">提现总额</div>
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
      <br />
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
