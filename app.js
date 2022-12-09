const express = require("express");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");

const errorMiddleware = require("./middlewares/error");
const ProductRouter = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

const app = express();
dotenv.config({ path: "back-end/config/config.env" });

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "avatar", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ])
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.json());
app.use(cookieParser());

app.use("/images", express.static("images"));

app.use("/api/v1", ProductRouter);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

// app.use(express.static(path.join("../front-end/build")))
// app.get("*",(req,res,next)=>{
//   res.sendFile(path.join("../front-end/build/index.html"))
// })

app.use(errorMiddleware);

module.exports = app;
