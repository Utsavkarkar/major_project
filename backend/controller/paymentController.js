var Razorpay = require("razorpay");
var crypto = require("crypto");
var allorder = require("../model/orderModel");
var cart = require("../model/cartModel");
var makeorder = require("../model/orderModel");
const storage = require("node-persist");
storage.init(/* options ... */);

exports.checkOut = async (req, res) => {
  // ===================  Oreder GEneration ===========================
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  const options = {
    amount: Number(req.body.ttlbill * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    status: true,
    order,
  });
};

exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    var userId = await storage.getItem("userid");
    var chk = await cart.find({ userId: userId });
    var pro = [];
    chk.forEach((product) => {
      pro.push({
        productName: product.productName,
        category: product.category,
        image: product.image,
        qty: product.qty,
        price: Number(product.price * product.qty),
      });
    });
    var payment = "RazorPay";
    var orderStatus = "Order Deliverd  within 3 days.";
    var ord = await makeorder.create({
      products: pro,
      paymentMode: payment,
      orderStatus,
      userId: userId,
    });
    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_order_id}`
    );
  } else {
    res.status(400).json({
      status: false,
    });
  }
};
exports.getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
};

// for razorpay payment
exports.getOrderDetail = async (req, res) => {
  try {
    var userId = await storage.getItem("userid");
    var ord = await makeorder.find({ userId: userId });

    if (ord.length >= 1) {
      res.status(200).json({
        status: "Your Orders Are Here...",
        ord,
      });
    } else {
      res.status(200).json({
        status: "You Have Not Ordered Anything",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// for cash on delivery
exports.offlineOrder = async(req,res) => {
  var userId = await storage.getItem("userid");
    var chk = await cart.find({ userId: userId });
    var pro = [];
    chk.forEach((product) => {
      pro.push({
        productName: product.productName,
        category: product.category,
        image: product.image,
        qty: product.qty,
        price: Number(product.price * product.qty),
      });
    });
    var payment = "Cash On Delivery";
    var orderStatus = "Order Deliverd  within 3 days.";
    var ord = await makeorder.create({ products: pro , paymentMode: payment,orderStatus, userId: userId });
    res.status(200).json({
      status:"Order Placed Successfully",
    })
}