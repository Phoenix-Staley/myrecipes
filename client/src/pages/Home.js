import React from "react";
import { useQuery } from "@apollo/client";

import { Carousel } from "antd";

// import { QUERY_THOUGHTS } from "../utils/queries";

const styles = {
    contentStyle: {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    }
}

const Home = () => {
//   const { loading, data } = useQuery(QUERY_RECIPES);
//   const recipes = data?.recipes || [];
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

  return (
    <main>
        <Carousel afterChange={onChange}>
            <div>
                <h3 style={styles.contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={styles.contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={styles.contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={styles.contentStyle}>4</h3>
            </div>
        </Carousel>
    </main>
  );
};

export default Home;
