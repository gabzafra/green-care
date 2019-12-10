const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const IMG_URL = /.*\.(gif|jpe?g|bmp|png)$/gim;
const taskSchema = new Schema(
  {
    begin_day: { type: Date, required: true },
    day_interval: { type: Number, required: true },
    type: { type: String, enum: ["WATER", "FERTILIZER"], required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        return ret;
      }
    }
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
