const mongoose = require("mongoose");
const { ProjectModel } = require("./project.model");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
    timerId: { type: mongoose.Schema.Types.ObjectId, ref: "timer" },
  },

  { timestamps: true }
);

taskSchema.post("save", async function (doc, next) {
  try {
    const ProjectModel = mongoose.model("project");
    const project = await ProjectModel.findById(doc.projectId);
    if (project) {
      project.tasks.push(doc._id);
      await project.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const TasktModel = mongoose.model("task", taskSchema);

module.exports = { TasktModel };
