const express=require('express')
let router=express.Router()
let WorkType=require('../modals/worktypeModel')
const { model } = require('mongoose')
//let authMidd=require('../middleware/authmiddleware')
router.post('/addworktype',async(req,res)=>{
    try{
        let data=await WorkType.findOne({name:req.body.name})
       
        if(!data){
        let body=req.body;    
        let worktype=new WorkType(body);
        await worktype.save();
        res.status(201).send("data is successfull added")
       }
       else{
        res.status(400).send('data is already exists')

       }    
   
       }
       catch(err){
         res.status(500).send(err.message)
   
       }

})

router.delete('/deleteWork/:id',async(req,res)=>{
    try{
      let work=await WorkType.findByIdAndDelete(req.params.id)
      console.log(work)
      if(work){
        res.send('data is successfully deleted')
      }
      else{
        res.status(400).send('please provide existing id')

      }
    }
    catch(err){
       res.status(500).send(err.message)
    }
})
router.put('/update/:id',async(req,res)=>{
    try{
    let user=await WorkType.findByIdAndUpdate(req.params.id,req.body,{runValidators: true})
    if(user){
        res.send('data is successfully updated')
    }
    else{
        res.status(404).send("work not found")
    }
   }
   catch(err){
     
      res.status(500).send(err.message)
   }
})

router.get('/allworktype',async(req,res)=>{
    try{
        let data=await WorkType.find()
        res.send(data)
    }
    catch(err){
        res.send({
            message:err.message,
            success:false,
            data:null
        })

    }
    
})

module.exports=router
