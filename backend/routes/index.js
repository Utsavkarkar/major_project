var express = require('express');
var router = express.Router();
var {register,login,Forgot_pass, getUsers, addAddress, getAddress,otp_post} = require('../controller/usercontroller')
var {addProduct ,getProduct ,findByCategory, updateProduct, getProductById, deleteProduct} = require('../controller/productController')
const multer = require('multer');
const { addToCart, getCart, removeCartProduct, qtyPlus, qtyMinus } = require('../controller/cartController');
const { adminLogin } = require('../controller/adminController');
var auth = require('../middleware/auth');

const { checkOut , paymentVerification, getKey } = require('../controller/paymentController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/',(req,res)=>{
  res.render('index')
})

// payment gateway routes
router.post('/checkout',checkOut);
router.post('/paymentverification',paymentVerification);
router.get('/getkey',getKey);


// cart routes
router.post('/addtocart',addToCart);
router.get('/getcart',getCart);
router.delete('/removecartproduct',removeCartProduct);
router.post('/qtyplus',qtyPlus);
router.post('/qtyminus',qtyMinus);

// user routes
router.post('/reg',register );
router.post('/login',login);
router.post('/forgot',Forgot_pass);

// for user's address
router.post('/addaddress',addAddress);
router.get('/getaddress',getAddress);

// admin route
router.post('/adminLogin',adminLogin);
router.post('/add',upload.single('image'),addProduct);
// router.get('/getproduct',auth.chk_token,getProduct);
router.get('/getproduct',getProduct);
router.get('/getproductbyid',getProductById);
router.get('/getproductbycategory',findByCategory);
router.post('/updateproduct',upload.single('image'),updateProduct);
router.delete('/deleteproduct',deleteProduct);

router.post('/test_otp',otp_post);

router.get('/user-auth',auth.chk_token,(req,res)=>{
  res.status(200).send({ok:true});
})

module.exports = router;
