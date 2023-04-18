const { NoteModel } = require("../db");
const { requireSession } = require("../middlewares/requireSessionMiddlewares");

module.exports = (app) => {
  app.post("/notes", requireSession, async (req, res, next) => {
    const session = res.locals.session;
    const { title, content } = req.body; // se documenter sur les req.body
    if (!content || !title) {
      //voir la libreary ZOD
      return res.status(400).json({
        message: "title and content are required",
      });
    }
    if (title.trim().length > 50) {
      return res.status(400).json({
        message: "title is too damn long",
      });
    }

    const note = await NoteModel.create({
      title: title.trim(),
      content: content.trim(),
      user: session.user,
    });

    return res.status(201).json({
      message: "Note created",
      data: note,
    });
  });
  app.get("/notes", requireSession, async (req, res, next) => {
    const session = res.locals.session;
    const notes = await NoteModel.find({
      user: session.user,
    });

    return res.status(200).json({
      message: "Notes retrieved",
      data: notes,
    });
  });
  app.get("/notes/:id", requireSession, async (req, res, next) => {
    const { id } = req.params;
    const session = res.locals.session;
    const note = await NoteModel.findOne({
      _id: id,
      user: session.user,
    }); // interessant

    if (!note)
      return res.status(404).json({
        message: "Note not found",
      });
    return res.status(200).json({
      message: "Note retrieved",
      data: note,
    });
  });
  app.put("/notes/:id", requireSession, async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const session = res.locals.session;

    if (!title && !content) {
      return res.status(400).json({
        message: "Title or Content are required",
      });
    }
    if (title && title.trim().length > 50) {
      return res.status(400).json({
        message: "The title is too damn long",
      });
    }

    const note = await NoteModel.findOne({
      _id: id,
      user: session.user,
    });

    if (!note)
      return res.status(404).json({
        message: "Note not found",
      });

    if (title) note.title = title.trim();

    if (content) note.content = content.trim();

    await note.save();

    return res.status(200).json({
      message: "Note updated",
      data: note,
    });
  });
  app.delete("/notes/:id", requireSession, async (req, res, next) => {
    const { id } = req.params;
    const session = res.locals.session;
    const note = await NoteModel.findOne({
      _id: id,
      user: session.user,
    });

    if (!note)
      return res.status(404).json({
        message: "Note not found",
      });

    await NoteModel.deleteOne(note);

    return res.status(200).json({
      message: "Note deleted",
      data: note,
    });
  });
};
