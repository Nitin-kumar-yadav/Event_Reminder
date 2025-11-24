import { generateToken } from "../lib/utils.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../lib/mailSender.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6 || password.length > 12) {
      return res
        .status(400)
        .json({ message: "Password must be between 6 and 12 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const emailInfo = await sendVerificationEmail(email, otp);

    if (!emailInfo) {
      return res.status(500).json({
        message: "Could not send OTP email. Please try again.",
      });
    }

    console.log("OTP email sent:", emailInfo.response);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      otp,
      otpExpiry,
      isVerified: false,
    });

    const savedUser = await newUser.save();

    setTimeout(async () => {
      const user = await User.findById(savedUser._id);
      if (user && !user.isVerified) {
        await User.deleteOne({ _id: savedUser._id });
        console.log(`Deleted unverified user: ${email}`);
      }
    }, 10 * 60 * 1000);

    generateToken(savedUser._id, res);
    return res.status(201).json({
      message: "Signup successful. OTP sent!",
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error("Error in Signup controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user._id;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in verifyEmail controller ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout successfull" });
};
