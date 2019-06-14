import cron from "node-cron"
import express from "express"
import fs from "fs"
import nodemailer from "nodemailer";


const app = express()
const PORT = 5000;
const email = "*****************";
const passwd = "*********";
const sendTo = "*****************"

//Create Mail transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: passwd
  }
});

//Send email chaque vendredi
cron.schedule("* * * * Friday", ()=>{

    console.log("---------------------");

    console.log("Running Cron Job2");

    let mailOptions = {
        from: email ,
        to: sendTo,
        subject: "CronJOb from node js and mailer",
        text: `hi there , thi semail was automaticcally send bu node server`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            throw err;
        }else{
            console.log(info)
            fs.write('success.log', info, error=>{
                if (error) throw error;
                console.log("echec to write to the success file ");
            })
        }
    })


})





cron.schedule("* * * * * " , ()=>{
    console.log(" ------------------- ")

    console.log('Runing cron job');


    fs.writeFile('error.log','test cronjob', err=> {

        if(err) throw err;
        console.log("Successfully write to the error file ");
    });
})




app.listen(PORT , ()=>{
    console.log("j'ecoute sur "+ PORT)
})