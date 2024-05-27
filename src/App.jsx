import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./component/ProductPage";
import "./App.css"; // Import CSS chung của toàn bộ ứng dụng nếu có
import "./assets/styles.css";

import AppHeader from "./component/Header";

import { Breadcrumb, Layout, theme } from "antd";

import { Content, Header } from "antd/es/layout/layout";

import Sidenav from "./component/Navbar";
import LoginForm from "./component/Login";
import HomePage from "./component/Home";
import { AuthProvider } from "./component/AuthContext"; // Import AuthProvider

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
          {/* Thêm các route khác nếu cần */}
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
