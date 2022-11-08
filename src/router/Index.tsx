import * as iotex from "../iotex";
import { useEffect, useState } from "react";
import Report from "../pages/Report";
import Watch from "../pages/Watch";
import Bought from "../pages/Bought";
import Received from "../pages/Received";
import App from "../App";

import {
  BrowserRouter, //相当于路由模式的history
  Routes,
  Route,
} from "react-router-dom";

const URLRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/report/:hash/:ts/:nonce/:api_key/:signature"
            element={<Report />}
          ></Route>
          <Route
            path="/watch/:imei/:ts/:nonce/:api_key/:signature"
            element={<Watch />}
          ></Route>
          <Route
            path="/bought/:order_id/:ts/:nonce/:api_key/:signature"
            element={<Bought />}
          ></Route>
          <Route
            path="/receive/:receive_id/:ts/:nonce/:api_key/:signature"
            element={<Received />}
          ></Route>
          <Route
            path="/"
            element={<App />}
          ></Route>
          <Route
            path="/assets/:id/:ts/:nonce/:api_key/:signature"
            element={<App />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default URLRouter;
