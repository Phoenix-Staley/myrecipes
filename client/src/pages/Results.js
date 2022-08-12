import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { List } from "antd";

import SearchBar from "../components/SearchBar";

import { QUERY_RECIPESBYTAG } from "../utils/queries";

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
      margin: "0 auto",
    },
    listTitle: {
      color: "white",
    },
    recipeList: {
      backgroundColor: "cadetblue",
      fontWeight: "bold",
      textDecoration: "none",
    },
    recipeItem: {
      color: "black",
      textDecoration: "underline",
    },
  };

const Search = () => {
    const tag = useParams().tag;
    const { loading, data } = useQuery(QUERY_RECIPESBYTAG, {
        variables: { tag }
    });
    const results = data?.recipesByTag || [];

    return (
        <main>
            <SearchBar />
            {loading ? <h3>Loading...</h3> : (
                <div style={styles.contentHolder} className="contentHolder">
                    <List
                        style={styles.recipeList}
                        bordered
                        dataSource={results}
                        renderItem={(recipe) => (
                                <List.Item style={styles.recipeItem}>
                                    <Link to={`/recipe/${recipe._id}`} style={styles.recipeItem}>{recipe.title} -- {recipe.tags[0].name}</Link>
                                </List.Item>
                            )
                        }
                    />
                </div>
            )}
        </main>
    );
};

export default Search;