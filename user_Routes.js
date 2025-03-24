import { findUserHandler , createUserHandler,deleteUserHandler,updateUserHandler } from "../controller/users_controller.js";
import express from "express";

const router = express.Router();

router.get('/signUp', findUserHandler);

router.post('/register', createUserHandler);

router.delete('/remove', deleteUserHandler);

router.put('/update', updateUserHandler);

export default router;