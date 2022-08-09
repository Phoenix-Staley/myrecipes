import React from "react";

import pageNotFound from "../assets/pageNotFound.svg";

const noMatch = () => {
  return (
    <main>
        <div
            style={{
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "grey",
                borderRadius: "20%"
            }}
        >
            <img src={pageNotFound} />
        </div>
      
    </main>
  );
};

export default noMatch;
