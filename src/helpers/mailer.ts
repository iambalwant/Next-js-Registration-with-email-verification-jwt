import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bycrpy from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any)=>{
    try {
        // create hashed token 
        const hashedToken = await bycrpy.hash(userId.toString(), 10)
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            }) 
        }
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 587,
                auth: {
                  user: "a266ebb9f097ed",
                  pass: "8e723c3a54aaed"
                  //add these creadentials in .env file
                }
              });
              const mailsOptions ={
                from: 'me220003018@iiti.ac.in',
                to: email,
                subject: emailType === "VERIFY" ? "Verfiy your email" : "reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`
              }

              const mailResposnse =  await transport.sendMail(mailsOptions);
              return mailResposnse
    } catch (error:any) {
        throw new Error(error.message)
    }
}