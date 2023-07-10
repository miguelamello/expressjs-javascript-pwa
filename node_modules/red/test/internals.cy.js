const displayName = require('red/internals/displayname');
const assume = require('assume');

describe('red/internals', function () {
  describe('/displayname', function () {
    it('is a function', function () {
      assume(displayName).is.a('function');
    });

    it('returns the component/fn', function () {
      function example() {}

      assume(displayName(example)).equals(example);
    });

    describe('{ name }', function () {
      it('assigns a displayName if it does not exist', function () {
        function example() {}

        assume(example.displayName).is.a('undefined');

        displayName(example, { name: 'BrUh' });
        assume(example.displayName).is.a('string');
        assume(example.displayName).equals('BrUh');

        function another() {}
        another.displayName = 'No Touching';

        displayName(another, { name: 'BrUh' });
        assume(another.displayName).equals('No Touching');
      });

      it('UpperCase firsts the name', function () {
        function example() {}

        displayName(example, { name: 'bruh' });
        assume(example.displayName).equals('Bruh');
      });
    });

    describe('{ prefix }', function () {
      it('prefixes the displayName', function () {
        function example() {}
        example.displayName = 'Example';

        displayName(example, { prefix: 'Prefix' });
        assume(example.displayName).equals('PrefixExample');
      });

      it('UpperCase firsts both the names', function () {
        function example() {}
        example.displayName = 'example';

        displayName(example, { prefix: 'bruh' });
        assume(example.displayName).equals('BruhExample');
      });
    });

    describe('{ suffix }', function () {
      it('suffixes the displayName', function () {
        function example() {}
        example.displayName = 'Example';

        displayName(example, { suffix: 'Suffix' });
        assume(example.displayName).equals('ExampleSuffix');
      });

      it('UpperCase firsts both the names', function () {
        function example() {}
        example.displayName = 'example';

        displayName(example, { suffix: 'bruh' });
        assume(example.displayName).equals('ExampleBruh');
      });
    });
  });
});
