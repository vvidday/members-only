const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
exports.signin_get = (req, res) => {
  if (res.locals.currentUser) {
    res.redirect("/");
  } else {
    res.render("sign-in-form", { title: "Sign In" });
  }
};

exports.signin_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/sign-in",
});
