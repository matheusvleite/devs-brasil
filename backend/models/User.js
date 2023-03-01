import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileImage: { type: String, default: "userdevprofile.png" },
    area: String,
    bio: String,
    stars: Array
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;