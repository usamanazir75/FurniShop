import userModel from "./../models/userModel.js";
import orderModel from "./../models/orderModel.js"
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // Validations
    if (!name) {
      return res.status(400).send({ message: "Name is Required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone number is Required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is Required" });
    }
    // Check user
    const existingUser = await userModel.findOne({ email });
    // Existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, please login",
      });
    }
    // Register user
    const hashedPassword = await hashPassword(password);
    // Save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'Email is required' });
    }
    if (!answer) {
      return res.status(400).send({ message: 'Answer is required' });
    }
    if (!newPassword) {
      return res.status(400).send({ message: 'New Password is required' });
    }
    // Check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Forgot Password",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address, // Fixed typo here
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Test Controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

// Update Profile Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    // Password
    if (password && password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
      name: name || user.name,
      password: hashedPassword || user.password,
      address: address || user.address,
      phone: phone || user.phone,
    }, { new: true });
    res.status(200).send({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error in updating profile',
      error,
    });
  }
};


//order
export const getOrdersController = async(req,res) => {
  try {
    const orders = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name")
    res.json(orders);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting orders',
      error,
    })
  }
}


//all orders
export const getAllOrdersController = async(req,res) => {
  try {
    const orders = await orderModel.find({})
    .populate("products","-photo")
    .populate("buyer","name")
    .sort({createdAt: -1})
    res.json(orders);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting orders',
      error,
    })
  }
}

//order status
export const orderStatusController = async(req,res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body
    const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
    res.json(orders);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in getting order status',
      error,
    })
  }
}