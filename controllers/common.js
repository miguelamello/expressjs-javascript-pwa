/*
  Class Common
  Metodos comuns ao aplicativo.
*/

"use strict";

function Common() {

  //--> PRIVATE PROPERTIES

  //--> PRIVATE METHODS

  //--> PUBLIC METHODS

  this._isEmail = (email = "") => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    return regex.test(email);
  };

  this._isFone = (fone = "") => {
    let regex = /^[0-9]{2}\s{1}[0-9]{4,5}-[0-9]{4}$/i;
    return regex.test(fone);
  };

  this._isCelular = (fone = "") => {
    let regex = /^[0-9]{2}\s{1}[0-9]{4,5}\s{1}[0-9]{4}$/i;
    return regex.test(fone);
  };

  this._isPassword = (str = "") => {
    return (str.trim().length >= 8 && str.trim().length <= 64);
  };

  this._copyObj = ( obj = {} ) => {
    return JSON.parse( JSON.stringify( obj ) );
  };

  //--> MODULE INITIALIZATION
  (() => {

    /*
      Array.prototype.inArray
      Extende o objeto Javascript Array para 
      simular o metodo de PHP in_array().

      Exemplo:
      var a = ["red", "green", "blue"];
      a.inArray("red"); /--> true
    */
    if (Array.prototype.inArray === undefined) {
      Array.prototype.inArray = function(needle) {
        for (let i = 0, len = this.length; i < len; i++) {
          if (this[i] === needle) {
            return true;
          }
        }
        return false;
      }
    }

    /*
      String.prototype.splice
      Splices text within a string.
      @param {int} offset //The position to insert the text at (before)
      @param {string} text //The text to insert
      @param {int} [removeCount=0] //An optional number of characters to overwrite
      @returns {string} A modified string containing the spliced text.
      Ex: "123567".splice(3, "4") --> "1234567"
    */
      if (String.prototype.splice === undefined) {
        String.prototype.splice = function( offset, text, removeCount=0 ) {
          let calculatedOffset = offset < 0 ? this.length + offset : offset;
          return this.substring(0, calculatedOffset) + text + 
          this.substring(calculatedOffset + removeCount);
        }
      }
  
      /*
        Date.prototype.isValid 
        Check if a date string is a valid Date Object date string.
      */
      Date.prototype.isValid = function () {
        // An invalid date object returns NaN for getTime() and NaN is the only
        // object not strictly equal to itself.
        return this.getTime() === this.getTime();
      }; 

  })()

}

export default new Common;
