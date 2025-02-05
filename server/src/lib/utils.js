import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });

    res.cookie("jwt", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, // prevent XSS attacs cross-site scripting attacks
        sameSite: "strict", // CSRF cross-site request forgery
        secure: process.env.NODE_ENV !== "development", // cookie will only be set in https
    });

    return token;
};
