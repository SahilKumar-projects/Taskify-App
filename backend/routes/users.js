const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   UPDATE PROFILE
========================= */
router.put("/profile", auth, async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user,
      updates,
      { new: true }
    ).select("-password");

    res.json(user);
  } catch {
    res.status(500).json({ message: "Profile update failed" });
  }
});

/* =========================
   CHANGE PASSWORD
========================= */
router.put("/change-password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = await User.findById(req.user);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password updated successfully" });
});

module.exports = router;
