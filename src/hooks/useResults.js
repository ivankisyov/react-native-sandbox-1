// better naming would be useRestaurants.js
import { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default () => {
  const [results, setResults] = useState([]); // step 1
  const [errorMessage, setErrorMessage] = useState(null);

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50, // step 2
          term: searchTerm,
          location: "san jose",
        },
      });
      setResults(response.data.businesses); // step 3
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  useEffect(() => {
    searchApi("pasta");
  }, []); // step 4

  return [searchApi, results, errorMessage]; // step 5
};
