var Razorpay = require("razorpay");
var crypto = require('crypto');

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
  // console.log(order);
  res.status(200).json({
    status: true,
    order,
  });
  // <-------------------- Order Schema------------------>
  // {
  // id: 'order_NdwaxCnExpNBhm',
  // entity: 'order',
  // amount: 50000,
  // amount_paid: 0,
  // amount_due: 50000,
  // currency: 'INR',
  // receipt: null,
  // offer_id: null,
  // status: 'created',
  // attempts: 0,
  // notes: [],
  // created_at: 1708609007
  //   }
  // ==================================================================
};

exports.paymentVerification = async (req, res) => {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET)
                                    .update(body.toString())
                                    .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        res.redirect(
            `http://localhost:3000/paymentsuccess?reference=${razorpay_order_id}`
        )
    }else{
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
