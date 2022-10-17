import React from "react";
import "./css/Reward.css";

// 1. 通过接口声明参数(多个)
interface IPropos {
  address?: string; //通过问号让类型可选传递
  balance?: number;
  onMyClick: any;
}

// 状态管理
interface IState {
  count: number;
}

// 2. 以范型的形式绑定类型（这里的propos实际上就值得是接口本身）
export default class Reward extends React.Component<
  IPropos,
  IState
> {
  // 通过constructor 初始化参数
  public constructor(props: any) {
    super(props);
    //修改值的时候需要在构造函数中初始化,而不是readonly,this 就指的的本组件,所有的都建议在constructor中声明
    this.state = {
      count: 0,
    };

    //把下面定义的clickHandler绑定给本组件的clickHandler
    this.clickHandler =
      this.clickHandler.bind(this);

    //继续声明
    this.clickMsgHandler =
      this.clickMsgHandler.bind(this);
  }

  // 这里是初始化状态,渲染时不用在另一个组件中指定，问题来了初始化以后怎么指定呢
  // public readonly state: Readonly<IState> = {
  //   count: 1000,
  // };

  public clickHandler() {
    console.log("clickHandler");
  }

  public clickMsgHandler() {
    this.props.onMyClick();
  }

  public render() {
    // 3. 调用数据和状态
    const { address } = this.props;
    const { count } = this.state;
    // const { balance } = get_iotex_test_balance();
    // 4. 参数渲染的时候会像组件的样式一样使用：如<div style = "color: black">
    // 5. 但是这种方式只是传个值过去，具体的值还是要在App,tsx中再指定

    return (
      <>
        {/* <div>{address}</div> */}
        <div>{count}</div>
        <div className="Change-balance">
          <button onClick={this.clickHandler}>
            查看可提现余额
          </button>
        </div>
        <div className="Send-Message">
          <button onClick={this.clickMsgHandler}>
            发送信息
          </button>
        </div>
      </>
    );
  }
}

console.log(
  "hello, welcome to the reward contract !"
);
