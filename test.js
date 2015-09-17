import './module';
  // This registers the <parametric-svg> thing on the actual `document`.

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

test('Works in a DOM structure created in one go', (is) => {
  is.plan(1);

  document.body.innerHTML = `
    <parametric-svg>
      <svg>
        <rect parametric:x="50" />
      </svg>
    </parametric-svg>
  `;

  const rect = document.body.querySelector('rect');

  is.equal(
    rect.getAttribute('x'),
    '50',
    'synchronously'
  );
});

test('Works in a DOM structure built up programatically', (is) => {
  is.plan(2);

  setTimeout(() => {
    // For reliable, consistent results this test must fire after the initial
    // render.

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
});

test('Only affects the first child SVG', (is) => {
  is.plan(2);

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

  is.equal(
    rect.getAttribute('x'),
    null,
    'leaves a second child untouched'
  );

  const circle = document.body.querySelector('circle');

  is.equal(
    circle.getAttribute('r'),
    '5',
    'leaves another nested child untouched'
  );
});

test('Works with a nested SVG', (is) => {
  is.plan(1);

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

  is.equal(
    rect.getAttribute('x'),
    String(5 / 5),
    'nested one level deep'
  );
});
