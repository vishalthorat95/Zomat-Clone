//imports
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const zomatoRoutes=require('./routes/zomato')
const paymentRoutes=require('./routes/razorPay')
const mongoose=require('mongoose')

const mongoServer =process.env.MONGO_URI||"mongodb://localhost/zomato"
//connect to mongoDB 
mongoose.connect(mongoServer,
     ()=>{
    console.log("mongoDB connected")},
    e=>console.log(e))


//create express server
var app=express()

//add middleware before routes
app.use(express.json())

app.use(cors())

//middleware routes 
app.use('/zomato',zomatoRoutes)
app.use('/Pay',paymentRoutes)

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//Routes
app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 
// restaurents 
app.get('/api/restaurents',(req, res)=>{
    res.send('Welcome to api') 
})
//
app.post("/register", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
})

//listen to a port 
app.listen( process.env.PORT || 7878,()=>{
    console.log("express app is up and running on port 7878")
})