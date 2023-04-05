module.exports = (mongoose) => {
  const NoteSchema = new mongoose.Schema(
    {
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
  return mongoose.model("Note", NoteSchema);
};
