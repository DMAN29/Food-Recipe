import React, { useEffect, useState } from "react";
import Card from "./Card";

const HomePage = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = "40fef6056cdb4be29ff5c61a8647c7ad";
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100`
        );
        const data = await response.json();
        setRecipeList(data?.results);
        setLoading(false);
      } catch (e) {
        console.log("Error Fetching Data : ", e);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  //   console.log("recipeList", recipeList);

  return (
    <div>
      {loading ? (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <img
            src="https://t4.ftcdn.net/jpg/03/16/15/47/360_F_316154790_pnHGQkERUumMbzAjkgQuRvDgzjAHkFaQ.jpg"
            alt=""
          />
        </div>
      ) : recipeList && recipeList.length > 0 ? (
        <>
          <div className="text-6xl text-center mt-5 font-bold">Recipes</div>
          <div className="justify-around my-10 flex flex-wrap">
            {recipeList.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-6xl bg-slate-400 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] font-bold p-20 ">
          Oops!!! No Data Found
        </div>
      )}
    </div>
  );
};

export default HomePage;
