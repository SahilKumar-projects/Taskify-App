const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= GET TASKS ================= */
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ order: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

/* ================= ADD TASK ================= */
router.post("/", auth, async (req, res) => {
  try {
    const count = await Task.countDocuments({ user: req.user });

    const task = await Task.create({
      title: req.body.title,
      priority: req.body.priority || "Medium",
      dueDate: req.body.dueDate || null, 
      order: count,
      completed: false,
      user: req.user,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: "Failed to create task" });
  }
});

/* ================= UPDATE TASK ================= */
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      {
        title: req.body.title,
        priority: req.body.priority,
        completed: req.body.completed,
        dueDate: req.body.dueDate || null, 
      },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: "Failed to update task" });
  }
});

/* ================= DELETE TASK ================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete task" });
  }
});

/* ================= REORDER TASKS ================= */
router.put("/reorder/all", auth, async (req, res) => {
  try {
    const updates = req.body; // [{ id, order }]

    for (const item of updates) {
      await Task.findByIdAndUpdate(item.id, { order: item.order });
    }

    res.json({ message: "Tasks reordered" });
  } catch (err) {
    res.status(400).json({ message: "Failed to reorder tasks" });
  }
});

module.exports = router;
