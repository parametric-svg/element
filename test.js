import register from './module/register';

const test = require('tape-catch');

test('Registers the <parametric-svg> element', (is) => {
  is.plan(2);

  const registerElement = (
    name, {extends: extendsArg = null}
  ) => {
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
  };

  register({document: {registerElement}});
});

'Updates the first SVG inside ASAP';

'Doesn’t touch any other SVG';
