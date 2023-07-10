const { State } = require('red/state');
const assume = require('assume');

describe('red/state', function () {
  describe('State', function () {
    let everywhere;

    before(function () {
      everywhere = new State();
    });

    describe('.state', function () {
      it.skip('throws an error when creating a circular ref', function (done) {
        const next = assume.plan(2, done);
        const message = `You've created a circular reference`;

        try {
          everywhere.state.foo = {};
          everywhere.state.foo.bar = everywhere.state;
        } catch (e) {
          assume(e.message).equals(message);
        }

        try {
          const object = { foo: 'bar' };
          everywhere.state.bar = object;
          everywhere.state.dupe = object;
        } catch (e) {
          assume(e.message).equals(message);
        }

        next();
      });
    });

    describe('#subscribe', function () {
      it('is a function', function () {
        assume(everywhere.subscribe).is.a('function');
      });

      it('allows you to un/subscribe to state changes', function (done) {
        const unsub = everywhere.subscribe(function () {
          unsub();
          done();
        });

        assume(unsub).is.a('function');
        everywhere.state.example = 10;
      });

      it('calls the subscribe for any change', function (done) {
        let updates = 0;

        const unsub = everywhere.subscribe(function () {
          if (++updates !== 5) return;

          unsub();
          done();
        });

        everywhere.state.example = 11;
        everywhere.state.example = 12;
        everywhere.state.example = {
          another: 'value'
        };

        const example = everywhere.state.example;
        example.deep = 99;

        delete everywhere.state.example;
      });

      it('works with a lot different values and nested depths', function () {
        everywhere.state.experimentation = {};
        everywhere.state.experimentation.number = 1;
        everywhere.state.experimentation.string = '2';
        everywhere.state.experimentation.array = [1, 2, 3];
        everywhere.state.experimentation.date = new Date();
        everywhere.state.experimentation.undef = undefined;
        everywhere.state.experimentation.nul = null;
        everywhere.state.experimentation.nan = NaN;
      });

      it('calls the subscribe when deep modification to an object has been made', function (done) {
        everywhere.state.nested = {
          deep: {
            example: {
              assignment: 1
            }
          }
        };

        const unsub = everywhere.subscribe(function () {
          unsub();
          done();
        });

        everywhere.state.nested.deep.example.assignment = 2;
      });

      it('calls the subscribe when deep modification to an array has been made', function (done) {
        everywhere.state.nested = {
          deep: {
            example:[ 1, 2, 3 ]
          }
        };

        const unsub = everywhere.subscribe(function () {
          unsub();
          done();
        });

        console.log(everywhere.state.nested.deep.example.push);
        everywhere.state.nested.deep.example.push(4);
      });
    });
  });
});;
