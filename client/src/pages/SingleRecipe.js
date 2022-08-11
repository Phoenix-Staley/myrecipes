import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import { Button  } from "antd";

import { QUERY_RECIPEBYID } from "../utils/queries";
import { SAVE_RECIPE } from "../utils/mutations";

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
        padding: "10vh 5vw",
        borderRadius: "10px"
    },
    image: {
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "5%",
        transform: "scale(2)",
        display: "inline",
        border: `ridge 3px ${colors.darkBlue}`,
        borderRadius: "5px"
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
    },
    divider: {
        width: "100%"
    },
    saveBtn: {
        width: "15%",
        backgroundColor: "#46c275",
        color: "black",
        border: "0px",
        margin: "0 auto"
    }
}

const Recipe = () => {
//   const { loading, data } = useQuery(QUERY_RECIPES);
//   const recipes = data?.recipes || [];
    const { recipeId } = useParams();
    const { loading, data } = useQuery(QUERY_RECIPEBYID, {
        variables: { recipeId }
    })
    const [isDescVisible, setIsDescVisible] = useState(true);
    const [areIngrVisible, setAreIngrVisible] = useState(true);
    const [areStepsVisible, setAreStepsVisible] = useState(true);
    console.log(data);

    const [saveRecipe] = useMutation(SAVE_RECIPE, {
        variables: {
            recipeId: recipeId,
            userId: Auth.getProfile()._id
        }
    });

    const currentRecipe = data;

    return data ? null : (
        <main>
            
        </main>
    );
};

export default Recipe;
