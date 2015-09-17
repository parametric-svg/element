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

// Register the thing on the actual `document`. That’s what `index.js` does.
register({});

test('Works in a DOM structure created in one go', (is) => {
  is.plan(1);

  const parser = new DOMParser;
  const parametricSvg = parser.parseFromString(
`<!DOCTYPE html>
<parametric-svg>
  <svg>
    <rect parametric:x="50" />
  </svg>
</parametric-svg>
`,
    'text/html'
  );
  const rect = parametricSvg.documentElement.querySelector('rect');

  is.equal(
    rect.getAttribute('x'),
    '10',
    'synchronously'
  );
});

test('Works in a DOM structure built up programatically', (is) => {
  is.plan(2);

  const parametricSvg = document.createElement('parametric-svg');
  const svg = document.createElement('svg');
  const circle = document.createElement('circle');
  svg.appendChild(circle);
  parametricSvg.appendChild(svg);

  circle.setAttribute('r', '5');
  circle.setAttribute('parametric:r', '2 * (3 + 5)');

  is.equal(
    circle.getAttribute('r'),
    '5',
    'updates asynchronously'
  );

  requestAnimationFrame(() => {
    is.equal(
      circle.getAttribute('r'),
      String(2 * (3 + 5)),
      'within a single animation frame'
    );
  });
});

'Only affects the first child SVG';

'Only affects a direct child SVG';
