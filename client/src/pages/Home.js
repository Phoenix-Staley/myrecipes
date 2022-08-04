import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Divider, List, Typography  } from "antd";

// import { QUERY_THOUGHTS } from "../utils/queries";

// The styles for various elements in this page
const styles = {
    contentStyle: {
        height: "260px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    },
    contentHolder: {
        display: "flex",
        flexDirection: "column",
        height: "120vh",
        justifyContent: "flex-start",
        paddingTop: "46px",
        margin: "0 auto"
    },
    listTitle: {
        color: "white"
    },
    recipeList: {
        backgroundColor: "cadetblue",
        fontWeight: "bold",
        textDecoration: "none"
    },
    recipeItem: {
        color: "black",
        textDecoration: "underline"
    }
}

const Home = () => {
//   const { loading, data } = useQuery(QUERY_RECIPES);
//   const recipes = data?.recipes || [];

    const data = [
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
        },
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

    return (
        <main>
            <div style={styles.contentHolder} className="contentHolder">
                <Divider orientation="left" style={styles.listTitle}>Recent Recipes</Divider>
                <List
                    header={<div>Recipes</div>}
                    style={styles.recipeList}
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item style={styles.recipeItem}>
                            <Link to={`/recipes/${item.id}`} style={styles.recipeItem}>{item.title} -- {item.tags[0]}</Link>
                        </List.Item>
                    )}
                />
            </div>
        </main>
    );
};

export default Home;
