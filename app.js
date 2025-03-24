import express from 'express';
import dotenv from 'dotenv';
import recipeRoutes from './Routes/recipe-Routes.js';
import userRoutes from './Routes/user_Routes.js';
import  Cors  from 'cors';

dotenv.config();
const app = express();
app.use(Cors());

const localIP = '192.168.43.55';
const PORT = process.env.PORT || 3000;


app.use(express.json());

import('./config/server.cjs').then((module) => {
    const { connectDB } = module;
    connectDB();
}).catch((err) => {
    console.error('Failed to load server.cjs:', err);
});

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, localIP, () => {
    console.log(`Server running at http:// ${localIP} : ${PORT}`);
});