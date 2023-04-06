const { default: mongoose } = require("mongoose");

module.exports = (mongoose) => {
  const SessionSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  });

  SessionSchema.methods.hasExpired = function () {
    return this.expiryDate < new Date();
  };
  SessionSchema.methods.toJSON = function () {
    const session = this;
    const sessionObject = session.toObject();

    delete sessionObject.user;
    delete sessionObject._id;
    delete sessionObject.__v;

    return sessionObject;
  };
  return mongoose.model("Session", SessionSchema);
};
