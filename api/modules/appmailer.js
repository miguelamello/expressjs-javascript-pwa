
/*
  class Login
  The Login class deals with all tasks 
  related to login.
*/

const nodemailer = require('nodemailer');
const configObj = require('./apiconfig');

class appMailer {

  #transporter;

  constructor() {
    this.#transporter = nodemailer.createTransport({
      host: configObj.smtp,
      port: 587,
      secure: false,
      auth: {
          user: configObj.mailuser,
          pass: configObj.mailpass
      }
    });
  }

  async sendMail( mailOptions ) {
    const load = { 
      status: false, 
      message: "Houve algum erro no envio da mensagem. Tente novamente mais tarde.", 
      data: [] 
    };
    // send mail with defined transport object
    try {
      const info = await this.#transporter.sendMail(mailOptions);
      if (info.messageId) {
       load.status = true; 
       load.message = 'Email enviado com sucesso.';
      }
    } catch (error) {
      load.message = error.message;
    }
    return load; 
  }

}

module.exports = new appMailer();
