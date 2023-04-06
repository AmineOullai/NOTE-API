const mongoose = require("mongoose");
const NoteSchema = require("./NotesModel");
const userSchema = require("./UserModel");

module.exports = {
  connect: () => {
    mongoose
      .connect(process.env.DB_HOST)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log(err));
  },
  NoteModel: NoteSchema(mongoose),
  UserModel: userSchema(mongoose),
};
