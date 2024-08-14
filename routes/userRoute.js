const express=require("express")
const Users=require('../modals/registration')
const bcrypt=require('bcryptjs')
const router=express.Router()
const jwt=require("jsonwebtoken")
require('dotenv').config()
router.post('/register',async(req,res)=>{
    console.log('arman')
     try{
        let f=await Users.findOne({email:req.body.email})
        let firstName=req.body.firstName.substring(0,2)
        let lastName=req.body.lastName.substring(0,2)
        let mobile=req.body.mobile.substring(8)
        let userid=firstName+lastName+mobile
        req.body.userId=userid
        console.log(userid)
        if(f){
            res.status(400).send('user is already exist')
      }
      else{
          let hashingPass=await bcrypt.hash(req.body.password,10)
           req.body.password=hashingPass;
        
          let u=new Users(req.body)
          await u.save()
          res.send({message:'user is successfully register',userId:userid})
  
      }



     }
     catch(err){
        res.status(500).send(err.message)

     }

})

router.delete('/deleteUser/:id',async(req,res)=>{
    try{
      let work=await Users.findByIdAndDelete(req.params.id)
      console.log(work)
      if(work){
        res.send('data is successfully deleted')
      }
      else{
        res.status(404).send('please provide existing id')

      }
    }
    catch(err){
       res.status(500).send(err.message)
    }
})
router.get('/allUser',async(req,res)=>{
    try{
       let users=await Users.find();
       res.send(users)

    }
    catch(err){
      res.status(500).send(err.message)

    }
})

router.post('/login',async(req,res)=>{
     try{
      let user=await Users.findOne({userId:req.body.userId});
      if(user){
      let orignalPass=await bcrypt.compare(req.body.password,user.password)
      if(orignalPass){
        let token=jwt.sign({role:user.role},process.env.secretKey,{expiresIn:60})
         res.send({
          message:'user is successfull login',
          token:token
         })
      }
      else{
        res.status(400).send({
          message:"please provide correct password",
          token:null

        })

      }
      }
      else{
        res.status(404).send({
          message:"please register first",
          data:token
        })

      }
     

    
     }
     catch(err){
       res.status(500).send({
        message:err.message,
        token:null

       })
     }
    

})
router.put('/update/:id',async(req,res)=>{
    try{
     let hashingPass=await bcrypt.hash(req.body.password,10)
     req.body.password=hashingPass;
     let user=await Users.findByIdAndUpdate(req.params.id,req.body,{runValidators: true})
    if(user){
        res.send('data is successfully updated')
    }
    else{
        res.status(404).send("user not found")
    }
   }
   catch(err){
     
      res.status(500).send(err.message)
   }
})

module.exports=router