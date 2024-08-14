const express=require('express')
let router=express.Router()
let Building=require('../modals/buildingModel')
const { model } = require('mongoose')
//let authMidd=require('../middleware/authmiddleware')
router.post('/addBuilding',async(req,res)=>{
    try{
       
        let building=new Building(req.body);
        await building.save();
        res.status(201).send("data is successfull added")
       }
       catch(err){
         res.status(500).send(err.message)
   
       }

})
router.post('/addingFloor/:id',async(req,res)=>{
    try{
       let user=await Building.findByIdAndUpdate(req.params.id,{$push:{floors:req.body}},{runValidators: true})
       if(user){
           res.send('floor is successfully updated')
       }
       else{
           res.status(404).send("building not found")
       }
      }
      catch(err){
        
         res.status(500).send(err.message)
      }

})
router.post('/addingRoom/:id1/:id2',async(req,res)=>{
    try{
       console.log(req.params.id1)
       console.log(req.params.id2)
       let user=await Building.findOneAndUpdate({_id:req.params.id1,"floors._id":req.params.id2},{$push:{"floors.$.rooms":req.body}},{runValidators: true})
       console.log(user)
       if(user){
           res.send('rooms is successfully added')
       }
       else{
           res.status(404).send("building not found")
       }
      }
      catch(err){
        
         res.status(500).send(err.message)
      }

})
router.post('/addingAsset/:id1/:id2/:id3',async(req,res)=>{
    try{
       console.log(req.params.id1)
       console.log(req.params.id2)
       let user=await Building.findOneAndUpdate(
        {_id:req.params.id1,"floors._id":req.params.id2,"floors.rooms._id":req.params.id3},
        {
            $push: { "floors.$[floor].rooms.$[room].assests": req.body } // Correct the key to "assets"
        },
        {
            arrayFilters: [
                { "floor._id": req.params.id2 }, // Filter for the floor
                { "room._id": req.params.id3 } // Filter for the room
            ],
            runValidators: true,
            new: true // Return the updated document
        }
    
    )
       console.log(user)
       if(user){
           res.send('rooms is successfully added')
       }
       else{
           res.status(404).send("building not found")
       }
      }
      catch(err){
        
         res.status(500).send(err.message)
      }

})
module.exports=router