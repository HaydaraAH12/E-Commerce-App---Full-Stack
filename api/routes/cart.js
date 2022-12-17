const router = require("express").Router();
const Cart = require("../models/Cart")
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//create USER

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id);
    res.status(200).json("Deleted is complete");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User Cart

router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all product

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart =  await Cart.find()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
});  

module.exports = router;
