import express from "express";
import {
  recipeController,
  addFavorite,
  getAllFavourite,
  removeFavourite,
} from "../controllers/recipes.controller.js";
import authMiddleware from "../middleware/authMiddlware.js";

const router = express.Router();

router.get("/getAllRecipes", recipeController.fetchRecipesByCategory);
router.post("/addfavourite", authMiddleware, addFavorite);
router.get("/favouriterecipe", authMiddleware,getAllFavourite);
router.delete("/delete/:id", removeFavourite);

export default router;
