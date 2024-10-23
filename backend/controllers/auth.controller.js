import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Create a new user
export const signup = async (req, res, next) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;

  if (
    !firstname ||
    !lastname ||
    !phonenumber ||
    !email ||
    !password ||
    firstname === "" ||
    lastname === "" ||
    phonenumber === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    firstname,
    lastname,
    phonenumber,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: "Sign Up Successfull" });
  } catch (error) {
    next(error);
  }
};

// User sign in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "Invalid Password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_KEY);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("assess_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// Log in to the system using google
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// export const logout = async (req, res, next) => {
//   try {
//     res.cookie("assess_token", "", {
//       expires: new Date(0),
//       httpOnly: true,
//     });

//     res.status(200, { message: "Successfully logout" });
//   } catch (error) {
//     next(error);
//   }
// };

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("assess_token"); // Clear the assess_token cookie

    res.status(200).json({ message: "Successfully logged out" }); // Respond with a success message
  } catch (error) {
    next(error);
  }
};
