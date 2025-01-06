import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    profilePicture:{
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
    }
},{timestamps:true}

);

const User = mongoose.model('User', userSchema);

export default User;