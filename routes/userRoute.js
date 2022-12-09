const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUser, deleteUser } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router.route("/admin/user/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);


module.exports = router;