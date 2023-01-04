const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const fs = require("fs");

//Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  let avatar;
  if (JSON.stringify(req.files) === JSON.stringify({})) {
    return next(new ErrorHandler("Please Upload Image", 400));
  } 
    // const  imageName = await upload(req.files.avatar[0]);
    avatar = req.files.avatar[0].path;
 
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password", 401));
  }

  sendToken(user, 200, res);
});

// Logged Out
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: "Logged Successfully",
  });
});

// Forgot Password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User Not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  //                                          req.get("host")
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `<p>Your password reset token is :- \n\n${resetPasswordUrl}<br />If you have not requested then please ignore it</p>`;

  try {
    await sendMail({
      email: user.email,
      subject: `E-commerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is invalid or expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password doesn't match with Confirm Password", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  // const url = await download(user.avatar);

  // user.avatar = url;

  return res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password doesn't match with Confirm Password", 400)
    );
  }

  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  let newUserData;

  if (JSON.stringify(req.files) !== JSON.stringify({})) {
  //  await deleteImage(user.avatar);
  //  const  imageName  = await upload(req.files.avatar[0]);
  if (fs.existsSync(user.avatar)) {
    fs.unlinkSync(user.avatar);
  }
    newUserData = {
      name: req.body.name,
      email: req.body.email,
      avatar: req.files.avatar[0].path,
    };
  } else {
    newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  }

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
  });
});

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User doesn't exist with this ID: ${req.params.id}`, 404)
    );
  }
  return res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User doesn't exist with this ID: ${req.params.id}`, 404)
    );
  }
  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User doesn't exist with this ID: ${req.params.id}`, 404)
    );
  }

  // await deleteImage(user.avatar);
  if (fs.existsSync(user.avatar)) {
    fs.unlinkSync(user.avatar);
  }
  await user.remove();

  return res.status(200).json({
    success: true,
    message: "User deleted Successfully",
  });
});
