var express = require("express");
var router = express.Router();

const signup_controller = require("../controllers/signupController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", signup_controller.signup_get);

router.post("/sign-up", signup_controller.signup_post);

module.exports = router;
