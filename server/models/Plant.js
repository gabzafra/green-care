const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const IMG_URL = /.*\.(gif|jpe?g|bmp|png)$/gim;
const plantSchema = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, default: "https://i.stack.imgur.com/l60Hf.png" },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    scientific_name: { String, default: null },
    common_name: { String, default: null },
    soils_adaptation: [String],
    temperature_minimun: { type: Number, default: null },
    shade_tolerance: { String, default: null },
    ph_range: { String, default: null },
    year_rain_range: { String, default: null },
    fertilizer_req: { String, default: null },
    perennial: { Boolean, default: true },
    location: { type: { type: String }, coordinates: [Number] }
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

const Plant = mongoose.model("Plant", plantSchema);
module.exports = Plant;
