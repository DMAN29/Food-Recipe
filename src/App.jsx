import React from "react";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/recipe/:id" Component={RecipeDetails} />
      </Routes>
    </>
  );
};

export default App;
