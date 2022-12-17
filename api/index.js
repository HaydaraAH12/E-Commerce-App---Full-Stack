const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.js");
const authRouter = require("./routes/auth.js");
const productRouter = require("./routes/product.js");
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/order")
const stripeRouter = require("./routes/stripe")
const cors = require("cors")

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoose success"))
  .catch((err) => console.log(err));

app.use(express.json())
app.use(cors())

app.use('/api/auth',authRouter)
app.use('/api/checkout',stripeRouter)
app.use('/api/order',orderRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/users',userRouter)

app.listen(process.env.PORT || 5000, () =>
  console.log("listening on port 5000")
);
