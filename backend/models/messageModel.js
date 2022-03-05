const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const messageSchema = new mongoose.Schema(
  {
    content: { type: String, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnonUser",
    },
  },
  {
    timestamps: { createdAt: "created_At" },
  }
);

messageSchema.set("toJSON", {
  transform: (doc, res) => {
    res.id = res._id.toString();
    delete res._id;
    delete res.__v;
  },
});

messageSchema.plugin(validator);

const Message = mongoose.model("AnonMessage", messageSchema);

module.exports = Message;
