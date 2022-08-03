import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* <Nav /> */}
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            {/* <Route
              path="/:username"
              element={<Profile />}
            />
            <Route
              path="/me"
              element={<Profile />}
            />
            <Route
              path="/recipe/:recipeId"
              element={<Recipe />}
            />
            <Route
              path="/login"
              element={<loginForm />}
            />
            <Route
              path="/signup"
              element={<signupForm />}
            /> */}
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    // </ApolloProvider>
  );
}

export default App;
