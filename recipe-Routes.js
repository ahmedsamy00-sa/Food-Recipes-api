import express from 'express';
import { getAllRecipesHandler, getRecipeByNameHandler, searchRecipesByIngredientHandler } from '../controller/recipe-controller.js';

const router = express.Router();

router.get('/', getAllRecipesHandler);

router.get('/:name', getRecipeByNameHandler);

router.get('/search', searchRecipesByIngredientHandler);

export default router;