import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Styles used for this component
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

// Navigation options
const items = [
    {
        // How this is rendered
        label: (
            <Link to="/login">
                Login
            </Link>
        ),
        // How to refer to this option
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
        {/* Link to the homepage */}
        <Link to="/" style={styles.title} className="title">
            myrecipes
        </Link>
        <Menu mode="horizontal" items={items} theme={theme} />
    </div>
  );
};

export default Nav;