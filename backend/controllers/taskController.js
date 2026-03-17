const Task = require("../models/Task");
const { encrypt } = require("../utils/encryption");

exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await Task.create({
    userId: req.user,
    title: encrypt(title),
    description: encrypt(description),
  });

  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const { page = 1, limit = 5, status, search } = req.query;

  const query = { userId: req.user };

  if (status) query.status = status;
  if (search) query.title = { $regex: search, $options: "i" };

  const { decrypt } = require("../utils/encryption");

  const tasks = await Task.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const formatted = tasks.map(t => ({
    ...t._doc,
    title: decrypt(t.title),
    description: decrypt(t.description),
  }));

  res.json(formatted);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user },
    req.body,
    { new: true }
  );

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user,
  });

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json({ message: "Deleted" });
};