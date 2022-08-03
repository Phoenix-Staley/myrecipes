import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const styles = {
    title: {
        position: "absolute",
        marginTop: "10px",
        marginLeft: "10px",
        color: "white",
        fontSize: "larger",
        fontWeight: "bold",
        fontStyle: "italic"
    }
}

const items = [
    {
        label: (
            <Link to="/login">
                Login
            </Link>
        ),
        key: "login"
    },
    {
        label: (
            <Link to="/signup">
                Sign Up
            </Link>
        ),
        key: "signUp"
    }
];

const Nav = ({ theme }) => {
  return (
    <div>
        <Link to="/" style={styles.title} className="title">
            myrecipes
        </Link>
        <Menu mode="horizontal" items={items} theme={theme} />
    </div>
  );
};

export default Nav;