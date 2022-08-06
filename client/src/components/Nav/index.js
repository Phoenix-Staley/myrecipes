import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

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

// Navigation options when logged out
const loggedOutItems = [
    {
        label: (
            <Link to="/">
                Home
            </Link>
        ),
        key: "home"
    },
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

// Navigation options when logged in
const loggedInItems = [
    {
        label: (
            <Link to="/">
                Home
            </Link>
        ),
        key: "home"
    },
    {
        // How this is rendered
        label: (
            <Link to="/me">
                Profile
            </Link>
        ),
        // How to refer to this option
        key: "profile"
    },
    {
        label: (
            <btn onClick={Auth.logout}>Logout</btn>
        ),
        key: "logout"
    }
];

const Nav = ({ theme }) => {
    return (
        <div>
            {/* Link to the homepage */}
            <Link to="/" style={styles.title} className="title">
                myrecipes
            </Link>
            {/* Show the user sign in options if they're logged out, otherwise show them a home/profile button */}
            <Menu mode="horizontal" items={Auth.loggedIn() ? loggedInItems : loggedOutItems} theme={theme} />
        </div>
    );
};

export default Nav;