var express = require("express");
var router = express.Router();

const signup_controller = require("../controllers/signupController");
const signin_controller = require("../controllers/signinController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: res.locals.currentUser
      ? res.locals.currentUser.username
      : "placeholder",
  });
});

router.get("/sign-up", signup_controller.signup_get);

router.post("/sign-up", signup_controller.signup_post);

router.get("/sign-in", signin_controller.signin_get);

router.post("/sign-in", signin_controller.signin_post);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
