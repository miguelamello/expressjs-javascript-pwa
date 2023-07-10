/*
  class Common
  The Common class deals with all system 
  wide functionality used in another classes.
*/

class Common {

  constructor() {}

  getTicket() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  isEmail( email ) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i).test( email );
  }

  isPassword( password ) {
    return (/^.{8,64}$/i).test( password.trim() );
  }

  isCode( code ) {
    return (/^[0-9]{6}$/i).test( code );
  }

  isMobile( number ) {
    return (/^[0-9]{2}[0-9]{4,5}[0-9]{4}$/i).test(number);
  };

  toCamelCase( str ) {
    const words = str.split(" ");
    for (let i = 1; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join("");
  }

}

module.exports = new Common();