import './module';
  // This registers the <parametric-svg> thing on the actual `document`.

import register from './module/register';

const spec = require('tape-catch');
const repeat = require('repeat-element');

spec('Registers the <parametric-svg> element', (test) => {
  test.plan(6);

  const HTMLElement = () => {};

  const registerElement = (
    name, {prototype, extends: extendsArg = null}
  ) => {
    test.pass(
      'taking a custom implementation of `document`'
    );

    test.equal(
      name,
      'parametric-svg',
      'under the name <parametric-svg>'
    );

    test.equal(
      extendsArg,
      null,
      'as a standard HTML element – no bells and whistles'
    );

    test.equal(
      prototype.constructor,
      HTMLElement,
      'inheriting from the given `HTMLElement`'
    );

    test.equal(
      typeof prototype.createdCallback,
      'function',
      'attaching stuff to the createdCallback…'
    );

    test.deepEqual(
      [
        prototype.attachedCallback,
        prototype.detachedCallback,
        prototype.atributeChangedCallback,
      ],
      repeat(undefined, 3),
      '…and to no other lifecycle callback'
    );
  };

  register({document: {registerElement}, HTMLElement});
});

spec('Works in a DOM structure created in one go', (test) => {
  test.plan(1);

  document.body.innerHTML = `
    <parametric-svg>
      <svg>
        <rect parametric:x="50" />
      </svg>
    </parametric-svg>
  `;

  const rect = document.body.querySelector('rect');

  test.equal(
    rect.getAttribute('x'),
    '50',
    'synchronously'
  );
});

spec('Works in a DOM structure built up programatically', (test) => {
  test.plan(2);

  setTimeout(() => {
    // For reliable, consistent results this spec must fire after the initial
    // render.

    const parametricSvg = document.createElement('parametric-svg');
    const svg = document.createElement('svg');
    const circle = document.createElement('circle');
    svg.appendChild(circle);
    parametricSvg.appendChild(svg);

    circle.setAttribute('r', '5');
    circle.setAttribute('parametric:r', '2 * (3 + 5)');

    test.equal(
      circle.getAttribute('r'),
      '5',
      'updates asynchronously'
    );

    requestAnimationFrame(() => {
      test.equal(
        circle.getAttribute('r'),
        String(2 * (3 + 5)),
        'within a single animation frame'
      );
    });
  });
});

spec('Only affects the first child SVG', (test) => {
  test.plan(2);

  document.body.innerHTML = `
    <parametric-svg>
      <svg>
      </svg>

      <svg>
        <rect parametric:x="50" />
      </svg>

      <div><svg>
          <circle parametric:r="70" r="5" />
      </svg></div>
    </parametric-svg>
  `;

  const rect = document.body.querySelector('rect');

  test.equal(
    rect.getAttribute('x'),
    null,
    'leaves a second child untouched'
  );

  const circle = document.body.querySelector('circle');

  test.equal(
    circle.getAttribute('r'),
    '5',
    'leaves another nested child untouched'
  );
});

spec('Works with a nested SVG', (test) => {
  test.plan(1);

  document.body.innerHTML = `
    <parametric-svg>
      <div>
        <svg>
          <rect parametric:x="5 / 5" />
        </svg>
      </div>
    </parametric-svg>
  `;

  const rect = document.body.querySelector('rect');

  test.equal(
    rect.getAttribute('x'),
    String(5 / 5),
    'nested one level deep'
  );
});

spec('Warns when no <svg> is inside', (test) => {
  test.plan(1);

  const HTMLElement = {prototype: {
    querySelector: (selector) => (selector === 'svg' ? null : {}),
  }};

  const document = {
    registerElement: (_, {prototype}) => prototype.createdCallback(),
  };

  const logger = {warn(message) {
    test.ok(
      /couldn’t find/i.test(message),
      'prints a helpful warning'
    );
  }};

  register({document, HTMLElement, logger});
});
