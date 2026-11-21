const loginProvider = require("./providers/login.provider.js");
const forgotPasswordProvider = require("./providers/forgotPassword.provider.js");

async function handlelogin(req, res) {
   return await loginProvider(req, res);
}

async function handleForgotPassword(req, res) {
   return await forgotPasswordProvider(req, res);
}

module.exports = {
    handlelogin,
    handleForgotPassword,
};