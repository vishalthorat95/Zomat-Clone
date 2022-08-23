const shortid = require("shortid");
const Razorpay = require("razorpay");
const crypto = require('crypto')
let Transaction = require("../models/transaction")

const razorpay = new Razorpay({
  key_id: "rzp_test_tZx5LHwGjwCPPX",
  key_secret: "sOfDAEdDzCivBF1MiL4T6oT7",
});


exports.completePayment=async (req, res) => {
    console.log("payment initiated!!")
    const payment_capture = 1;
    const amount = req.body.amount;
    const currency = "INR";
  
    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };
  
    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      // res.json({
      //   id: response.id,
      //   currency: response.currency,
      //   amount: response.amount,
      // });
      res.json(response)
    } catch (error) {
      console.log(error);
    }
  }


  exports.saveTransaction = (req,res)=>{
    console.log("saving Transaction....")
    const generated_signature = crypto.createHmac('sha256',razorpay.key_secret)
    
    generated_signature.update(req.body.razorpay_order_id+"|"+ req.body.transactionid)
     if (generated_signature.digest('hex') == req.body.razorpay_signature){
           console.log("inside true")
            const transaction = new Transaction({
              transactionid:req.body.transactionid,
              transactionamount:req.body.transactionamount,
          });
          console.log(transaction)
          transaction.save(function(err, savedtransac){
            if(err){
                console.log(err);
                return res.status(500).send("Some Problem Occured");
            }
            res.send({transaction: savedtransac});
  
        });
      // return res.send('success');
    }
    else{
      return res.send('failed');
    }
  }