import React, {Component} from "react";
import Login from "./pages/login/Login";
import Admin from "./pages/admin/Admin";

import {BrowserRouter, Route, Routes} from "react-router-dom";

/* アプリのルートApp*/
export default class App extends Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Admin/>}/>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}

