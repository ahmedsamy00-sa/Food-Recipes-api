import pkg from '../config/server.cjs';
const { sql } = pkg;

const getAllRecipes = async () => {
    const result = await sql.query`SELECT * FROM Recipes`;
    return result.recordset;
};

const getRecipeByName = async (Name) => {
    try {
        const result = await sql.query`SELECT * FROM Recipes WHERE Name = ${Name}`;
        
        if (result.recordset.length === 0) {
            return null; 
        }
        return result.recordset[0]; 
    } catch (err) { 
        console.error('Error fetching recipe by name:', err);
        throw new Error('Failed to fetch recipe');
    }
};
const searchRecipesByIngredient = async (ingredientName) => {
    try {
        console.log('Executing query for ingredient:', ingredientName); 
        const result = await sql.query`
            SELECT 
                R.Recipe_id,
                R.Name AS Recipe_Name,
                R.Image_url,
                R.Video_link,
                R.Instructions
            FROM 
                Recipes R
            JOIN 
                Recipe_Ingredients RI ON R.Recipe_id = RI.RE_id
            JOIN 
                Ingredients I ON RI.ING_id = I.Ingredient_id
            WHERE 
                LOWER(I.Name) LIKE '%' + LOWER(${ingredientName}) + '%'
        `;
        console.log('Query results:', result.recordset); 
        return result.recordset;
    } catch (err) {
        console.error('Database query error:', err.message); 
        throw new Error(err.message);
    }
};

export { getAllRecipes, getRecipeByName, searchRecipesByIngredient };