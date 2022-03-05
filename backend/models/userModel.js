const mongooseValidator = require("mongoose-unique-validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    username: { type: String, unique: true },
    passwordHash: String,
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AnonMessage",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, res) => {
    res.id = res._id.toString();
    delete res._id;
    delete res.__v;
    delete res.passwordHash;
  },
});

userSchema.plugin(mongooseValidator);

const User = mongoose.model("AnonUser", userSchema);

module.exports = User;
