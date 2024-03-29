const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText }= require('html-to-text');
const mailjet = require('node-mailjet');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Kartik khode <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid
      return nodemailer.createTransport({
        host: process.env.SERVER,
        port: process.env.SIBPORT,
        service: 'SendinBlue',
        auth: {
          user: process.env.SENDINBLUE_USERNAME,
          pass: process.env.SENDINBLUE_PASSWORD
        }
      });
    }
else{
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });
}
  }

  newMailjet(){
    if(process.env.NODE_ENV === 'production'){
        mailjet.apiConnect(
        process.env.MAILJET_APIKEY,
        process.env.MAILJET_API_SECRET,
      )
    }
    // const request = mailjet.post('send').request({
    //   Messages: [
    //     {
    //       From: {
    //         Email:process.env.EMAIL_FROM,
    //         Name: "khode"
    //       },
    //       To: [
    //         {
    //           Email:this.to,
    //           Name:this.firstName
    //         }
    //       ],
    //       Subject
    //     }
    //   ]
    // })
  };
  

  //send the actual email
  async send(template, subject) {
    //render html based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    //Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      // text: htmlToText.fromString(html)
    };

    // const request = {
    //   Messages: [
    //     {
    //       From: {
    //         Email:process.env.EMAIL_FROM,
    //         Name: "khode"
    //       },
    //       To: [
    //         {
    //           Email:this.to,
    //           Name:this.firstName
    //         }
    //       ],
    //       subject,
    //       html
    //     }
    //   ]
    // }

    // console.log(mailOptions);
    //create a transport and send email
    await this.newTransport().sendMail(mailOptions);
    // await this.newMailjet().sendMail(request);
  }

  

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Khodes Family!');
  }
  async orderConform() {
    await this.send('orderconform', 'Order is Successfull!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (Valid for 10min only)'
    );
  }
};
