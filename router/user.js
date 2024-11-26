const express = require('express')
const User = require('../models/user')

const router = express.Router();


router.get('/', async (req,res)=>{

    // try {        
    //     let userData = await User.find()
    //     res.status(200).json({data:userData})
    // } catch (error) {
    //     res.status(500).json({message:error.message})
    // }

    try {
        let userData = await User.find()
        res.status(200).json({Data : userData})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    

})

router.get('/:id', async (req,res)=>{

    // try {
    //     const user = await User.findById(req.params.id)
    //     if(user){
    //         res.status(200).json({data : user})
    //     }
    // } catch (error) {
    //     res.status(404).json({message:"User Not Found"})
    // }

    try {
        let user = await User.findById(req.params.id)
        if(user){
            res.status(200).json({data : user})
        }
    } catch (error) {
        res.status(404).json({message:"User Not Found"})
    }
    
    
})

router.post('/new', async (req,res)=>{  
    
    // const newUser = new User({userName:req.body.userName})
    // await newUser.save()
    // res.json({message : " New User Created"})

    const newUser = new User({userName : req.body.userName})
    await newUser.save();
    res.json({message : " New User Created"})

})

router.put('/update/:id',(req,res)=>{   
    console.log(req.body); 
    res.json({message : "User Updated"})

})

router.patch('/update/:id', async (req,res)=>{      
        // const user = await User.findById(req.params.id)
        // user.userName = req.body.userName;
        // await user.save();
        // res.json({message : "User Updated"})      
   
        const user = await User.findById(req.params.id)
        user.userName = req.body.userName;
        await user.save();
        res.json({message : "User Updated"})

})

router.delete('/delete/:id',async (req,res)=>{   
   
    // await User.findByIdAndDelete(req.params.id)

    // res.json({message : "User deleted"})

    await User.findByIdAndDelete(req.params.id)
    res.json({message : "User deleted"})

})

module.exports = router

