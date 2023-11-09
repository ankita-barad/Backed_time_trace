const express = require("express");
const { ProjectModel } = require("../models/project.model");
const { authenticate } = require("../middlewares/authentication.middleware");
const { UserModel } = require("../models/user.model");

const projectRoute = express.Router();

// Create a new project
projectRoute.post("/create", authenticate, async (req, res) => {
  try {
    console.log(req.userId);
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { name, description } = req.body;
    const project = new ProjectModel({
      name,
      description,
      createdBy: user.name,
    });

    await project.save();
    res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Get all projects
projectRoute.get("/", async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

//get a specific project
projectRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await ProjectModel.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

//update a project
projectRoute.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await ProjectModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
});

//delete a project
projectRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await ProjectModel.findByIdAndRemove(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = { projectRoute };
