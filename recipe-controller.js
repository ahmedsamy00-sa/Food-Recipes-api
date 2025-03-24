import { getAllRecipes, getRecipeByName, searchRecipesByIngredient } from '../module/recipe.js';

const getAllRecipesHandler = async (req, res) => {
    try {
        const recipes = await getAllRecipes();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRecipeByNameHandler = async (req, res) => {
    const { name } = req.params;
    try {
        const recipe = await getRecipeByName(name);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const searchRecipesByIngredientHandler = async (req, res) => {
    try {
        const { ingredientName } = req.query;
        console.log('Received ingredientName:', ingredientName); 

        // Validate input
        if (!ingredientName || typeof ingredientName !== 'string') {
            return res.status(400).json({ message: 'Ingredient name is required and must be a string' });
        }

        const trimmedIngredient = ingredientName.trim();
        if (!trimmedIngredient) {
            return res.status(400).json({ message: 'Ingredient name cannot be empty' });
        }

        const recipes = await searchRecipesByIngredient(trimmedIngredient);

        if (!recipes || recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found for the specified ingredient' });
        }

        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { getAllRecipesHandler, getRecipeByNameHandler, searchRecipesByIngredientHandler };