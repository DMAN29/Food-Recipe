import { Button } from "@mui/material";
import React from "react";
import RecipeDetails from "./RecipeDetails";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="w-96 border text-center shadow-xl rounded-lg hover:scale-105 duration-300 ease-in-out mt-10 py-10">
      <img src={data.image} alt={data.imageType} className="mx-auto" />
      <p className="text-xl font-mono font-bold py-5">{data.title}</p>
      <Button
        variant="contained"
        color="success"
        onClick={() => navigate(`/recipe/${data.id}`)}
      >
        Get Recipe
      </Button>
    </div>
  );
};

export default Card;
