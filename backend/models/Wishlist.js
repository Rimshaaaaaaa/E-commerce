// models/Wishlist.js
const mongoose = require('mongoose');



// Define the schema for Wishlist
const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  addedDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
