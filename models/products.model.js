const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
   
    name: {
        type: String,

    },
    price: {
        type: Number,
        
    },
    specifications: {
        type: [String], 
      
    },
    imgSrc: {
        type: String,
       
    },
    inStock: {
        type: Boolean,
       
    }
});

const productsModel = mongoose.model('Product', productsSchema);
module.exports = productsModel;
