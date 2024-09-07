import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs'
import categoryModel from '../models/categoryModel.js'
import braintree from "braintree";
import dotenv from 'dotenv'
import orderModel from "../models/orderModel.js";

dotenv.config();
//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });


export const createProductController = async(req,res) => {
    try {
        const {name,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case !price:
                return res.status(500).send({error:'Price is Required'})
            case !category:
                return res.status(500).send({error:'Category is Required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is Required'})
            case photo && photo.size > 1000000:
                return res.status(500).send({error:'Photo is required and should be less then 1 MB'})          
        }

        const products = new productModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product created successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in creating product'
        })
    }
};


//get all products
export const getProductController = async(req,res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message:'Products fetched successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in fetching products',
            error: error.message
        })
    }
};

//get single product
export const getSingleProductController = async(req,res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
        res.status(200).send({
            success: true,
            message:'Product fetched successfully',
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching single product',
            error,
        })
    }
};

//get photo
export const productPhotoController = async(req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching product photo',
            error,
        })
    }
};


//delete controller
export const deleteProductController = async(req,res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message:'Product deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in deleting product',
            error,
        })
    }
};


//update controller
export const updateProductController = async(req,res) => {
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is Required'})
            case !description:
                return res.status(500).send({error:'Description is Required'})
            case !price:
                return res.status(500).send({error:'Price is Required'})
            case !category:
                return res.status(500).send({error:'Category is Required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is Required'})
            case photo && photo.size > 1000000:
                return res.status(500).send({error:'Photo is required and should be less then 1 MB'})          
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)}, {new:true}
        )
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product updated successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating product'
        })
    }
};


//filters
export const productFiltersController = async(req,res) => {
    try {
        const {checked, radio} = req.body
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            message:'Products filtered successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in filtering products',
            error,
        })
    }
}

//product count
export const productCountController = async(req,res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            message:'Products counted successfully',
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in counting products',
            error,
        })
    }
}

//product list base on page 
export const productListController = async(req,res) => {
    try {
        const perPage = 8
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
        .find({})
        .select("-photo")
        .skip((page-1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1})
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in listing products',
            error,
        })
    }
}

// search product
export const searchProductController = async (req,res) => {
    try {
        const {keyword} = req.params
        const results = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}},
            ]
        }).select("-photo")
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in searching products',
            error,
        })
    }
}

// similar product controller
export const relatedProductController = async(req,res) => {
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            category:cid,
            _id: {$ne: pid},
        }).select("-photo").limit(4).populate("category")
        res.status(200).send({
            success: true,
            message: 'Related products fetched successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in fetching related products',
            error,
        })
    }
}

//get product by category
export const productCategoryControleller = async (req,res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        const products = await productModel.find({category}).populate("category")
        res.status(200).send({
            success: true,
            category,
            products,
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error in fetching products by category',
            error,
        })
    }
}


//payment gateway api
//token
export const braintreeTokenController = async(req,res) => {
    try {
        gateway.clientToken.generate({}, function(err,response){
            if(err){
                res.status(500).send()
            }else{
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error)
    }
}


//payment
export const braintreePaymentController = async(req,res) => {
    try {
        const {cart, nonce} = req.body
        let total = 0
        cart.map( (i) => {total += i.price});
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
        function(error,result){
            if(result){
                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id
                }).save()
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        }
    )

    } catch (error) {
        console.log(error)
    }
}