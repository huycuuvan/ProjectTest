import { Menu, Button, theme } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import "../assets/styles.css";
import {
  UserOutlined,
  LoginOutlined,
  RegisterOutlined,
} from "@ant-design/icons";
import React from "react";
import Sider from "antd/es/layout/Sider";
import { useAuth } from "./AuthContext";

function Sidenav() {
  const { user, logout } = useAuth(); // Lấy thông tin người dùng và hàm logout từ context

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Định nghĩa các mục menu dựa trên trạng thái đăng nhập
  const items = user
    ? [
        {
          key: "profile",
          icon: <UserOutlined style={{ padding: "0px" }} />,
          label: (
            <span>
              {user.firstName + user.lastName} {/* Hiển thị tên người dùng */}
              <Button onClick={logout} style={{ float: "right" }}>
                Logout
              </Button>
            </span>
          ),
        },
      ]
    : [
        {
          key: "login",
          icon: <LoginOutlined />,
          label: <NavLink to="/login">Login</NavLink>,
        },
        {
          key: "register",
          // icon: <RegisterOutlined />,
          label: <NavLink to="/register">Register</NavLink>,
        },
      ];

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={false}
        width={250}
        theme="dark"
      >
        <Menu mode="inline" theme="dark">
          {user ? (
            <Menu.Item key="profile" style={{ padding: "0 16px" }}>
              <UserOutlined />
              <span style={{ marginLeft: 8 }}>
                {user.firstName + " " + user.lastName}
              </span>
              <Button
                onClick={logout}
                type="link"
                style={{
                  float: "right",
                  padding: 0,
                  marginLeft: 16,
                  lineHeight: "inherit",
                  color: "#fff",
                }}
              >
                Logout
              </Button>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="login">
                <a href="/login">Login</a>
              </Menu.Item>
              <Menu.Item key="register">
                <a href="/register">Register</a>
              </Menu.Item>
            </>
          )}
          <Menu.Item key="home">
            <a href="/home">Home</a>
          </Menu.Item>
          <Menu.Item key="products">
            <a href="/products">Products</a>
          </Menu.Item>
          {/* Thêm các mục menu khác nếu cần */}
        </Menu>
      </Sider>
    </>
  );
}

export default Sidenav;
