import * as iotex from "../iotex";
import { useEffect, useState } from "react";
import "./css/Components.css";
import { Button, Form, Input } from "antd";

// 组件使用钩子参数
const ERC20_balance = ({
  erc20Balance,
  setErc20Balance,
}: {
  erc20Balance: any;
  setErc20Balance: any;
}) => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    console.log("email:", values.username);

    const currentBalance =
      await iotex.get_user_asset(values.username);
    console.log(
      "-------- ART balance --------:",
      currentBalance
    );
    if (currentBalance) {
      setErc20Balance(currentBalance);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <div className="InputEmail">
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
            <div className="Address">
              <div className="Erc20Balance">
                {erc20Balance} {}ART
              </div>
              <div className="QueryBalance">
                可提现余额
              </div>
            </div>
            <div className="QueryErc20Balance">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入邮箱",
                  },
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>

              <br />

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                >
                  查询余额
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ERC20_balance;
