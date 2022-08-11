import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

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
//   const { data } = useQuery(QUERY_USER);
//   const userData = data?.recipes || [];
    const { username } = useParams();
    const { firstName, lastName } = Auth.getProfile().data;
    const [currentTab, setCurrentTab] = useState("saved");

    const changeTab = (tab) => {
        // Don't change state if it wouldn't change anything
        if (tab !== currentTab) {
            setCurrentTab(tab);
        }
    }

    const data1 = [
        {
            _id: 1,
            description: "A delicious western-style burger",
            title: "Western Comfort Burger",
            ingredients: ["1 yellow onion", "1 whole tomato", "1/2 lbs ground beef", "Kosher salt", "1 tbsp ground black pepper", "2 hamburger buns", "Condiments"],
            steps: ["First, set out a large mixing bowl and add in the ground beef, crushed crackers, egg, Worcestershire sauce, milk, and spices. Use your hands to thoroughly combine until the mixture is very smooth.", "Next, press the meat down in the bowl, into an even disk. Use a knife to cut and divide the hamburger patty mixture into 6 and 1/3 pound grill or skillet patties, or 12 thin griddle patties. Like so:", "Set out a baking sheet, lined with wax paper or foil, to hold the patties. One at a time, gather the patty mix and press firmly into patties of your desired thickness. You typically want hamburger patties to be slightly larger than the buns they’ll be served on since they’ll shrink a bit in the cooking process.", "Place the formed patties on the baking sheet. With thick patties, press a dent in the center of each patty, so they don’t puff up while cooking.", "You can stack the patties with sheets of wax paper between layers if needed.", "Then, preheat the grill or a skillet to medium heat, approximately 350-400 degrees F."],
            image: "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/burger.jpg",
            creator: {
                username: "Bob's Burgers"
            },
            tags: ["Burger", "Western", "Dinner"],
        }
    ]

    const data2 = [
        {
            _id: 2,
            description: "Soft avocado sliced on a piece of whole-grain toast",
            title: "World's Best Avocado Toast",
            image: "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/Avocado_toast.png",
            creator: {
                username: "Mia the Millennial"
            },
            tags: ["Breakfast", "Healthy"],
        },
        {
            _id: 3,
            description: "Soft avocado sliced on a piece of whole-grain toast",
            title: "Blueberry Scones w/ Icing",
            image: "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/Avocado_toast.png",
            creator: {
                username: "Mia the Millennial"
            },
            tags: ["Breakfast", "Dessert"],
        }
    ]

    if (!Auth.loggedIn()) {
        return (
            <main>
                <h3 style={styles.authError}>You must be logged in to view your profile.</h3>
            </main>
        );
    }
    if (!username) return (
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
                    dataSource={currentTab === "saved" ? data1 : data2}
                    renderItem={(item) => (
                        <List.Item style={styles.recipeItem}>
                            <Link to={`/recipe/${item._id}`} style={styles.recipeName}>{item.title} -- {item.tags[0]}</Link>
                        </List.Item>
                    )}
                />
            </div>
        </main>
    );

    const user = {
        username: username,
        firstName: "John",
        lastName: "Doe"
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
                    dataSource={data2}
                    renderItem={(item) => (
                        <List.Item style={styles.recipeItem}>
                            <Link to={`/recipe/${item._id}`} style={styles.recipeName}>{item.title} -- {item.tags[0]}</Link>
                        </List.Item>
                    )}
                />
            </div>
        </main>
    )
};

export default Profile;
