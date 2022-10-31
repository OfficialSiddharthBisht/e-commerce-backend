const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, productDetails } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, createProduct);
router.route("/product/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct).get(productDetails);

module.exports = router;