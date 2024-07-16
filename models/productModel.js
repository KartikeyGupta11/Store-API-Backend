import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Your Good Name'],
        trim:true
    },

    price:{
        type:Number,
        required:true
    },

    company:{
        type:String,
        enum:{
            values:['ikea','nilkamal','pepperfry','durian'],
            message:'{Value} not Supported as Company Name'
        }
    },

    rating:{
        type:Number,
        default:4.5
    },

    featured:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

export const Product = mongoose.model("Product",productSchema);