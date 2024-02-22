const product = require('../model/productModel');
const storage = require('node-persist');
storage.init( /* options ... */ );

// To Add New Product In Product Collection
exports.addProduct = async (req, res) => {
    
        try {
            // Extract values from req.body
            const { productName, category, price } = req.body;
            const image1 = req.file.originalname;

            // var chk = await product.find({productName});
            // console.log(chk);
            // Create an object to store in the database
            const obj = {
                productName: productName, //Product nu name aavse like skin name
                category: category, //model name or number avvse like iphone 13 ,14 and so on....
                price: price,
                image: image1
            };

            // Create a new product in the database
            // if (chk.length<=0) {
                const data = await product.create(obj);
        
                res.status(200).json({
                    status: "Product Added Successfully",
                    data,
                    obj
                });
            // }else{
                // res.status(200).json({
                //     status: "Product Already Added.",
                // });
        // }
        } catch (error) {
            res.status(200).json({
                error
             })
        }

       
   
};

// For Find All Product From Products collection
exports.getProduct = async (req, res) => {
    try {
        const data = await product.find()
        // console.log(await storage.getItem('tkn'));
        // console.log(data);
        res.status(200).json({
            status: "Product find Successfully",
            data
        });
    } catch (error) {
        res.status(500).json({
            status: "Error in finding product",
            error: error.message,
        });
    }
};
// For Find Product From Products collection using Id
exports.getProductById = async (req, res) => {
    try {
        var id = req.query.id;
        const data = await product.findById(id)
        // console.log(data);
        res.status(200).json({
            status: "Product find By given ID Successfully",
            data
        });
    } catch (error) {
        res.status(500).json({
            status: "Error in finding product",
            error: error.message,
        });
    }
};

// For Find Product By Category From Products collection
exports.findByCategory = async (req, res) => {
    try {
        var category = req.query.category;
        const data = await product.find({category});
        // console.log(data);
        if (data.length >= 1) {
            res.status(200).json({
                status: "Your finded Products With Categories Is Here...!",
                data
            })
        } else {
            res.status(200).json({
                status: "No Products Found With This Category...!"
            })
        }
    
    } catch (error) {
        res.status(500).json({
            status: "Error in finding product by category",
            error: error.message,
        });
    }
};

//API For Update A Single Product Using It's ID
exports.updateProduct = async (req,res) => {
    try {
        var id = req.query.id;

        const { productName, category, price } = req.body;
        const image1 = req.file.originalname;
        const obj = {
            image: image1,
            productName: productName, //Product nu name like skin name
            category: category, //model name or number like iphone 13 ,14 and so on....
            price: price,
        };

        await product.findByIdAndUpdate(id,obj);

        res.status(200).json({
            status:"Product Data Updated Successfully"
        })
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}

//API For Delete A Single Product Using It's ID
exports.deleteProduct = async (req,res) => {
    try {
        var id = req.query.id;

        await product.findByIdAndDelete(id);

        res.status(200).json({
            status:"data deleted successfully"
        })
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}

//API For Find A Single Product Using It's ID
exports.singleProduct = async (req,res) => {
    try {
        var id = req.query.id;

        var data = await product.findById(id);

        res.status(200).json({
            status:"Single Data Successfully",
            data
        })
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}