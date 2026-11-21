const { body } = require("express-validator");

const forgotPasswordValidator = [
  body("email", "Must be a valid email")
    .isEmail()
    .notEmpty()
    .normalizeEmail()
    .trim(),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage(
      "Password must include at least one number, one uppercase letter, one lowercase letter, and one special character."
    ),
];

module.exports = forgotPasswordValidator;
