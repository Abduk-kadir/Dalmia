const express=require("express")
const Users=require('../modals/registration')
const bcrypt=require('bcryptjs')
const router=express.Router()
const jwt=require("jsonwebtoken")
router.post('/register',async(req,res)=>{
    console.log('arman')
     try{
        let f=await Users.findOne({email:req.body.email})
        console.log('user is:',f)
        if(f){
            res.send({
              message:'user is already exists',
              success:false,
              data:null
            })
      }
      else{
          let hashingPass=await bcrypt.hash(req.body.password,10)
           req.body.password=hashingPass;
         console.log(req.body)
          let u=new Users(req.body)
          await u.save()
          res.send({
            message:"user is successfully register",
            success:true,
            data:null
          })
  
      }



     }
     catch(err){
        res.send({
            message:err.message,
            success:false,
            data:null
        })

     }

})
router.get('/allUser',async(req,res)=>{
    try{
       let users=await Users.find();
       res.send({
        message:"all user is successfully fetched",
        success:true,
        data:users

       })

    }
    catch(err){
      res.send({
        message:err.message,
        data:null,
        success:false
      })

    }
})

router.post('/login',async(req,res)=>{
     try{
      let user=await Users.findOne({email:req.body.email});
      if(user){
      let orignalPass=await bcrypt.compare(req.body.password,user.password)
      if(orignalPass){
        let token=jwt.sign({role:user.role},process.env.secret_key,{expiresIn:60})

         res.send({
          message:'user is successfull login',
          success:true,
          data:token
         })
      }
      else{
        res.send({
          message:"please provide correct password",
          success:false,
          data:null

        })

      }
      }
      else{
        res.send({
          message:"please register first",
          success:false,
          data:null
        })

      }
     

    
     }
     catch(err){
       res.send({
        message:err.message,
        success:false

       })
     }
    

})

module.exports=router