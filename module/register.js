require('setimmediate');  // Modifies the global object.

const parse = require('parametric-svg-parse');
const patch = require('parametric-svg-patch');
const assign = require('object-assign');
const {create} = Object;

 /**
  * Register the `<parametric-svg>` element with custom settings
  *
  * In most cases you’ll just import the main module and be fine with the
  * default settings (see [getting started](#/getting-started)). But if you want
  * fine control, you can `require('parametric-svg-element/register')`. The
  * function you get back takes a single argument `options` with the following
  * properties:
  *
  * - `document` – A custom implementation of `document` – for headless tests
  *   or something. Default: `window.document`
  *
  * @jsig
  *   register(options: {
  *     document?  : Document
  *   }) => void
  */
export default ({document}) => {
  const doc = (
    document ||
    (typeof window !== 'undefined' && window.document)
  );

  // TODO: Test `HTMLElement`.
  const prototype = assign(create(HTMLElement.prototype), {
    createdCallback() {
      const syncSvg = this.querySelector('svg');
      if (syncSvg) this._init(syncSvg);
      else setImmediate(() => {
        const asyncSvg = this.querySelector('svg');
        if (asyncSvg) this._init(asyncSvg);
        // TODO: Else throw or something.
      });
    },

    _init(svg) {
      patch(svg, parse(svg), {});
    },
  });

  doc.registerElement('parametric-svg', {prototype});
};
