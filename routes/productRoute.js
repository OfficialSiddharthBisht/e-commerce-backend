const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, productDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("user"), createProduct);
router.route("/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("user"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("user"), deleteProduct)
    .get(productDetails);

module.exports = router;