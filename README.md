# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Advaita-front 开发文档

目前已经实现存储报告/手表，并且设置转账金额完，成转账

未完成的任务：

1. 存储手表 / 存储哈希设计为API，当业务端有手表绑定 / 报告出具时自动发送请求进行存储
2. 24h/只能领取一次
3. 领取后个人可提现余额/合约余额更新

## 1 API 验证

## 1.1 验证要求

1. 验证访问的合法性
2. 参数不被修改
3. 确保请求的唯一性

```
http://localhost:3000/report/shiyivei02/02
```

1：对请求整体进行签名，添加签名字段

```
http://localhost:3000/report/shiyivei02/02/sign_value
```

2:  增加api_key字段，本地对应api_secret

```
http://localhost:3000/report/shiyivei02/02/api_key/sign_value
```

3: 增加timestamp字段和nonstr以确保请求的唯一性

```
http://localhost:3000/report/shiyivei02/02/ts/nonstr/api_key/sign_value
```

## 1.2 加密方案

使用AES对称加密



