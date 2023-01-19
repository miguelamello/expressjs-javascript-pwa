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

}

module.exports = Common;