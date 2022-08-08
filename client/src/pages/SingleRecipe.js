import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import { Divider, List  } from "antd";

// import { QUERY_RECIPES } from "../utils/queries";

const colors = {
    lightGold: "#ECB365",
    darkBlue: "#041C32",
    textColor: "white"
}

// The styles for various elements in this page
const styles = {
    fullRecipe: {
        display: "flex",
        flexDirection: "column",
        minHeight: "120vh",
        justifyContent: "flex-start",
        paddingTop: "46px",
        margin: "5vh auto",
        backgroundColor: "#064663",
        color: colors.textColor,
        padding: "10vh 5vw"
    },
    image: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "5%",
        transform: "scale(2)",
        display: "inline",
        border: `ridge 3px ${colors.darkBlue}`
    },
    recipeTitle: {
        fontSize: "xx-large",
        color: colors.lightGold,
        margin: "2vh auto",
        marginBottom: "0",
        display: "inline"
    },
    creatorLink: {
        margin: "0 auto",
        fontSize: "larger",
        marginBottom: "2vh",
        color: colors.textColor
    },
    sectionTitle: {
        fontSize: "xx-large",
        margin: "0 auto",
        color: colors.lightGold
    },
    description: {
        fontSize: "x-large"
    },
    tags: {
        fontSize: "larger",
        margin: "1vh auto",
        marginBottom: "5vh"
    },
    ingredients: {
        fontSize: "x-large"
    },
    checkboxHolder: {
        display: "flex",
        flexDirection: "flex-row",
        margin: "0 auto",
        width: "30%",
        padding: "1%",
        justifyContent: "center",
        backgroundColor: colors.darkBlue,
        borderRadius: "10px",
        marginBottom: "3%"
    },
    checkbox: {
        padding: "0 3%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center"
    },
    hasColoredText: {
        color: colors.lightGold
    }
}

const Home = () => {
//   const { loading, data } = useQuery(QUERY_RECIPES);
//   const recipes = data?.recipes || [];
    const { recipeId } = useParams();
    const [isDescVisible, setIsDescVisible] = useState(true);
    const [areIngrVisible, setAreIngrVisible] = useState(true);
    const [areStepsVisible, setAreStepsVisible] = useState(true);

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
                <Link
                    to={`/user/${currentRecipe.creator.username}`}
                    style={styles.creatorLink}
                    className="creator"
                >
                    {currentRecipe.creator.username}
                </Link>
                
                <h4 style={styles.sectionTitle}>Tags</h4>
                <p style={styles.tags}>
                    {currentRecipe.tags.map(
                        (tag, i) => <span className="tag" key={i}>
                        {i > 0 && ", "}
                        <Link to={`/search/${tag}`}>{tag}</Link>
                        </span>
                    )}
                </p>

                <div style={styles.checkboxHolder}>
                    <div style={styles.checkbox}>
                        <h3 style={styles.hasColoredText}>Description</h3>
                        <input
                            type="checkbox"
                            defaultChecked={isDescVisible}
                            onChange={(e) => setIsDescVisible(e.target.checked)}
                        />
                    </div>
                    <div style={styles.checkbox}>
                        <h3 style={styles.hasColoredText}>Ingredients</h3>
                        <input
                            type="checkbox"
                            defaultChecked={areIngrVisible}
                            onChange={(e) => setAreIngrVisible(e.target.checked)}
                        />
                    </div>
                    <div style={styles.checkbox}>
                        <h3 style={styles.hasColoredText}>Steps</h3>
                        <input
                            type="checkbox"
                            defaultChecked={areStepsVisible}
                            onChange={(e) => setAreStepsVisible(e.target.checked)}
                        />
                    </div>
                </div>

                {/* Only render description is isDescVisible is true */}
                {isDescVisible ? (
                    <>
                        <h4 style={styles.sectionTitle}>Description</h4>
                        <p style={styles.description}>{currentRecipe.description}</p>
                    </>
                ) : <></>}

                

                {/* Only render ingredients if areIngrVisible is true */}
                {areIngrVisible ? (
                    <>
                        <h3 style={styles.sectionTitle}>Ingredients</h3>
                        <ul style={styles.ingredients}>
                            {currentRecipe.ingredients.map(
                                (ingredient, i) => <li key={i}>{ingredient}</li>
                            )}
                        </ul>
                    </>
                ) : <></>}

                {/* Only render ingredients if areIngrVisible is true */}
                {areStepsVisible ? (
                    <>
                        <h3 style={styles.sectionTitle}>Directions</h3>
                        <ul style={styles.ingredients}>
                            {currentRecipe.steps.map(
                                (step, i) => <li key={i}>{step}</li>
                            )}
                        </ul>
                    </>
                ) : <></>}
                
            </div>
        </main>
    );
};

export default Home;
