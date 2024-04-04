import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarRecipes from "./SimilarRecipes";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const RecipeDetails = () => {
  const param = useParams();
  // console.log("data", param.id);
  const apiKey = "40fef6056cdb4be29ff5c61a8647c7ad";
  const [recipeDetails, setRecipeDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${param.id}/information?apiKey=${apiKey}`
        );
        const data = await response.json();
        setRecipeDetails(data);
        setLoading(false);
        // console.log("recipe", data);
      } catch (e) {
        console.log("Error Fetching Data : ", e);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // console.log("recipeDetails:", recipeDetails);

  return (
    <div>
      {loading ? (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <img
            src="https://t4.ftcdn.net/jpg/03/16/15/47/360_F_316154790_pnHGQkERUumMbzAjkgQuRvDgzjAHkFaQ.jpg"
            alt=""
          />
        </div>
      ) : recipeDetails && Object.keys(recipeDetails).length !== 0 ? (
        <div className="w-3/5 shadow-xl mx-auto text-gray-500">
          <div className="my-10">
            <h1 className="text-4xl font-bold text-center my-10">
              {recipeDetails.title}
            </h1>
            <div>
              <img
                src={recipeDetails.image}
                alt="jpg"
                className=" mx-auto my-2 rounded-xl"
              />
              <div className="py-5 bg-gray-300 flex justify-between px-5">
                <p>
                  {recipeDetails.vegetarian ? "Vegetarian" : "Non - Vegetarian"}
                </p>
                <div className="flex justify-around w-1/2">
                  <p>
                    <span className="font-semibold text-gray-700">Time</span>
                    {recipeDetails.readyInMinutes} mins
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Cook</span>{" "}
                    {recipeDetails.preparationMinutes} mins
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Serves</span>{" "}
                    {recipeDetails.servings}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-around">
              <div className="">
                <h2 className="text-2xl my-3">Ingredients List</h2>
                <ol>
                  {recipeDetails.extendedIngredients.map((item, index) => (
                    <li key={index}>
                      <ArrowRightIcon />
                      {item.name}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="w-3/5">
                <h2 className="text-2xl my-3">Preparation</h2>
                <ol className="space-y-4">
                  {recipeDetails?.analyzedInstructions?.[0]?.steps?.map(
                    (item) => (
                      <li key={item.number} className="flex mr-4">
                        {" "}
                        <div className="rounded-full px-2 border my-auto mt-2 bg-slate-200 font-bold border-gray-800 mr-5">
                          {item.number}
                        </div>
                        {item.step}
                      </li>
                    )
                  )}
                </ol>
              </div>
            </div>
            <div className="flex my-10">
              <strong>Dish Type : </strong>
              <ol className="w-10/12  flex justify-between ml-10">
                {recipeDetails?.dishTypes?.map((item, index) => (
                  <li
                    key={index}
                    className="bg-slate-200 shadow-lg font-semibold py-2 px-5 rounded-xl "
                  >
                    {item.toUpperCase()}
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-x-5 mb-5">
              <strong>Source Name : </strong>
              {recipeDetails.sourceName}
            </div>
            <hr />
          </div>
          <SimilarRecipes id={param.id} />
        </div>
      ) : (
        <div className="text-6xl bg-slate-400 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold p-20 ">
          Oops!!! No Data Found
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
