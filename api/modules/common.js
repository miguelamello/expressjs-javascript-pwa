/*
  class Common
  The Common class deals with all system 
  wide functionality used in another classes.
*/

class Common {

  constructor() {}

  isEmail( email ) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i).test( email );
  }

  isPassword( password ) {
    return (/^[0-9]{8}$/i).test( password );
  }

  toCamelCase( str ) {
    const words = str.split(" ");
    for (let i = 1; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join("");
  }

}

module.exports = new Common();