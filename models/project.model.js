const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    createdBy: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
  },

  { timestamps: true }
);

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = { ProjectModel };
