/*
  class Login
  The Login class deals with all tasks 
  related to login.
*/

const Common = require('./common');
const MySql = require('./mysql');
const Session = require('./session');
const appMailer = require('./appmailer');
const RedisMQ = require('./redis');
const configObj = require('./apiconfig');
class Login {
  
  constructor() {}

  /** PRIVATE METHODS */
  async #getUser( email ) {
    try {
      const user = await MySql.getSelected('SELECT * FROM `login` WHERE `email_login` = ?', [ email ]);
      return ( user.length > 0 ) ? user[0] : {};
    } catch (error) {
      RedisMQ.lpush('api-log', `${(new Date).toISOString()} ${error.stack}`);
      return {};
    }
  }
  
  //** PUBLIC METHODS */
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
        html: `Sua senha atual é: ${result[0].pass_login}<br><br>
               Utilize o email ${params.email} como usuário de acesso.`
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
        text: `Prezado(a) Usuário(a),\n\nDigite/copie o seguinte código no app: ${ticket}\n\nObs: O código é válido por 60 minutos.`,
        html: `Prezado(a) Usuário(a),<br><br>Digite/copie o seguinte código no app: ${ticket}<br><br>Obs: O código é válido por 60 minutos.`
      };
      // Send email
      const response = await appMailer.sendMail(mailOptions);
      if ( response.status ) {
        load.status = response.status; 
        load.message = response.message;
        await RedisMQ.sadd('tickets', ticket);
        await RedisMQ.expire('tickets', 3600);
        await RedisMQ.setKey(`session:${params.sessionId}`, JSON.stringify(params));
        await RedisMQ.expire(`session:${params.sessionId}`, 3600);
      }
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
    if (await RedisMQ.sismember('tickets', params.code)) {
      load.status = true; 
      load.message = "Código válido.";
      await RedisMQ.srem('tickets', params.code);
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
    // Send SMS
    const ticket = Common.getTicket();
    const message = `ADVOSYS - Codigo de Confirmação: ${ticket}`; 
    const data = {
      Sender: ticket,
      Receivers: params.mobile,
      Content: message
    };
    const promisse = await fetch('https://sms.comtele.com.br/api/v2/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-key': configObj.token_comtele
      },
      body: JSON.stringify(data)
    });
    const response = await promisse.json();
    if (response.Success ) {
      load.status = true; 
      load.message = "Código enviado para o celular. Verifique.";
      await RedisMQ.sadd('tickets', ticket);
      await RedisMQ.expire('tickets', 3600);
      let session = await RedisMQ.getKey(`session:${params.sessionId}`);
      session = JSON.parse(session);
      session = { ...session, ...params };
      await RedisMQ.setKey(`session:${params.sessionId}`, JSON.stringify(session));
      await RedisMQ.expire(`session:${params.sessionId}`, 3600);
    } else {
      console.log('Comtele API Response: ', response);
    }
    return load;
  }

  async validateCodeMobile( params ) {
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
    if (await RedisMQ.sismember('tickets', params.code)) {
      load.status = true; 
      load.message = "Código válido.";
      await RedisMQ.srem('tickets', params.code);
    }
    return load;
  }

  async createAccount( params ) {
    try {
      const load = { 
        status: false, 
        message: "Não foi possível criar a conta. Tente novamente daqui a pouco.", 
        data: [] 
      };
      if (parseInt(params.sessionId)) {
        let session = await RedisMQ.getKey(`session:${params.sessionId}`);
        session = JSON.parse(session);
        const user = await this.#getUser(session.email);
        /*if ( user.length > 0 ) {
          load.message = "Email já existente no sistema. Deseja recuperar a senha?";
          load.data = { redirect: true, email: session.email };
          return load;
        }*/
        console.log(user);
      }
      return load;
    } catch (error) {
      RedisMQ.lpush('api-log', `${(new Date).toISOString()} ${error.stack}`);
      return { 
        status: false, 
        message: "Não foi possível criar a conta. Tente novamente daqui a pouco.", 
        data: [] 
      };
    }
  }
}

module.exports = new Login();
