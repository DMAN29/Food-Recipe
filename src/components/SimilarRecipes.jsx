import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SimilarRecipes = () => {
  const { id } = useParams();
  const apiKey = "40fef6056cdb4be29ff5c61a8647c7ad";
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`
        );
        const data = await response.json();
        setSimilar(data);
      } catch (error) {
        console.log("Error Fetching Data : ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <img
            src="https://t4.ftcdn.net/jpg/03/16/15/47/360_F_316154790_pnHGQkERUumMbzAjkgQuRvDgzjAHkFaQ.jpg"
            alt=""
          />
        </div>
      ) : (
        <>
          {similar && similar.length > 0 && (
            <div className=" my-10">
              <h1 className="text-2xl mb-5 font-semibold text-center">
                Similar Recipes
              </h1>
              <div className="px-10 flex flex-wrap justify-around">
                {similar.map((item) => (
                  <div key={item.id} className="border p-2 w-2/5 my-5">
                    <p className="text-xl font-semibold text-center">
                      {item.title}
                    </p>
                    <div className="flex justify-around">
                      <p>
                        <strong>Time : </strong>
                        {item.readyInMinutes} mins
                      </p>
                      <p>
                        <strong>Serve: </strong>
                        {item.servings}
                      </p>
                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ display: "flex", marginX: "auto" }}
                    >
                      <a href={item.sourceUrl} target="_blank">
                        Get Recipe
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SimilarRecipes;
