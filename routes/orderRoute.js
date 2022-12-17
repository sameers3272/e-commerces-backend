const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, getMyInvoice } = require("../controller/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const Router = express.Router();


Router.route("/order/new").post(isAuthenticatedUser, newOrder);

Router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

Router.route("/orders/me").get(isAuthenticatedUser, myOrders);

Router.route("/order/invoice/:orderId").get(isAuthenticatedUser, getMyInvoice);

Router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

Router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = Router;
