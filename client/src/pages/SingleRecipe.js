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
        borderRadius: "5px",
        height: "121px",
        objectFit:"cover"
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
        width: "80%",
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
    },
    disabledBtn: {
        width: "15%",
        backgroundColor: "#068235",
        color: "black",
        border: "0px",
        margin: "0 auto"
    }
}

const Recipe = () => {
    const { recipeId } = useParams();
    const { loading, data } = useQuery(QUERY_RECIPEBYID, {
        variables: { id: recipeId }
    })
    const [isDescVisible, setIsDescVisible] = useState(true);
    const [areIngrVisible, setAreIngrVisible] = useState(true);
    const [areStepsVisible, setAreStepsVisible] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    const [saveRecipe] = useMutation(SAVE_RECIPE, {
        variables: {
            recipeId: recipeId,
            userId: Auth.getProfile().data._id
        }
    });

    const handleSave = async () => {
        await saveRecipe();
        if (!isSaved) {
            setIsSaved(true);
        }
    }

    const currentRecipe = data?.recipeById || {};

    return data ? (
        <main>
            <div style={styles.fullRecipe} className="contentHolder recipe">
                <img
                    width={192}
                    src={currentRecipe.image}
                    style={styles.image}
                />
                <h3 style={styles.recipeTitle}>{currentRecipe.title}</h3>
                <Link
                    to={`/user/${currentRecipe.creator._id}`}
                    style={styles.creatorLink}
                    className="creator"
                >
                    {currentRecipe.creator.username}
                </Link>
                
                <Button
                    style={isSaved ? styles.disabledBtn : styles.saveBtn}
                    onClick={handleSave}
                >Save</Button>
                
                <p style={styles.tags}>
                    {currentRecipe.tags.map(
                        (tag, i) => <span className="tag" key={i}>
                        {i > 0 && ", "}
                        <Link to={`/search/${tag.name}`}>{tag.name}</Link>
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
                        <h3 style={styles.hasColoredText}>Directions</h3>
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
                        <hr style={styles.divider} />
                        <h4 style={styles.sectionTitle}>Description</h4>
                        <p style={styles.description}>{currentRecipe.description}</p>
                    </>
                ) : <></>}

                

                {/* Only render ingredients if areIngrVisible is true */}
                {areIngrVisible ? (
                    <>
                        <hr style={styles.divider} />
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
                        <hr style={styles.divider} />
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
    ) : null;
};

export default Recipe;