import { AutoComplete } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_TAGS } from "../../utils/queries";

const { Option } = AutoComplete;

const styles = {
    searchPage: {
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "15vh"
    },
    searchBar: {
        width: "50%",
        marginTop: "auto",
        marginBottom: "auto"
    },
    searchBtn: {
        marginLeft: "1%",
        backgroundColor: "#ECB365",
        borderRadius: "6px",
        border: "white dashed 1px",
        fontSize: "larger",
        cursor: "pointer"
    },
    subtitle: {
        color: "white",
        width: "100%",
        textAlign: "center"
    }
}

const Search = () => {
    const { data } = useQuery(QUERY_TAGS);
    const allTags = data?.tags || [];
    const [result, setResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (value) => {
        let res = [];

        if (!value || !allTags[0]) {
            res = [];
        } else {
            res = allTags.filter((tag) => {
                return tag.name.startsWith(value.toLowerCase());
            });
        }

        setResult(res);
        setSearchTerm(value);
    };

    const loadResults = (event) => {
        navigate(`/search/${searchTerm.toLowerCase()}`);
    }

    return (
        <>
            
            <div style={styles.searchPage} className="contentHolder">
                <AutoComplete
                    style={styles.searchBar}
                    onChange={handleSearch}
                    placeholder="Input here"
                >
                    {result.map((suggestion) => (
                        <Option key={suggestion.name} value={suggestion.name}>
                        {suggestion.name}
                        </Option>
                    ))}
                </AutoComplete>
                <button className="searchBtn" onClick={loadResults} style={styles.searchBtn}>Search</button>
            </div>
            <p style={styles.subtitle}>Recipe tag (I.E. 'vegan' or 'breakfast')</p>
        </>
    );
};

export default Search;