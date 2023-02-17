import express from "express";
import { getCurrentUser, login, register } from "../controllers/UserController.js";
import { authGuard } from "../middlewares/authGuard.js";
import { validate } from "../middlewares/handleValidation.js";
import { loginValidation, userCreateValidation } from "../middlewares/userValidation.js";

export const userRoutes = express();

userRoutes.post('/register', userCreateValidation(), validate, register);
userRoutes.post('/login', loginValidation(), validate, login);
userRoutes.get("/profile",authGuard, getCurrentUser);