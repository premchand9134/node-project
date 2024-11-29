const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json())


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
const cookieParser = require('cookie-parser')
app.use(cookieParser());
const bcrypt = require('bcryptjs')
app.set('view engine','ejs')


// IMPORT MONGOOSE 
const mongoose = require('mongoose');
// CONNECT TO DB
mongoose.connect(process.env.MONGO_URI)

// Get The connection
const db = mongoose.connection;

// checking the connection is successfully or not 
db.once('open',()=>{
    console.log("Successfully connected to db");    
})

// if not run "on" method
db.on('error',(error)=>{
    console.log(error);    
})

app.get('/',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        const tokenData = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(tokenData.type == 'user'){
            res.render('home')
        }
    }else{
        res.redirect('/signin')
    }
      
    

    
})

app.get('/signin',(req,res)=>{
    res.render('signin')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup', async (req,res)=>{
    const {name,email,password:plainTextPassword} = req.body;
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hashSync(plainTextPassword,salt)

    try {        
        await user.create({
            name,
            email,
            password:encryptedPassword
        });
        res.redirect('/signin')

    } catch (error) {
        console.log(error);        
    }

    

    


    
})

app.post('/signin',async(req,res)=>{
    const {email,password} = req.body;

    const userObj = await user.findOne({email})
    if(!userObj){
        res.send({error:"User not found",status : 404})
    }

    if(await bcrypt.compare(password,userObj.password)){
        const token = jwt.sign({
            userId : userObj._id,email : email, type : 'user' 
        },process.env.JWT_SECRET_KEY,{expiresIn:'2h'})
        res.cookie('token',token,{maxAge:2*60*60*1000});
        res.redirect('/')       
        
    }  
        
   
    
    
   
    
})



const userRouter = require('./router/user')
const user = require('./models/user')
app.use('/user', userRouter)

app.listen(5000)
console.log("Server is listening on 5000");


