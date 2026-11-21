const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const User = require("../../users/users.schema.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const logger = require("../../helpers/winston.helper.js");

async function forgotPasswordProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    const user = await User.findOne({ email: validatedData.email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No account found with this email address.",
      });
    }

    if (user.isBlocked) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Your account is currently blocked. Please contact an administrator.",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    logger.info("Password reset successfully", { email: user.email });

    return res.status(StatusCodes.OK).json({
      message: "Password has been successfully updated. You can now login with your new password.",
    });
  } catch (error) {
    errorLogger("Error while resetting password: ", req, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unable to reset password at the moment. Please try again later.",
    });
  }
}

module.exports = forgotPasswordProvider;
