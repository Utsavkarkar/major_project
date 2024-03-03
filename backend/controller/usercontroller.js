var user = require("../model/usermodel");
var nodemailer = require('nodemailer');
var { randomInt } = require('crypto');
const storage = require("node-persist");
storage.init(/* options ... */);

exports.register = async (req, res) => {
  try {
    var chkdata = await user.find({ email: req.body.email });
    if (chkdata == 0) {
      var data = await user.create(req.body);
      // console.log(data.cart);
      res.status(200).json({
        status: "ok",
        data,
      });
    } else {
      res.status(200).json({
        status: "you are already registered",
        data,
      });
    }
  } catch (error) {
    res.status(200).json({
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    var chkdata = await user.find({ email: req.body.email });
    var data = req.body;
   
    if (chkdata.length == 1) {
      if (chkdata[0].password == req.body.password) {
        await storage.setItem("userid", chkdata[0]._id);

        var email = chkdata[0].email;
        const otp = randomInt(100000, 1000000)
        await storage.setItem('otp', otp)
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'finalproject2001@gmail.com',
            pass: 'tkotqrhyqxbkwmxl'
          }
        });

        var mailOptions = {
          from: 'finalproject2001@gmail.com',
          to: `${email}`,
          subject: 'OTP For Login',
          text:`Dear Customer,
${otp} is Your one time password (OTP). Please do not share the OTP with others.
Regards
Team SlikSkins.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.status(200).json({
          status: "logged in",
          data,
        });
      } else {
        res.status(200).json({
          status: "check your email or password",
        });
      }
    } else {
      res.status(200).json({
        status: "registered first",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
// check otp with locally stored otp...
exports.otp_post = async (req, res) => {
  try {

    otp = await storage.getItem('otp')
    // console.log(otp);
    if (otp == req.body.otp) {
      res.status(200).json({
        status: "ok"
      })
    }
    else {
      res.status(200).json({
        status: "Enter Correct Otp"
      });
    }

  } catch (error) {
    res.status(200).json({
      status: error
    })
  }
}

exports.Forgot_pass = async (req, res) => {
  try {
    var chk_data = await user.find({ email: req.body.email });

    if (chk_data.length == 1) {
      var id = chk_data[0]._id;

      var change_pass = await user.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        status: "data updated successfully",
      });
    } else {
      res.status(200).json({
        status: "Cheack Your Email Again...",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const userId = await storage.getItem("userid");
    const userDoc = await user.findById(userId);

    // Extract existing user data
    const { email, username, password } = userDoc;

    // Extract address details from the request body
    const { house_no, street, city, state, pincode } = req.body;

    const updatedDataObj = {
      email,
      username,
      password,
      address: {
        house_no,
        street,
        city,
        state,
        pincode,
      },
    };
    await user.findByIdAndUpdate(userId, updatedDataObj);
    res.status(200).json({
      status: "ok",
      //   chk,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

exports.getAddress = async (req, res) => {
  try {
    const userId = await storage.getItem("userid");
    const userDoc = await user.findById(userId);
    var address = userDoc.address;
    res.status(200).json({
      status: "This Is User's Address...",
      address,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
