import express from "express";
import { register } from "../controllers/UserController.js";
import { validate } from "../middlewares/handleValidation.js";
import { userCreateValidation } from "../middlewares/userValidation.js";

export const userRoutes = express();

userRoutes.post('/register', userCreateValidation(), validate, register);