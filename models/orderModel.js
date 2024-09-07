import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products : [{
        type:mongoose.ObjectId,
        ref: 'Product',
    },
   ],
   payment:{},
   buyer:{
    type: mongoose.ObjectId,
    ref: 'users'
   },
   status:{
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
   }
},{
    timestamps: true,
})

export default mongoose.model('Order', orderSchema)