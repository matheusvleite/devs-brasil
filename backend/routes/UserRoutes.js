import express from "express";
import { register } from "../controllers/UserController.js";

export const userRoutes = express();

userRoutes.post('/register', register)