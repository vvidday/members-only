const { body, validationResult } = require("express-validator");
const User = require("../models/user");
require("dotenv").config();

exports.profile_get = (req, res) => {
  if (!res.locals.currentUser) res.redirect("/sign-in");
  else res.render("profile", { title: "Profile Page" });
};

exports.membership_post = async (req, res, next) => {
  if (req.body.password === process.env.SECRET_PASSWORD) {
    try {
      User.findOneAndUpdate(
        { username: res.locals.currentUser.username },
        { is_member: true }
      )
        .then((user) => {
          res.redirect("/profile");
        })
        .catch((err) => next(err));
    } catch (err) {
      return next(err);
    }
  } else {
    res.render("profile", { title: "Profile Page", membererror: true });
  }
};

exports.admin_post = async (req, res, next) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    try {
      User.findOneAndUpdate(
        { username: res.locals.currentUser.username },
        { is_admin: true }
      )
        .then(() => res.redirect("/profile"))
        .catch((err) => next(err));
    } catch (err) {
      return next(err);
    }
  }
};
