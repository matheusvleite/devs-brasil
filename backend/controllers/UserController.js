import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

const jwtSecret = process.env.JWT_SECRET;

// generate token

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ errors: ["Esse e-mail já está em uso."] })
        return
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    })

    if (!newUser) {
        res.status(422).json({ errors: ["Houve um erro, por favor tente mais tarde."] })
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] })
            return
        }

        if (!(await bcrypt.compare(password, user.password))) {
            res.status(422).json({ errors: ["Senha inválida."] })
            return
        }

        res.status(201).json({
            _id: user._id,
            profileImage: user.profileImage,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ errors: ["Erro interno do servidor."] })
        return
    }

}

export const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
}

export const getAllUsers = async (req,res) => {
    const users = await User.find({}).select("-password").sort([["createdAt", -1]]).exec();

    return res.status(200).json(users);
}
