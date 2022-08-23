const express=require('express')
const Router=express.Router()
const paymentcontroller= require('../controllers/payment')

Router.post('/razorpay', paymentcontroller.completePayment );
Router.post('/transaction', paymentcontroller.saveTransaction );
  
module.exports=Router