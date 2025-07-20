const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middlewares/auth");

// POST /tasks - Create task
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;
    const task = await Task.create({ name, userId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task" });
  }
});

// GET /tasks - Retrieve tasks (pagination + search)
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {
      userId: req.user.id,
      name: { $regex: search, $options: "i" },
    };

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.json({ total, page: parseInt(page), tasks });
  } catch (err) {
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

// PATCH /tasks/:id - Update task status
router.patch("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
