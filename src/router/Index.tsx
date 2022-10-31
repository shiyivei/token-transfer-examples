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
            path="/report/:hash"
            element={<Report />}
          ></Route>
          <Route
            path="/watch/:imei"
            element={<Watch />}
          ></Route>
          <Route
            path="/bought/:order_id"
            element={<Bought />}
          ></Route>
          <Route
            path="/receive/:receive_id"
            element={<Received />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <App />
    </>
  );
};

export default URLRouter;
