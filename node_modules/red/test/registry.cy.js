const register = require('red/register');
const { mount } = require('./utils');
const assume = require('assume');
const React = require('react');

describe('register', function () {
  function Paragraph({ children, ...props }) {
    return <p { ...props }>{ children }</p>
  }

  function Strong({ children, ...props }) {
    return <strong { ...props }>{ children }</strong>
  }

  function Italic({ children, ...props }) {
    return <i { ...props }>{ children }</i>
  }

  it('is exported as function', function () {
    assume(register).is.a('function');
  });

  describe('DX improvements', function () {
    it('only throws an error when trying to render an missing component', function (done) {
      const { Placeholder } = register({ Text: Paragraph });

      cy.on('uncaught:exception', function (err) {
        assume(err.message).contains(`The component (Placeholder) doesn't exist.`);
        done();
      });

      mount(
        <div id="example-1">
          <Placeholder />
        </div>
      );
    });

    it('throws an error when you access an unknown component (opt-in)', function () {
      const library = register({ Text: Paragraph }, {
        missing: true
      });

      const { Text } = library;
      assume(Text).is.not.a('undefined');

      try {
        const { Example } = library;
        if (Example) throw new Error('This should never be called');
      } catch (e) {
        assume(e.message).equals(`The component (Example) doesn't exist.`);
      }

      const another = register({ Text: Paragraph });

      const { Placeholder } = another;
      assume(Placeholder).is.not.a('undefined');
    });
  });

  it('creates a component registry', function () {
    const { Text } = register({ Text: Paragraph });

    mount(<Text id="example-1">Hello World</Text>);

    cy.get('#example-1').should(($) => {
      assume($.text()).equals('Hello World');
      assume($.prop('tagName')).equals('P');
    });
  });

  it('introduces the "Swap" component', function () {
    const { Swap } = register({ Text: Paragraph });

    assume(Swap).is.not.a('undefined');
  });

  describe('component swap', function () {
    it('can swap components using the Swap component', function () {
      const { Text, Swap } = register({ Text: Paragraph });

      mount(
        <div>
          <Text id="example-1">Hello World</Text>
          <Swap Text={ Strong }>
            <Text id="example-2">Another World</Text>
          </Swap>
        </div>
      );

      cy.get('#example-1').should(($) => {
        assume($.text()).equals('Hello World');
        assume($.prop('tagName')).equals('P');
      });

      cy.get('#example-2').should(($) => {
        assume($.text()).equals('Another World');
        assume($.prop('tagName')).equals('STRONG');
      });
    });

    it(`can nest Swap's for multiple overrides`, function () {
      const { Text, Swap, Header } = register({ Text: Paragraph, Header: Paragraph });

      mount(
        <div>
          <Text id="example-1">Hello World</Text>
          <Swap Text={ Strong }>
            <Text id="example-2">Another World</Text>

            <Swap Text={ Italic }>
              <Header>This just exists as example</Header>
              <Text id="example-3">Rabbit Hole</Text>
            </Swap>
          </Swap>
        </div>
      );

      cy.get('#example-1').should(($) => {
        assume($.text()).equals('Hello World');
        assume($.prop('tagName')).equals('P');
      });

      cy.get('#example-2').should(($) => {
        assume($.text()).equals('Another World');
        assume($.prop('tagName')).equals('STRONG');
      });

      cy.get('#example-3').should(($) => {
        assume($.text()).equals('Rabbit Hole');
        assume($.prop('tagName')).equals('I');
      });
    });
  });
});
