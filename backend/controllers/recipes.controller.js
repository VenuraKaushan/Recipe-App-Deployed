import Receipe from "../models/recipe.model.js";
import axios from "axios";

//Get all categories from the api
export const recipeController = {
  fetchRecipesByCategory: async (req, res) => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const categories = response.data.categories;
      console.log(categories)

      if (!categories) {
        return res.status(404).json({ message: "Categories not found" });
      }

      res.status(200).json({ categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Add new receipes
export const addFavorite = async (req, res) => {
  const { idCategory, strCategory, strCategoryThumb, strCategoryDescription } =
    req.body;
  console.log(req.user);

  try {
    const newFavorite = new Receipe({
      idCategory,
      strCategory,
      strCategoryThumb,
      strCategoryDescription,
      userId: req.user, // Associate the recipe with the authenticated user
    });
    await newFavorite.save();
    res.status(201).send("Recipe saved as favorite!");
  } catch (error) {
    res.status(500).send("Error saving the recipe: " + error.message);
  }
};

// View all receipes
export const getAllFavourite = async (req, res) => {
  try {
    const favouriteReceipe = await Receipe.find({ userId: req.user }); // Only fetch recipes created by the authenticated user
    res.status(200).json(favouriteReceipe);
  } catch (error) {
    // console.log(error.message)
    res
      .status(500)
      .json({ message: "Failed to fetch Receipe", error: error.message });
  }
};

//Remove receipe from favourite
export const removeFavourite = async (req, res) => {
  const _id = req.params.id;
  try {
    const receipeRemove = await Receipe.findByIdAndDelete(_id);

    if (!receipeRemove) {
      return res.status(404).json({ message: "Receipe not found" });
    }

    res.status(200).json({ message: "Receipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Receipe", error });
  }
};
