/*
  class Login
  The Login class deals with all tasks 
  related to login.
*/

const nodemailer = require('nodemailer');
const Common = require('./common');
const MySql = require('./mysql');
const Session = require('./session');
const configObj = require('./apiconfig');
class Login {
  
  constructor() {}

  async doLogin( params ) {
    const load = { status: false, message: "Não foi possível o login com as credenciais enviadas. Verifique e tente novamente", data: [] };
    if ( !params.email ) { load.status = false; load.message = "Email is required."; }
    if ( !params.password ) { load.status = false; load.message = "Password is required."; }
    if ( !Common.isEmail( params.email ) ) { load.status = false; load.message = "Email is invalid. Ex: username@gmail.com"; }
    if ( !Common.isPassword( params.password ) ) { load.status = false; load.message = "Password is invalid. Must be a 8 digit number. Ex: 86938002"; }
    load.data = await MySql.getSelected('SELECT * FROM `login` WHERE `email_login` = ? AND `pass_login` = ?', [ params.email, params.password ]);
    if ( load.data.length ) { 
      load.status = true; 
      load.message = ''; 
    }
    return load;
  }

  async openTicket( params ) {
    const load = { status: false, message: "Não foi possível abrir o chamado. Tente novamente daqui a pouco.", data: [] };
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: configObj.smtp,
      port: 587,
      secure: false,
      auth: {
          user: configObj.mailuser,
          pass: configObj.mailpass
      }
    });
    // setup email data with unicode symbols
    const ticket = Math.floor(Math.random() * 900000) + 100000;
    const today = (new Date()).toLocaleDateString('pt-BR');
    const mailOptions = {
      from: configObj.mailuser,
      to: 'webmaster@advosys.com.br',
      subject: `#${ticket} - Chamado de Suporte.`,
      text: `Chamado de Suporte #${ticket} aberto em ${today}`,
      html: `
        ${params.nome} - ${params.email}<br>
        ${params.mensagem}
      `
    };
    // send mail with defined transport object
    try {
      const info = await transporter.sendMail(mailOptions);
      if (info.messageId) {
       load.status = true; 
       load.message = 'Mensagem enviada!';
      } 
    } catch (error) {
      load.message = 'Houve algum erro no envio da mensagem. Tente novamente mais tarde.';
    }
    return load;
  }

  async sendOldPass( params ) {
    const load = { status: false, message: "Não foi possível reenviar a senha. Tente novamente daqui a pouco.", data: [] };
    if ( !params.email ) { load.status = false; load.message = "Email is required."; }
    if ( !Common.isEmail( params.email ) ) { load.status = false; load.message = "Email is invalid. Ex: username@gmail.com"; }
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: configObj.smtp,
      port: 587,
      secure: false,
      auth: {
          user: configObj.mailuser,
          pass: configObj.mailpass
      }
    });
    // setup email data 
    const ticket = Math.floor(Math.random() * 900000) + 100000;
    const mailOptions = {
      from: configObj.mailuser,
      to: params.email,
      subject: `#${ticket} - Reenvio de senha de acesso.`,
      text: `Sua senha atual é: wetwet23d322`,
      html: `Sua senha atual é: wetwet23d322`
    };
    // send mail with defined transport object
    try {
      const info = await transporter.sendMail(mailOptions);
      if (info.messageId) {
       load.status = true; 
       load.message = 'Mensagem enviada!';
      } 
    } catch (error) {
      load.message = 'Houve algum erro no envio da mensagem. Tente novamente mais tarde.';
    }
    return load;
  }
}

module.exports = new Login();
