const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  total_response: { type: Number, default: 0 },
  questions: [
    {
      questionText: { type: String, required: true },
      questionType: { type: String, required: true },
      options: [String],
    },
  ],
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
