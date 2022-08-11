import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";

import { QUERY_USER } from "../utils/queries";

const Search = () => {
    const tag = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { tag }
    });

    return (
        <main>
            <SearchBar />
            {loading ? <h3>Loading...</h3> : (
                <h3>data</h3>
            )}
        </main>
    );
};

export default Search;