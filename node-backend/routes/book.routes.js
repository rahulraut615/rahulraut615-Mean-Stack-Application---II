const express = require('express');
const app = express();
app.use(express.json());
const bookRouter = express.Router();
let book = require('../model/book');
const mongoType = require('mongoose').Types;
const createError = require('http-errors');


// Add Book For Store
//Here i got model.create no longer accecpts callback so i used then and catch
bookRouter.route('/add-book').post((req,res,next)=>{
    const newBook = new book({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
        newBook.save().then(()=>{
        res.send(res.name);
    }).catch((err)=>{
        console.log(err);
    })
})

//get All book From Store
// here i got Model.find() no more longer accepts callback i used async and awit
bookRouter.route('/').get( async(req,res)=>{
try{
    const bookList = await book.find({});
    res.status(200).json(bookList);
}catch (error){
    res.status(500).json({message : error.message})
}  
});

// get book by Id
// here Model.findById() no longer accepts a callback not work so i used aync & await
bookRouter.route('/read-book/:id').get(async(req,res)=>{
try{
    const bookNam = await book.findById(req.params.id);
    res.status(200).send(bookNam);
   // console.log(bookNam);
}catch(error){
    res.status(500).json({message : error.message})
}
});

//Update book 

// bookRouter.route('/update-book/:id').put(async(req,res)=>{
//     try{
//         const id=req.params.id
//         const task = req.body
//         $set: req.body
//         console.log(req.body)
//         const options = {new:true}
//         const result = await book.findByIdAndUpdate(id,{name:task.name,pricce:task.price,description:task.description},options)
//        res.status(200).json(result)
//        console.log(result)
//     }catch(error){
//         res.status(500).json({error:error.message})
//     }

//     })

bookRouter.route('/update-book/:id',express.json()).put(async (req,res)=>{

    data = req.body
    console.log(this.data);
    try{
        const update  =  await book.findByIdAndUpdate(req.params.id, { $set:req.body })
        
        res.status(200).json(update)
        update.save()

    }catch(err){
        res.status(500).json(err)

    }
    
  
})


//Delete from store
//Model.findByIdAndRemove() no longer accepts a callback
bookRouter.route('/delete-book/:id').delete(async(req,res,next)=>{
 try{
    const deleteBook = await book.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteBook);

 }catch (error){
    res.status(500).json({message : error.message})

 }
})

module.exports = bookRouter;