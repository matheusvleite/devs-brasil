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

export const getAllUsers = async (req, res) => {
    const users = (await User.find({}).select("-password").sort([["createdAt", -1]]).exec()).slice(0,5);

    return res.status(200).json(users);
}


export const update = async (req, res) => {
    const { name, password, bio, area } = req.body

    let profileImage = null

    if (req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if (name) {
        user.name = name
    }

    if (password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash
    }

    if (profileImage) {
        user.profileImage = profileImage
    }

    if(area) {
        user.area = area;
    }

    if (bio) {
        user.bio = bio
    }

    await user.save();

    res.status(200).json(user);
}


export const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] })
            return
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ errors: ["Usuário não encontrado."] })
        return
    }
}

export const starUser = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;


    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] })
            return
        }

        if (user.stars.includes(reqUser._id)) {
            res.status(422).json({ errors: ["Você ja deu uma estrela."] })
            return
        }

        user.stars.push(reqUser._id)

        user.save()

        res.status(200).json({ user: id, userId: reqUser._id, message: "A foto recebeu estrela!" })

    } catch (error) {
        res.status(404).json({ errors: ["Usuário não encontrado."] })
    }

};

export const searchUsers = async (req, res) => {
    const { q } = req.query;

    const users = await User.find({"$or": [{name: new RegExp(q, "i")}, {area: new RegExp(q, "i")}]}).exec();

    res.status(200).json(users);
};
