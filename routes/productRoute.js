const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
  getAllAdminProducts,
} = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const Router = express.Router();

Router.route("/products").get(getAllProducts);
Router.route("/product/:id").get(getOneProduct);

Router.route("/admin/product/new").post(
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);

Router.route("/admin/products").get(
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllAdminProducts
);

Router.route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

Router.route("/review").put(isAuthenticatedUser, createProductReview);

Router.route("/admin/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteProductReview);

module.exports = Router;
