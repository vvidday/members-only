const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.signup_get = (req, res) => {
  // req.locals?
  res.render("sign-up-form", { title: "Sign Up" });
};

exports.signup_post = [
  body("firstname", "First Name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastname", "Last Name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  //body("username", "Username must not be empty").trim().isLength({ min: 1 }),
  body("username", "Username already exists").custom(async (value, { req }) => {
    const result = await User.findOne({ username: value });
    if (result) {
      return Promise.reject();
    } else return true;
  }),
  body("password", "Password must be at least 6 characters")
    .trim()
    .isLength({ min: 6 }),
  body("passwordconf", "Passwords don't match").custom(
    (value, { req }) => value === req.body.password
  ),
  async (req, res, next) => {
    const errors = validationResult(req);
    //console.log(errors.array());
    if (!errors.isEmpty()) {
      res.render("sign-up-form", { title: "Sign Up", errors: errors.array() });
    } else {
      // All good - proceed with creation of new user
      const is_member =
        req.body.secretpassword === process.env.SECRET_PASSWORD ? true : false;
      bcrypt
        .hash(req.body.password, 10)
        .then((hashedPassword) => {
          const newUser = new User({
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            is_member: is_member,
          });
          return newUser.save();
        })
        .then(() => res.redirect("/"))
        .catch((err) => next(err));
    }
  },
];
