import express from "express";
import { getAllUsers, getCurrentUser, login, register, update } from "../controllers/UserController.js";
import { authGuard } from "../middlewares/authGuard.js";
import { validate } from "../middlewares/handleValidation.js";
import { imageUpload } from "../middlewares/imageUpload.js";
import { loginValidation, userCreateValidation, userUpdateValidate } from "../middlewares/userValidation.js";

export const userRoutes = express();

userRoutes.post('/register', userCreateValidation(), validate, register);
userRoutes.post('/login', loginValidation(), validate, login);
userRoutes.get("/profile", authGuard, getCurrentUser);
userRoutes.put("/", authGuard, userUpdateValidate(), validate, imageUpload.single("profileImage"), update)
userRoutes.get("/", getAllUsers)