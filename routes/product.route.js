const express = require("express");
const router = express.Router();
const productControle = require("../controllers/product.controller");
const auth = require("../middleware/auth");

router.post("/addProduct",auth, productControle.addProduct);
router.get("/allProducts", productControle.getAllProducts);
router.post("/singleProduct", auth, productControle.getSingleProduct);
router.post("/search_term", productControle.getProductByName);
router.post("/addRate", auth, productControle.addRate);
router.post("/deleteRate", auth, productControle.deleteRate);
router.patch("/editProduct", auth, productControle.editProduct);
router.patch("/deleteProduct", auth, productControle.deleteProduct);


module.exports = router;
