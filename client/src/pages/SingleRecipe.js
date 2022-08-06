import React from "react";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import { Divider, List  } from "antd";

// import { QUERY_RECIPES } from "../utils/queries";

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
    },
    fullRecipe: {
        display: "flex",
        flexDirection: "column",
        height: "120vh",
        justifyContent: "flex-start",
        paddingTop: "46px",
        margin: "0 auto",
        backgroundColor: "rgb(66, 61, 58)",
        color: "white"
    },
    image: {
        marginLeft: "10%",
        display: "inline",
        transform: "translateY(9vh)"
    },
    recipeTitle: {
        fontSize: "xx-large",
        color: "white",
        marginTop: "2vh",
        marginLeft: "45%",
        display: "inline"
    }
}

const Home = () => {
//   const { loading, data } = useQuery(QUERY_RECIPES);
//   const recipes = data?.recipes || [];
    const { recipeId } = useParams();

    const data = [
        {
            _id: 1,
            description: "Best Hamburger Patty Recipe - Thick or thin, made on the grill or stovetop, this is the best and easiest all-purpose recipe for perfect hamburger patties every time! These juicy, delicious homemade hamburgers are ready in less than 30 minutes and are a must-make for your next cookout. Make burgers your way and have them come out flawless every time with what I consider to be the Best Hamburger Patty Recipe, in my humble opinion. It's a classic all-American recipe for mouthwatering burgers that can be cooked on the grill, on the stovetop, as thick 1/3 pound patties, or as ultra-thin griddle patties. Get ready, because you are about to make the burger of your dreams, people!",
            title: "Western Comfort Burger",
            ingredients: ["1 yellow onion", "1 whole tomato", "1/2 lbs ground beef", "Kosher salt", "1 tbsp ground black pepper", "2 hamburger buns", "Condiments"],
            steps: ["First, set out a large mixing bowl and add in the ground beef, crushed crackers, egg, Worcestershire sauce, milk, and spices. Use your hands to thoroughly combine until the mixture is very smooth.", "Next, press the meat down in the bowl, into an even disk. Use a knife to cut and divide the hamburger patty mixture into 6 and 1/3 pound grill or skillet patties, or 12 thin griddle patties. Like so:", "Set out a baking sheet, lined with wax paper or foil, to hold the patties. One at a time, gather the patty mix and press firmly into patties of your desired thickness. You typically want hamburger patties to be slightly larger than the buns they'll be served on since they'll shrink a bit in the cooking process.", "Place the formed patties on the baking sheet. With thick patties, press a dent in the center of each patty, so they don't puff up while cooking.", "You can stack the patties with sheets of wax paper between layers if needed.", "Then, preheat the grill or a skillet to medium heat, approximately 350-400 degrees F."],
            image: "https://myrecipesbucket-abps.s3.us-west-2.amazonaws.com/burger.jpg",
            creator: {
                username: "Bob's Burgers",
                firstName: "Bob",
                lastName: "Doe"
            },
            tags: ["Burger", "Western", "Dinner"],
        }
    ]

    const currentRecipe = data[recipeId - 1];

    return (
        <main>
            
            <div style={styles.fullRecipe} className="contentHolder recipe">
                <img
                    width={192}
                    src={currentRecipe.image}
                    style={styles.image}
                />
                <h3 style={styles.recipeTitle}>{currentRecipe.title}</h3>
                <Divider orientation="left" style={styles.listTitle}>Recent Recipes</Divider>
                <List
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
