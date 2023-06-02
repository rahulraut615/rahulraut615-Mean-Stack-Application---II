const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', true);

const Book = new Schema({
    name:{type:String},
    price:{type:String},
    description:{type:String},

},
{
    collection:'book'
})

module.exports = mongoose.model('Book',Book)