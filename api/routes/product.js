const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");

//create USER

router.post("/",verifyToken, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProducts = await newProduct.save();
    res.status(200).json(savedProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).json("Deleted is complete");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Prodcut

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all product

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});  

module.exports = router;
