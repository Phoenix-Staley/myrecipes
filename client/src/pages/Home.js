import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Divider, List  } from "antd";

import { QUERY_ALLRECIPES } from "../utils/queries";

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
    const { data } = useQuery(QUERY_ALLRECIPES);
    console.log("data:", data);
    const recipes = data?.allRecipes || [];
    console.log("recipes", recipes);

    return (
        <main>
            <img
                width={192}
                src="/logo192.png"
                className="logo"
            />
            <div style={styles.contentHolder} className="contentHolder">
                <Divider orientation="left" style={styles.listTitle}>Recent Recipes</Divider>
                <List
                    style={styles.recipeList}
                    bordered
                    dataSource={recipes}
                    renderItem={(recipe) => (
                            <List.Item style={styles.recipeItem}>
                                <Link to={`/recipe/${recipe._id}`} style={styles.recipeItem}>{recipe.title} -- {recipe.tags[0].name}</Link>
                            </List.Item>
                        )
                    }
                />
            </div>
        </main>
    );
};

export default Home;
