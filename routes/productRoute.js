const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, productDetails} = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createProduct);
router.route("/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"),updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct)
    .get(productDetails);

module.exports = router;