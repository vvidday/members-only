const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

exports.index_get = async (req, res, next) => {
  try {
    const messages = await Message.find({})
      .sort({ timestamp: -1 })
      .populate("author")
      .exec();
    if (res.locals.currentUser) {
      if (res.locals.currentUser.is_member) {
        if (res.locals.currentUser.is_admin)
          res.render("index-admin", { messages: messages });
        else res.render("index-member", { messages: messages });
      } else res.render("index-user", { messages: messages });
    } else res.render("index-guest", { messages: messages });
  } catch (err) {
    return next(err);
  }
};

exports.new_message_post = [
  body("title", "Title Required").trim().isLength({ min: 1 }),
  body("content", "Message Content Required").trim().isLength({ min: 1 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Message.find({})
        .sort({ timestamp: -1 })
        .populate("author")
        .exec()
        .then((messages) => {
          if (res.locals.currentUser.is_member)
            res.render("index-member", {
              messages: messages,
              errors: errors.array(),
            });
          else
            res.render("index-user", {
              messages: messages,
              errors: errors.array(),
            });
        })
        .catch((err) => next(err));
    } else {
      const new_message = new Message({
        title: req.body.title,
        content: req.body.content,
        timestamp: new Date(),
        author: res.locals.currentUser,
      });
      new_message
        .save()
        .then(() => res.redirect("/"))
        .catch((err) => next(err));
    }
  },
];

exports.delete_post = async (req, res, next) => {
  try {
    Message.findByIdAndRemove(req.body.id)
      .then(() => res.redirect("/"))
      .catch((err) => next(err));
  } catch (err) {
    return next(err);
  }
};
