const router = require("express").Router();
const Order = require("../models/Order")
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//create Order

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    res.status(200).json("Deleted is complete");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User Order 

router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({userId:req.params.userId});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all product

router.get("/", verifyToken, async (req, res) => {
    try {
        const orders =  await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
});  

//Get Monthly income

router.get("/income", verifyToken, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastDate = new Date(date.setMonth(date.getMonth() - 1));
    const previousDate = new Date(new Date().setMonth(lastDate.getMonth() -1));

    try {
        const income = await Order.aggregate([
            {$match:{ createdAt : {$gte: previousDate},...(productId && {
              product:{$elemMatch: {productId}}
            })}},
            {
                $project:{
                month:{$month:"$createdAt"},
                sales:"$amount",
            }},
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"},
                
            }
            },
        ]);
        res.status(200).json(income)
    } catch (error) {
        
    }
});

module.exports = router;
