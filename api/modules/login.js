/*
  class Login
  The Login class deals with all tasks 
  related to login.
*/

const Common = require('./common');
const MySql = require('./mysql');
const Session = require('./session');
const appMailer = require('./appmailer');
const configObj = require('./apiconfig');

class Login {

  #codes = new Map();
  
  constructor() {}

  async doLogin( params ) {
    const load = { status: false, message: "Não foi possível o login com as credenciais enviadas. Verifique e tente novamente", data: [] };
    if ( !params.email ) { load.status = false; load.message = "Email é requerido."; }
    if ( !params.password ) { load.status = false; load.message = "Senha é requerida."; }
    if ( !Common.isEmail( params.email ) ) { load.status = false; load.message = "Email é inválido"; }
    if ( !Common.isPassword( params.password ) ) { load.status = false; load.message = "Senha é inválida. Deve ser um número de 8 dígitos."; }
    load.data = await MySql.getSelected('SELECT * FROM `login` WHERE `email_login` = ? AND `pass_login` = ?', [ params.email, params.password ]);
    if ( load.data.length ) { 
      load.status = true; 
      load.message = ''; 
    }
    return load;
  }

  async openTicket( params ) {
    const load = { 
      status: false, 
      message: "Não foi possível abrir o chamado. Tente novamente daqui a pouco.", 
      data: [] 
    };
    try {
      // setup email options
      const ticket = Common.getTicket();
      const today = (new Date()).toLocaleDateString('pt-BR');
      const mailOptions = {
        from: configObj.mailuser,
        to: configObj.webmaster,
        subject: `#${ticket} - Chamado de Suporte.`,
        text: `Chamado de Suporte #${ticket} aberto em ${today}`,
        html: `
          ${params.nome} - ${params.email}<br>
          ${params.mensagem}
        `
      };
      // Send email
      const response = await appMailer.sendMail(mailOptions);
      load.status = response.status; 
      load.message = response.message;
      return load;
    } catch (error) {
      load.message = 'Houve algum erro no envio da mensagem. Tente novamente mais tarde.';
      return load;
    }
  }

  async sendOldPass( params ) {
    const load = { 
      status: false, 
      message: "Não foi possível reenviar a senha. Tente novamente daqui a pouco.", 
      data: [] 
    };
    if ( !params.email ) { 
      load.message = "Email é requerido."; 
      return load;
    }
    if ( !Common.isEmail( params.email ) ) { 
      load.message = "Email é inválido."; 
      return load;
    }
    try {
      // Check if email exists
      const result = await MySql.getSelected('SELECT pass_login FROM `login` WHERE `email_login` = ?', [ params.email ]);
      if ( result.length === 0 ) {
        load.message = "Email não cadastrado.";
        return load;
      }
      // setup email data 
      const ticket = Common.getTicket();
      const mailOptions = {
        from: configObj.mailuser,
        to: params.email,
        subject: `#${ticket} - Reenvio de senha de acesso ao Advosys.`,
        text: `Sua senha atual é: ${result[0].pass_login}}`,
        html: `Sua senha atual é: ${result[0].pass_login}`
      };
      // Send email
      const response = await appMailer.sendMail(mailOptions);
      load.status = response.status; 
      load.message = response.message;
      return load;
    } catch (error) {
      load.message = 'Houve algum erro no envio da mensagem. Tente novamente mais tarde.';
      return load;
    }
  }

  async sendCodeToEmail( params ) {
    const load = { 
      status: false, 
      message: "Não foi possível enviar o código. Tente novamente daqui a pouco.", 
      data: [] 
    };
    if ( !params.email ) { 
      load.message = "Email é requerido."; 
      return load;
    }
    if ( !Common.isEmail( params.email ) ) { 
      load.message = "Email é inválido."; 
      return load;
    }
    try {
      // Check if email exists
      const result = await MySql.getSelected('SELECT pass_login FROM `login` WHERE `email_login` = ?', [ params.email ]);
      if ( result.length > 0 ) {
        load.message = "Email já existente no sistema. Deseja recuperar a senha?";
        load.data = { redirect: true };
        return load;
      }
      // setup email data 
      const ticket = Common.getTicket();
      const mailOptions = {
        from: configObj.mailuser,
        to: params.email,
        subject: `#${ticket} - Codigo de confirmação do Advosys.`,
        text: `Prezado(a) Usuário(a),\n\nDigite/copie o seguinte código no app: ${ticket}`,
        html: `Prezado(a) Usuário(a),<br><br>Digite/copie o seguinte código no app: ${ticket}`
      };
      // Send email
      const response = await appMailer.sendMail(mailOptions);
      load.status = response.status; 
      load.message = response.message;
      this.#codes.set(String(ticket), ticket);
      return load;
    } catch (error) {
      load.message = 'Houve algum erro no envio da mensagem. Tente novamente mais tarde.';
      return load;
    }
  }

  async validateCodeEmail( params ) {
    const load = { 
      status: false, 
      message: "Não foi possível validar o código. Tente novamente daqui a pouco.", 
      data: [] 
    };
    if ( !params.code ) { 
      load.message = "Código é requerido."; 
      return load;
    }
    if ( !Common.isCode( params.code ) ) { 
      load.message = "Código é inválido."; 
      return load;
    }
    // Check if code exists
    if (this.#codes.has(params.code)) {
      load.status = true; 
      load.message = "Código válido.";
      this.#codes.delete(params.code);
    }
    return load;
  }

  async sendCodeToMobile( params ) {
    const load = { 
      status: false, 
      message: "Não foi possível enviar o código. Tente novamente daqui a pouco.", 
      data: [] 
    };
    if ( !params.mobile ) { 
      load.message = "Celular é requerido."; 
      return load;
    }
    if ( !Common.isMobile( params.mobile ) ) { 
      load.message = "Celular é inválido."; 
      return load;
    }
    const ticket = Common.getTicket()
    load.status = true; 
    load.message = "Código enviado para o celular.";
    this.#codes.set(String(ticket), ticket);
    return load;
  }
}

module.exports = new Login();
