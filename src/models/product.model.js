import mongoose from "mongoose";

const productCollection = "Products"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    price: { type: Number, required: true},
    available: { type: Boolean, required: true}
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel