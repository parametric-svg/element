import register from './module/register';

const test = require('tape-catch');
const repeat = require('repeat-element');

test('Registers the <parametric-svg> element', (is) => {
  is.plan(5);

  const registerElement = (
    name, {prototype, extends: extendsArg = null}
  ) => {
    is.pass(
      'taking a custom implementation of `document`'
    );

    is.equal(
      name,
      'parametric-svg',
      'under the name <parametric-svg>'
    );

    is.equal(
      extendsArg,
      null,
      'as a standard HTML element – no bells and whistles'
    );

    is.equal(
      typeof prototype.createdCallback,
      'function',
      'attaching stuff to the createdCallback…'
    );

    is.deepEqual(
      [
        prototype.attachedCallback,
        prototype.detachedCallback,
        prototype.atributeChangedCallback,
      ],
      repeat(undefined, 3),
      '…and to no other lifecycle callback'
    );
  };

  register({document: {registerElement}});
});

'Updates the first SVG inside ASAP';

'Doesn’t touch any other SVG';
