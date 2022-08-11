import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Auth from "./utils/auth";

import Home from "./pages/Home";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import SingleRecipe from "./pages/SingleRecipe";
import Search from "./pages/Search";
import Results from "./pages/Results";
import Donate from "./pages/Donate";
import Success from "./pages/Success";
import PostRecipeForm from "./pages/RecipeForm";

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

const styles = {
  body: {
    backgroundColor: "#04293A",
    minHeight: "100vh",
    padding: "1vh 0",
  },
};

function App() {
  const [theme, changeTheme] = useState("dark");

  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav theme={theme} />
        <div style={styles.body}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:username" element={<Profile />} />
            <Route path="/me" element={<Profile />} />
            <Route
              path="/recipe/:recipeId"
              element={Auth.loggedIn() ? <SingleRecipe /> : <LoginForm />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/recipeform" element={<PostRecipeForm />} />
            <Route
              path="/search"
              element={Auth.loggedIn() ? <Search /> : <LoginForm />}
            />
            <Route
              path="/search/:tag"
              element={Auth.loggedIn() ? <Results /> : <LoginForm />}
            />
            <Route path="/donate" element={<Donate />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </ApolloProvider>
  );
}

export default App;
