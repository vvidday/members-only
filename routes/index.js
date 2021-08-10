var express = require("express");
var router = express.Router();

const signup_controller = require("../controllers/signupController");
const signin_controller = require("../controllers/signinController");
const profile_controller = require("../controllers/profileController");
const index_controller = require("../controllers/indexController");

/* GET home page. */
router.get("/", index_controller.index_get);

router.post("/new-message", index_controller.new_message_post);

router.get("/sign-up", signup_controller.signup_get);

router.post("/sign-up", signup_controller.signup_post);

router.get("/sign-in", signin_controller.signin_get);

router.post("/sign-in", signin_controller.signin_post);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/profile", profile_controller.profile_get);

router.post("/membership", profile_controller.membership_post);

module.exports = router;
