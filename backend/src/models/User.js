import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: "string",
        unique: true,
        required: true,
    },
    password: {
        type: "string",
        required: true,
    },
});

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatPassword) {
    const user = this;
    return new Promise(async (resolve, reject) => {
        bcrypt.compare(candidatPassword, user.password, (err, isMatch) => {
            if (err) return reject(err);
            if (!isMatch) return reject(false);
            resolve(true);
        });
    });
};

export default mongoose.model("users", userSchema);
