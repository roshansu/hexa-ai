import mongoose, { Schema } from "mongoose";

const historySchema = new Schema({
  title: {
    type: String,
  },
  
  gemini: [
    {
      role: { type: String, enum: ["user", "model"] },
      text: { type: String },
    },
  ],
  openAi: [
    {
      role: { type: String, enum: ["user", "model"] },
      text: { type: String },
    },
  ],
  deepSeek: [
    {
      role: { type: String, enum: ["user", "model"] },
      text: { type: String },
    },
  ],

}, { timestamps: true });

const History = mongoose.model("History", historySchema);

export default History;
