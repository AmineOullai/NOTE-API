module.exports = (mongoose) => {
  const NoteSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      title: {
        type: String,
        max: 50,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  NoteSchema.methods.toJSON = function () {
    const note = this.toObject();

    note.id = note._id;
    delete note.__v;
    delete note._id;
    return note;
  };
  return mongoose.model("Note", NoteSchema);
};
