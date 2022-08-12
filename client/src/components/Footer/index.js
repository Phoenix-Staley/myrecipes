import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

// Styles used for this component
const styles = {
    title: {
        position: "fixed",
        bottom: "0",
        color: "white",
        fontSize: "larger",
        fontWeight: "bold",
        fontStyle: "italic"
    }
};

const items = [
    {
        label: (
            <Link to="/donate">
                Donate to fight hunger
            </Link>
        ),
        key: "donate"
    }
];

const Footer = () => {
    return (
        <div style={styles.title}>
            {/* Show the user sign in options if they're logged out, otherwise show them a home/profile button */}
            <Menu mode="horizontal" items={items} theme={"dark"} />
        </div>
    );
};

export default Footer;