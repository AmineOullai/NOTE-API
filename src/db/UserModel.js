const bcrypt = require("bcrypt");

module.exports = (mongoose) => {
  const userSchema = new mongoose.Schema(
    {
      displayName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 8,
      },
    },
    { timestamps: true }
  );
  //you cannot use arrow functions here because you need to use the "this" keyword
  //creation et securisation du MDP:
  userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
      return next;
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;
    return next();
  });

  userSchema.methods.comparePassword = async function (condidatePassword) {
    const user = this;
    return bcrypt.compare(condidatePassword, user.password);
  };
  userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    userObject.id = userObject._id;
    delete userObject._id;
    return userObject;
  };
  return mongoose.model("User", userSchema);
};
