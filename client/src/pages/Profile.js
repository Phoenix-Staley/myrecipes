import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import { QUERY_USER } from "../utils/queries";

import { List } from "antd";

const colors = {
    lightGold: "#ECB365",
    darkBlue: "#041C32",
    textColor: "white"
}

const tabBorderStyle = "1px solid black";

// The styles for various elements in this page
const styles = {
    authError: {
        width: "100%",
        textAlign: "center",
        marginTop: "20%",
        color: colors.textColor,
        fontSize: "x-large"
    },
    header: {
        margin: "2vh auto",
        textAlign: "left",
        backgroundColor: colors.lightGold,
        borderRadius: "15px 15px 0 0",
        padding: "1%",
        fontSize: "x-large",
        marginBottom: "0"
    },
    subtitle: {
        fontSize: "large"
    },
    tabs: {
        backgroundColor: colors.darkBlue,
        margin: "0 auto"
    },
    selected: {
        backgroundColor: colors.darkBlue,
        color: colors.textColor,
        borderBottom: "0",
        width: "50%",
        cursor: "pointer"
    },
    unselected: {
        backgroundColor: colors.lightGold,
        border: tabBorderStyle,
        width: "50%",
        cursor: "pointer"
    },
    list: {
        backgroundColor: "cadetblue",
        margin: "0 auto",
        border: "0",
        minHeight: "75vh",
        borderRadius: "0 0 25px 25px"
    },
    recipeItem: {
        borderBottom: "2px dashed black"
    },
    recipeName: {
        color: "black",
        textDecoration: "underline"
    },
    subtitle: {
        backgroundColor: colors.darkBlue,
        color: "white",
        textAlign: "center",
        margin: "0 auto",
        marginBottom: "0",
        border: tabBorderStyle,
        fontSize: "x-large"
    }
}

const Profile = () => {
    const { userId } = useParams();
    const { firstName, lastName } = Auth.getProfile().data;
    const [currentTab, setCurrentTab] = useState("saved");

    const idToUse = userId ? userId : Auth.getProfile().data._id;

    const { data } = useQuery(QUERY_USER, {
        variables: { id: idToUse }
    });

    const user = data?.user || {};

    const changeTab = (tab) => {
        // Don't change state if you're already on the selected tab
        if (tab !== currentTab) {
            setCurrentTab(tab);
        }
    }

    if (!Auth.loggedIn()) {
        return (
            <main>
                <h3 style={styles.authError}>You must be logged in to view your profile.</h3>
            </main>
        );
    }

    // Render differently if this is your own profile
    if (!userId) {
        return data ? (
            <main>
                <div style={styles.header} className="contentHolder">
                    <h3>Welcome, {firstName + " " + lastName}!</h3>
                </div>
                <div style={styles.tabs} className="contentHolder">
                    <button
                        style={currentTab === "saved" ? styles.selected : styles.unselected}
                        onClick={(event) => changeTab("saved")}
                    >Saved</button>
                    <button
                        style={currentTab === "posted" ? styles.selected : styles.unselected}
                        onClick={(event) => changeTab("posted")}
                    >Posted</button>
                </div>
                <div style={styles.list} className="contentHolder">
                    <List
                        style={styles.list}
                        bordered
                        dataSource={currentTab === "saved" ? user.savedRecipes : user.postedRecipes}
                        renderItem={(item) => (
                            <List.Item style={styles.recipeItem}>
                                <Link to={`/recipe/${item._id}`} style={styles.recipeName}>{`${item.title} -- ${item.tags[0].name}`}</Link>
                            </List.Item>
                        )}
                    />
                </div>
            </main>
        ) : <div>Loading...</div>;
    }

    return (
        <main>
            <div style={styles.header} className="contentHolder">
                <h1>{user.firstName + " " + user.lastName}</h1>
            </div>
            <div style={styles.subtitle} className="contentHolder">
                <h3 style={styles.subtitle}>Posted</h3>
            </div>
            <div style={styles.list} className="contentHolder">
                <List
                    style={styles.list}
                    bordered
                    dataSource={user.postedRecipes}
                    renderItem={(item) => (
                        <List.Item style={styles.recipeItem}>
                            <Link to={`/recipe/${item._id}`} style={styles.recipeName}>{`${item.title} -- ${item.tags[0].name}`}</Link>
                        </List.Item>
                    )}
                />
            </div>
        </main>
    )
};

export default Profile;
