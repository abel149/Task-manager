const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// POST /register
exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // 1. Confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2. Check if user already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // 3. Hash password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // 4. Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
