const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const path = require('path')
app.use(express.static(path.join(__dirname , 'assets')))

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/' , (req,res) => {
    
})



app.post('/send', (req, res) => {
    const output = `
      <p>You have a new job Application</p>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        
        <li>Email: ${req.body.email}</li>
        
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;
  
     // Create a SMTP transporter object
     let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: "portfolioweb21@gmail.com",
            pass: "Aditya@9876"
        }
    });
  
    // Message object
    let message = {
        from: '"Portfolio Jobs" <portfolioweb21@gmail.com> ',
        to: 'aditya <aditya.s.baghel1@gmail.com>',
        subject: 'job',
        
        html: output
    };
  
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
  
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send('Send')
        
      });
  });
  

app.listen(3000 , () => console.log('Server Started...'))