import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./ProductPage";
import "../App.css"; // Import CSS chung của toàn bộ ứng dụng nếu có
import "../assets/styles.css";

import AppHeader from "./Header";

import { Breadcrumb, Layout, theme } from "antd";

import { Content, Header } from "antd/es/layout/layout";

import Sidenav from "./Navbar";
import LoginForm from "./Login";

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout>
        {/* <AppHeader /> */}

        <Layout>
          <Sidenav />
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                padding: 24,
                margin: 20,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<ProductPage />} />
                {/* <Route path="/products" element={<ProductPage />} /> */}
                {/* <Route path="/home" />
                <Route path="/login" element={<LoginForm />} /> */}
                {/* Thêm các routes khác nếu cần */}
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default HomePage;
